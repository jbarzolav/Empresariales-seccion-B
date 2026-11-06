import MovieCard from './MovieCard.jsx'

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function MovieList({ movies, favoriteIds, onToggleFavorite, searchText }) {
  const normalizedSearch = normalizeText(searchText)
  const filteredMovies = movies.filter((movie) =>
    normalizeText(movie.title).includes(normalizedSearch),
  )

  return (
    <section className="movie-list" id="cartelera" aria-labelledby="movie-list-title">
      <div className="movie-list__header">
        <p className="movie-list__eyebrow">En cartelera</p>
        <h2 className="movie-list__title" id="movie-list-title">Películas y horarios</h2>
      </div>
      {filteredMovies.length > 0 ? (
        <div className="movie-list__grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="movie-list__empty" role="status">
          <p>No se encontraron películas para “{searchText}”. Prueba con otro título.</p>
        </div>
      )}
    </section>
  )
}

export default MovieList
