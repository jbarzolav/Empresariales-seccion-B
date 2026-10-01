from django.db import models


class Genre(models.Model):
    """Movie genre (many-to-many with Movie)."""

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

    def __str__(self):
        return self.name


class Person(models.Model):
    """A person related to the film industry (actor, director, ...)."""

    name = models.CharField(max_length=150)
    birth_date = models.DateField(null=True, blank=True)
    biography = models.TextField(blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Person'
        verbose_name_plural = 'People'

    def __str__(self):
        return self.name


class Movie(models.Model):
    """A movie with its genres (M2M) and its ratings (FK from Rating)."""

    title = models.CharField(max_length=255)
    release_year = models.PositiveIntegerField()
    synopsis = models.TextField(blank=True)
    poster = models.ImageField(upload_to='posters/', blank=True, null=True)

    genres = models.ManyToManyField(Genre, related_name='movies')

    # Audit fields (read-only in the admin, step 7)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-release_year', 'title']
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'

    def __str__(self):
        return f"{self.title} ({self.release_year})"


class Rating(models.Model):
    """Rating of a movie (FK to Movie)."""

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name='ratings'
    )
    score = models.PositiveIntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return f"Rating: {self.score} for {self.movie}"
