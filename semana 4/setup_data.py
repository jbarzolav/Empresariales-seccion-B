"""
Script to populate test data and demonstrate queries and on_delete behavior.
"""

import os
import sys
from pathlib import Path

# Add src directory to python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR / 'src'))

import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from library.models import Author, AuthorProfile, Publisher, Category, Book, Publication


def run():
    print("=== Cleaning existing data ===")
    Publication.objects.all().delete()
    Book.objects.all().delete()
    Author.objects.all().delete()
    Publisher.objects.all().delete()
    Category.objects.all().delete()

    print("=== Creating Categories ===")
    cat1 = Category.objects.create(name="Fiction", description="Fictional stories and novels")
    cat2 = Category.objects.create(name="Science", description="Scientific books and research")
    cat3 = Category.objects.create(name="Technology", description="Programming and tech books")
    print(f"Created: {cat1}, {cat2}, {cat3}")

    print("=== Creating Publishers ===")
    pub1 = Publisher.objects.create(name="Editorial Alpha", address="123 Main St", country="USA")
    pub2 = Publisher.objects.create(name="Beta Books", address="456 High St", country="Spain")
    print(f"Created: {pub1}, {pub2}")

    print("=== Creating Authors & Profiles ===")
    auth1 = Author.objects.create(first_name="Alice", last_name="Smith", email="alice.smith@example.com", birth_date=date(1980, 5, 12))
    prof1 = AuthorProfile.objects.create(author=auth1, biography="Award-winning fiction novelist.", website="https://alicesmith.dev")

    auth2 = Author.objects.create(first_name="Bob", last_name="Johnson", email="bob.johnson@example.com", birth_date=date(1975, 9, 23))
    prof2 = AuthorProfile.objects.create(author=auth2, biography="Tech lead and software engineering professor.", website="https://bobjohnson.tech")
    print(f"Created authors: {auth1}, {auth2}")

    print("=== Creating Books (4 books, with at least one book in 2 categories) ===")
    book1 = Book.objects.create(title="Python Architecture", isbn="9780132350884", publication_date=date(2021, 3, 10), author=auth2)
    book1.categories.add(cat2, cat3)

    book2 = Book.objects.create(title="Advanced Django", isbn="9781484243503", publication_date=date(2022, 6, 15), author=auth2)
    book2.categories.add(cat3)

    book3 = Book.objects.create(title="Mystery in the Woods", isbn="9780061120084", publication_date=date(2019, 11, 5), author=auth1)
    book3.categories.add(cat1)

    book4 = Book.objects.create(title="Science of Tomorrow", isbn="9780385527132", publication_date=date(2023, 1, 20), author=auth1)
    book4.categories.add(cat1, cat2)
    print(f"Created books: {book1}, {book2}, {book3}, {book4}")

    print("=== Creating Publications (Intermediary model with through data) ===")
    Publication.objects.create(book=book1, publisher=pub2, publication_date=date(2021, 3, 12), edition=1)
    Publication.objects.create(book=book2, publisher=pub2, publication_date=date(2022, 6, 20), edition=2)
    Publication.objects.create(book=book3, publisher=pub1, publication_date=date(2019, 11, 10), edition=1)
    Publication.objects.create(book=book4, publisher=pub1, publication_date=date(2023, 1, 25), edition=1)
    print("Publications created successfully.")

    print("\n=== Demonstrating Queries ===")
    sample_book = Book.objects.first()
    print(f"Forward query (sample_book.author): {sample_book.title} -> Author: {sample_book.author}")

    sample_author = Author.objects.filter(books__isnull=False).first()
    print(f"Backward query (sample_author.books.all()): Author {sample_author} has books: {[b.title for b in sample_author.books.all()]}")

    filtered_books = Book.objects.filter(author__last_name="Johnson")
    print(f"Filter with double underscore (author__last_name='Johnson'): {[b.title for b in filtered_books]}")

    category_filtered = Book.objects.filter(categories__name="Fiction")
    print(f"Filter with double underscore (categories__name='Fiction'): {[b.title for b in category_filtered]}")


if __name__ == '__main__':
    run()
