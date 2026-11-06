import Button from './Button.jsx'
import MovieSearch from './MovieSearch.jsx'

function Hero({ movie, searchValue, onSearchChange }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">Película destacada</p>
        <h1 className="hero__title" id="hero-title">{movie.title}</h1>
        <p className="hero__synopsis">{movie.synopsis}</p>

        <div className="hero__search">
          <MovieSearch value={searchValue} onChange={onSearchChange} />
        </div>

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

        <Button as="a" href="#cartelera" variant="light">Ver cartelera</Button>
      </div>

      <div className="hero__art">
        <img className="hero__poster" src={movie.image} alt={`Afiche de ${movie.title}`} />
      </div>
    </section>
  )
}

export default Hero
