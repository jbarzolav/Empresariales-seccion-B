from django.urls import path

from . import views

app_name = 'movies'

urlpatterns = [
    path('recomendaciones/', views.recomendaciones, name='recomendaciones'),
]
