function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img
        className="movie-card__poster"
        src={movie.image}
        alt={`Afiche de ${movie.title}`}
      />
      <div className="movie-card__content">
        <div>
          <h3 className="movie-card__title">{movie.title}</h3>
          <p className="movie-card__rating" aria-label={`Valoración ${movie.rating} de 5`}>
            ★ {movie.rating.toFixed(1)} / 5
          </p>
        </div>
        <div className="movie-card__showtimes">
          <h4>Horarios</h4>
          <p>{movie.showtimes.join(' · ')}</p>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
