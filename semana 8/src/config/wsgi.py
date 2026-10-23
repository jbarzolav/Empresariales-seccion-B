import os
import sys
from pathlib import Path
from django.core.wsgi import get_wsgi_application

# Add the src directory to python path
current_dir = Path(__file__).resolve().parent
src_dir = current_dir.parent
if str(src_dir) not in sys.path:
    sys.path.insert(0, str(src_dir))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

db_path = Path('/tmp/db.sqlite3')
if os.environ.get('VERCEL') and not db_path.exists():
    try:
        from django.core.management import call_command
        call_command('migrate', interactive=False)
        from django.contrib.auth.models import User
        from quiz.models import Exam, Question, Choice
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
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
    except Exception as e:
        print("Error setting up database on Vercel:", e)

application = get_wsgi_application()
