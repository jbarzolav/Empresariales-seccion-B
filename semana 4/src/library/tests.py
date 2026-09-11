"""
Unit tests for the library application.
"""

from datetime import date
from django.test import TestCase
from django.urls import reverse
from .models import Author, AuthorProfile, Publisher, Category, Book, Publication


class LibraryModelTests(TestCase):
    """Test suite for library models and relationships."""

    def setUp(self):
        self.author = Author.objects.create(
            first_name="Jane",
            last_name="Doe",
            email="jane.doe@example.com",
            birth_date=date(1990, 1, 1)
        )
        self.profile = AuthorProfile.objects.create(
            author=self.author,
            biography="Bestselling author."
        )
        self.publisher = Publisher.objects.create(
            name="Global Press",
            country="USA"
        )
        self.category = Category.objects.create(
            name="Science Fiction",
            description="Sci-Fi novels"
        )
        self.book = Book.objects.create(
            title="Future Odyssey",
            isbn="9781234567890",
            publication_date=date(2023, 5, 20),
            author=self.author
        )
        self.book.categories.add(self.category)
        self.publication = Publication.objects.create(
            book=self.book,
            publisher=self.publisher,
            publication_date=date(2023, 5, 25),
            edition=1
        )

    def test_author_str(self):
        self.assertEqual(str(self.author), "Jane Doe")

    def test_profile_relationship(self):
        self.assertEqual(self.author.profile.biography, "Bestselling author.")
        self.assertEqual(str(self.profile), "Profile of Jane Doe")

    def test_book_relationships(self):
        self.assertEqual(self.book.author, self.author)
        self.assertIn(self.book, self.author.books.all())
        self.assertIn(self.category, self.book.categories.all())
        self.assertIn(self.publisher, self.book.publishers.all())
        self.assertEqual(self.publication.edition, 1)


class LibraryViewTests(TestCase):
    """Test suite for library views and URLs."""

    def setUp(self):
        self.author = Author.objects.create(
            first_name="John",
            last_name="Smith",
            email="john.smith@example.com"
        )
        self.book = Book.objects.create(
            title="Django Mastery",
            isbn="9780987654321",
            publication_date=date(2023, 1, 1),
            author=self.author
        )

    def test_book_list_view(self):
        response = self.client.get(reverse('library:book_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Django Mastery")
        self.assertTemplateUsed(response, 'library/book_list.html')

    def test_book_detail_view(self):
        response = self.client.get(reverse('library:book_detail', args=[self.book.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Django Mastery")
        self.assertContains(response, "John Smith")
        self.assertTemplateUsed(response, 'library/book_detail.html')
