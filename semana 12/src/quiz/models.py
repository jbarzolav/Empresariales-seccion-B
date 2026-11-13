"""
Quiz application models.

Defines the database models for the quiz application:
- Exam: Represents an exam with title, description, and creation date
- Question: Represents a question belonging to an exam
- Choice: Represents a possible answer choice for a question
"""

from django.db import models


class Exam(models.Model):
    """
    Exam model representing an exam in the quiz application.
    
    Attributes:
        title: The title of the exam (CharField)
        description: A detailed description of the exam (TextField)
        created_date: The date and time when the exam was created (DateTimeField)
    """
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Metadata options for the Exam model."""
        ordering = ['-created_date']
        verbose_name = 'exam'
        verbose_name_plural = 'exams'

    def __str__(self):
        """Return a string representation of the exam."""
        return self.title


class Question(models.Model):
    """
    Question model representing a question in the quiz application.
    
    Attributes:
        content: The question content/enunciado (TextField)
        exam: Foreign key to the Exam model, defining the parent exam
    """
    content = models.TextField()
    score = models.IntegerField(default=1)
    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE,
        related_name='questions'
    )

    class Meta:
        """Metadata options for the Question model."""
        ordering = ['id']
        verbose_name = 'question'
        verbose_name_plural = 'questions'

    def __str__(self):
        """Return a string representation of the question."""
        return self.content[:50] + '...' if len(self.content) > 50 else self.content


class Choice(models.Model):
    """
    Choice model representing an answer choice for a question.
    
    Attributes:
        content: The text content of the choice (TextField)
        is_correct: Boolean indicating if this choice is the correct answer
        question: Foreign key to the Question model, defining the parent question
    """
    content = models.TextField()
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='choices'
    )

    class Meta:
        """Metadata options for the Choice model."""
        ordering = ['id']
        verbose_name = 'choice'
        verbose_name_plural = 'choices'

    def __str__(self):
        """Return a string representation of the choice."""
        status = 'Correct' if self.is_correct else 'Incorrect'
        return f"{self.content[:30]}... ({status})" if len(self.content) > 30 else f"{self.content} ({status})"