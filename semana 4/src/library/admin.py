"""
Admin configuration for the library application.
"""

from django.contrib import admin
from .models import Author, AuthorProfile, Publisher, Category, Book, Publication


class AuthorProfileInline(admin.StackedInline):
    model = AuthorProfile
    can_delete = False
    verbose_name_plural = 'Author Profile'


class PublicationInline(admin.TabularInline):
    model = Publication
    extra = 1


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'birth_date')
    search_fields = ('first_name', 'last_name', 'email')
    inlines = [AuthorProfileInline]


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('name', 'country')
    search_fields = ('name', 'country')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'isbn', 'author', 'publication_date')
    search_fields = ('title', 'isbn')
    list_filter = ('publication_date', 'author', 'categories')
    inlines = [PublicationInline]
    filter_horizontal = ('categories',)


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('book', 'publisher', 'publication_date', 'edition')
    list_filter = ('publication_date', 'publisher')
