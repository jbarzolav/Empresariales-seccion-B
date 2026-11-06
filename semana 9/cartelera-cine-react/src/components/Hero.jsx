function Hero({ movie }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">Película destacada</p>
        <h1 className="hero__title" id="hero-title">{movie.title}</h1>
        <p className="hero__synopsis">{movie.synopsis}</p>

        <dl className="hero__details">
          <div>
            <dt>Clasificación</dt>
            <dd>{movie.classification}</dd>
          </div>
          <div>
            <dt>Valoración</dt>
            <dd>★ {movie.rating.toFixed(1)} / 5</dd>
          </div>
          <div>
            <dt>Horarios</dt>
            <dd>{movie.showtimes.join(' · ')}</dd>
          </div>
        </dl>

        <a className="hero__button" href="#cartelera">Ver cartelera</a>
      </div>

      <div className="hero__art">
        <img className="hero__poster" src={movie.image} alt={`Afiche de ${movie.title}`} />
      </div>
    </section>
  )
}

export default Hero
