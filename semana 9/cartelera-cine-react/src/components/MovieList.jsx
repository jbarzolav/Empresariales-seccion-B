import MovieCard from './MovieCard.jsx'

function MovieList({ movies }) {
  return (
    <section className="movie-list" id="cartelera" aria-labelledby="movie-list-title">
      <div className="movie-list__header">
        <p className="movie-list__eyebrow">En cartelera</p>
        <h2 className="movie-list__title" id="movie-list-title">Películas y horarios</h2>
      </div>
      <div className="movie-list__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieList


