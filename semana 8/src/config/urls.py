"""
URL configuration for config project.

The REST service of the quiz application is published here through the
router of quiz.api_views (/api/), and the HTML pages of the application
keep the root of the site.
"""

from django.contrib import admin
from django.urls import path, include

from quiz.api_views import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('quiz.urls')),
]
