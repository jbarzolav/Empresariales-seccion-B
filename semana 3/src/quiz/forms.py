"""
Quiz application forms.

Defines forms for Exam, Question, and a formset for Choices.
"""

from django import forms
from django.forms import inlineformset_factory

from .models import Exam, Question, Choice


class ExamForm(forms.ModelForm):
    """Form for creating and editing Exam instances."""

    class Meta:
        model = Exam
        fields = ['title', 'description']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        }


class QuestionForm(forms.ModelForm):
    """Form for creating and editing Question instances."""

    class Meta:
        model = Question
        fields = ['content', 'exam']
        widgets = {
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'exam': forms.Select(attrs={'class': 'form-control'}),
        }


class ChoiceForm(forms.ModelForm):
    """Form for creating and editing Choice instances."""

    class Meta:
        model = Choice
        fields = ['content', 'is_correct']
        widgets = {
            'content': forms.TextInput(attrs={'class': 'form-control'}),
            'is_correct': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }


ChoiceFormSet = inlineformset_factory(
    Question,
    Choice,
    form=ChoiceForm,
    extra=4,
    can_delete=True,
    validate_min=True,
    min_num=1,
)
