"""
Views for the library application.
"""

from django.shortcuts import get_object_or_404, render
from .models import Book


def book_list(request):
    """Render list of books."""
    books = Book.objects.select_related('author', 'author__profile').prefetch_related('categories', 'publishers').all()
    return render(request, 'library/book_list.html', {'books': books})


def book_detail(request, pk):
    """Render book detail showing categories, publisher(s), and author details."""
    book = get_object_or_404(
        Book.objects.select_related('author', 'author__profile').prefetch_related('categories', 'publishers', 'publication_set'),
        pk=pk
    )
    return render(request, 'library/book_detail.html', {'book': book})
