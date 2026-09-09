import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))
django.setup()

from django.contrib.auth.models import User
from quiz.models import Exam, Question, Choice

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print("Superuser created")

if not Exam.objects.filter(title='Python Basics').exists():
    exam = Exam.objects.create(title='Python Basics', description='Test your knowledge of Python fundamentals.')
    q1 = Question.objects.create(content='What is the output of print(2 ** 3)?', exam=exam)
    Choice.objects.create(content='6', is_correct=False, question=q1)
    Choice.objects.create(content='8', is_correct=True, question=q1)
    Choice.objects.create(content='9', is_correct=False, question=q1)
    Choice.objects.create(content='5', is_correct=False, question=q1)
    q2 = Question.objects.create(content='Which of the following is a mutable data type in Python?', exam=exam)
    Choice.objects.create(content='String', is_correct=False, question=q2)
    Choice.objects.create(content='Tuple', is_correct=False, question=q2)
    Choice.objects.create(content='List', is_correct=True, question=q2)
    Choice.objects.create(content='Integer', is_correct=False, question=q2)
    print("Test data created")
