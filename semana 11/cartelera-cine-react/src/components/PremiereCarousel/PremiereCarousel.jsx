import { useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize.js'
import Button from '../Button.jsx'

export default function PremiereCarousel({ movies }) {
  const width = useWindowSize()
  const visibleCount = width < 700 ? 1 : 2
  const [position, setPosition] = useState(0)
  const lastPosition = Math.max(0, movies.length - visibleCount)
  const start = Math.min(position, lastPosition)
  const visibleMovies = movies.slice(start, start + visibleCount)

  return (
    <div className="stack" aria-label="Carrusel de estrenos">
      <div className="premiere-grid" style={{ '--premiere-columns': visibleCount }}>
        {visibleMovies.map((movie) => (
          <article className="premiere-card" key={movie.id}>
            <img src={movie.image} alt={`Afiche de ${movie.title}`} />
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.synopsis}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="cluster">
        <Button variant="secondary" onClick={() => setPosition(start - 1)} disabled={start === 0}>Anterior</Button>
        <Button variant="secondary" onClick={() => setPosition(start + 1)} disabled={start === lastPosition}>Siguiente</Button>
        <span role="status">{start + 1}–{start + visibleMovies.length} de {movies.length}</span>
      </div>
    </div>
  )
}
