"""
Serializers for the quiz application.

How the relations travel (decision of step 4):

- Question -> Exam: the exam travels as an identifier. The payload sends
  ``"exam": 1`` and the serializer looks it up with a queryset, so the exam
  can be filtered and validated by primary key.
- Question -> Choice: the choices travel nested inside the question, in both
  directions. The response returns them as ``"choices": [...]`` and the
  payload of a create or a partial update accepts them the same way; they
  are stored with the question in the same transaction.
- Choice -> Question: on the standalone /choices/ resource the question
  keeps travelling as an identifier. It is optional there because when the
  choice travels nested, the parent question assigns the link itself.

Exposed fields and read-only fields (step 3):

- ExamSerializer: exposes id, title, description and created_date.
- ChoiceSerializer: exposes id, content, is_correct and question.
- QuestionSerializer: exposes id, content, score, exam and choices.
"""

from django.db import transaction
from rest_framework import serializers

from .models import Choice, Exam, Question


class ExamSerializer(serializers.ModelSerializer):
    """Serializes the Exam model: title and description are writable,
    created_date is read-only because the model sets it on creation."""

    class Meta:
        model = Exam
        fields = ('id', 'title', 'description', 'created_date')
        read_only_fields = ('id', 'created_date')


class ChoiceSerializer(serializers.ModelSerializer):
    """Serializes the Choice model for the /choices/ resource.

    The question is optional here: QuestionSerializer assigns it when the
    choice travels nested, and create() rejects the standalone payload
    that forgets it instead of letting the database fail.
    """

    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        required=False,
    )

    class Meta:
        model = Choice
        fields = ('id', 'content', 'is_correct', 'question')
        read_only_fields = ('id',)

    def create(self, validated_data):
        """Create a choice that comes from the /choices/ endpoint."""
        if validated_data.get('question') is None:
            raise serializers.ValidationError(
                {'question': 'This field is required.'}
            )
        return super().create(validated_data)


class QuestionSerializer(serializers.ModelSerializer):
    """Serializes the Question model.

    ``exam`` travels as an identifier and ``choices`` travels nested as a
    writable list, so create() and update() store the choices together with
    the question that owns them.
    """

    exam = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all())
    choices = ChoiceSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ('id', 'content', 'score', 'exam', 'choices')
        read_only_fields = ('id',)

    def validate(self, attrs):
        """Reject any question that does not carry exactly one correct choice.

        The rule runs over the choices of the payload when they are sent and
        over the stored choices when a partial update leaves them out, so a
        question can never exist with zero or several correct choices.
        """
        if 'choices' in attrs:
            choices_data = attrs['choices'] or []
        elif self.instance is not None:
            choices_data = [
                {'is_correct': choice.is_correct}
                for choice in self.instance.choices.all()
            ]
        else:
            choices_data = []

        correct_count = sum(
            1 for choice in choices_data if choice.get('is_correct')
        )
        if correct_count != 1:
            raise serializers.ValidationError(
                'A question must have exactly one correct choice.'
            )
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        """Create a question and its nested choices in one transaction."""
        choices_data = validated_data.pop('choices', [])
        question = Question.objects.create(**validated_data)
        for choice_data in choices_data:
            # The parent link is assigned here, never taken from the payload.
            choice_data.pop('question', None)
            Choice.objects.create(question=question, **choice_data)
        return question

    @transaction.atomic
    def update(self, instance, validated_data):
        """Update a question and replace its nested choices when sent."""
        choices_data = validated_data.pop('choices', None)
        instance = super().update(instance, validated_data)
        if choices_data is not None:
            instance.choices.all().delete()
            for choice_data in choices_data:
                choice_data.pop('question', None)
                Choice.objects.create(question=instance, **choice_data)
        return instance
