"""
Quiz application admin configuration.

Registers the Quiz models with the Django admin interface.
"""

from django.contrib import admin

from .models import Exam, Question, Choice


class ChoiceInline(admin.TabularInline):
    """Inline admin for Choice model."""
    model = Choice
    extra = 4


class QuestionInline(admin.StackedInline):
    """Inline admin for Question model."""
    model = Question
    extra = 1
    inlines = [ChoiceInline]


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    """Admin configuration for Exam model."""
    list_display = ('title', 'created_date')
    search_fields = ('title', 'description')
    list_filter = ('created_date',)
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    """Admin configuration for Question model."""
    list_display = ('content', 'exam')
    list_filter = ('exam',)


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    """Admin configuration for Choice model."""
    list_display = ('content', 'question', 'is_correct')
    list_filter = ('is_correct',)
