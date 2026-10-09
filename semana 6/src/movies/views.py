from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404, render

from .models import Movie


def recomendaciones(request):
    """Public view: movies of the same genre as the selected one, best rated first.

    Contrast with the admin panel: the panel only lists and edits records,
    while this view runs the recommendation query (shared genres + average
    score) and renders a result for anonymous visitors.
    """
    catalogo = Movie.objects.prefetch_related('genres').order_by('title')
    seleccion = request.GET.get('pelicula')

    contexto = {
        'catalogo': catalogo,
        'base': None,
        'recomendaciones': [],
    }

    if seleccion:
        base = get_object_or_404(Movie, pk=seleccion)
        recomendados = (
            Movie.objects.filter(genres__in=base.genres.all())
            .exclude(pk=base.pk)
            .annotate(
                promedio=Avg('ratings__score'),
                votos=Count('ratings', distinct=True),
            )
            .order_by('-promedio', '-votos', 'title')
            .distinct()
        )
        contexto['base'] = base
        contexto['recomendaciones'] = recomendados

    return render(request, 'movies/recomendaciones.html', contexto)
