"""
Quiz application configuration.

This module defines the QuizConfig class for the quiz application.
"""

from django.apps import AppConfig


class QuizConfig(AppConfig):
    """Configuration for the quiz application."""
    default_app_config = 'quiz.apps.QuizConfig'
    name = 'quiz'
    verbose_name = 'Quiz Application'