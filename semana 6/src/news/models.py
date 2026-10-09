from django.db import models
from django.utils import timezone


class Category(models.Model):
    """Category used to organize articles."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Author(models.Model):
    """Author responsible for publishing articles."""

    name = models.CharField(max_length=150)
    biography = models.TextField(blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Article(models.Model):
    """News article with an author, categories and featured image."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=270, unique=True)
    summary = models.TextField(blank=True)
    content = models.TextField()
    featured_image = models.ImageField(
        upload_to='articles/', blank=True, null=True
    )
    publication_date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='articles',
    )
    categories = models.ManyToManyField(
        Category,
        related_name='articles',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-publication_date']

    def __str__(self):
        return self.title
