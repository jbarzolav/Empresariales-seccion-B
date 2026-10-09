from django.contrib import admin

from .models import Article, Author, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    list_filter = ('name',)
    search_fields = ('name', 'slug')


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    list_filter = ('name',)
    search_fields = ('name', 'email', 'biography')


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publication_date', 'display_categories')
    list_filter = ('publication_date', 'author', 'categories')
    search_fields = ('title', 'summary', 'content', 'author__name')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('categories',)
    readonly_fields = ('created_at', 'updated_at')

    @admin.display(description='Categories')
    def display_categories(self, obj):
        return ', '.join(category.name for category in obj.categories.all())
