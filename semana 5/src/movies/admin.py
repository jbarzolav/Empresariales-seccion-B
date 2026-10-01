from django.contrib import admin

from .models import Genre, Person, Movie, Rating


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    list_filter = ('name',)
    search_fields = ('name',)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date', 'biography')
    list_filter = ('birth_date',)
    search_fields = ('name',)


class RatingInline(admin.TabularInline):
    """Ratings edited inside the movie form (parent record)."""

    model = Rating
    extra = 1


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'genres_list', 'created_at', 'updated_at')
    list_filter = ('genres', 'release_year')
    search_fields = ('title',)
    inlines = [RatingInline]
    readonly_fields = ('created_at', 'updated_at')

    @admin.display(description='Genres')
    def genres_list(self, obj):
        """Show the genres of the movie as a comma separated column."""
        return ', '.join(genre.name for genre in obj.genres.all())


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('movie', 'score', 'comment', 'created_at')
    list_filter = ('score', 'created_at')
    search_fields = ('movie__title', 'comment')
    readonly_fields = ('created_at',)
