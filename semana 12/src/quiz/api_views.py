"""
View sets and router for the quiz web service.

Exposes the three resources of the quiz application as REST endpoints:

- /api/exams/       ExamViewSet      (list, detail, create, update, delete)
- /api/questions/   QuestionViewSet  (list, detail, create, update, delete)
- /api/choices/     ChoiceViewSet    (list, detail, create, update, delete)

The router is included from config/urls.py under the /api/ prefix, so the
HTML pages of the application keep the root of the site for themselves.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.routers import DefaultRouter

from .models import Choice, Exam, Question
from .serializers import ChoiceSerializer, ExamSerializer, QuestionSerializer


class ExamViewSet(viewsets.ModelViewSet):
    """Full CRUD over the Exam resource."""

    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    """Full CRUD over the Question resource, with the choices prefetched
    so a list of questions does not query the database per row.

    Filtering and searching (step 10):

    - ?exam=<id>    filters the questions of one exam (DjangoFilterBackend)
    - ?search=<txt> searches text inside the question statement (SearchFilter)
    """

    queryset = Question.objects.prefetch_related('choices').all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['exam']
    search_fields = ['content']


class ChoiceViewSet(viewsets.ModelViewSet):
    """Full CRUD over the Choice resource, with the question loaded."""

    queryset = Choice.objects.select_related('question').all()
    serializer_class = ChoiceSerializer


router = DefaultRouter()
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'choices', ChoiceViewSet, basename='choice')
