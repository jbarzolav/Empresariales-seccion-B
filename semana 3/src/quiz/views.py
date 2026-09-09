"""
Quiz application views.

Defines views for listing exams, viewing exam details,
and adding questions with their choices.
"""

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages

from .models import Exam, Question
from .forms import ExamForm, QuestionForm, ChoiceFormSet


def exam_list(request):
    """View to list all exams."""
    exams = Exam.objects.all()
    return render(request, 'quiz/exam_list.html', {'exams': exams})


def exam_detail(request, pk):
    """View to display details of a specific exam."""
    exam = get_object_or_404(Exam, pk=pk)
    questions = exam.questions.all()
    return render(request, 'quiz/exam_detail.html', {
        'exam': exam,
        'questions': questions,
    })


def question_create(request, exam_pk):
    """View to create a question with its choices for a specific exam."""
    exam = get_object_or_404(Exam, pk=exam_pk)

    if request.method == 'POST':
        question_form = QuestionForm(request.POST)
        choice_formset = ChoiceFormSet(request.POST)

        if question_form.is_valid() and choice_formset.is_valid():
            question = question_form.save(commit=False)
            question.exam = exam
            question.save()

            choice_formset.instance = question
            choices = choice_formset.save()

            correct_count = sum(1 for c in choices if c.is_correct)
            if correct_count != 1:
                question.delete()
                messages.error(
                    request,
                    'Exactly one choice must be marked as correct.'
                )
                return render(request, 'quiz/question_create.html', {
                    'exam': exam,
                    'question_form': question_form,
                    'choice_formset': choice_formset,
                })

            messages.success(request, 'Question created successfully.')
            return redirect('exam_detail', pk=exam.pk)
    else:
        question_form = QuestionForm(initial={'exam': exam})
        choice_formset = ChoiceFormSet()

    return render(request, 'quiz/question_create.html', {
        'exam': exam,
        'question_form': question_form,
        'choice_formset': choice_formset,
    })
