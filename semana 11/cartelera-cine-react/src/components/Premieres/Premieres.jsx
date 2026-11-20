import { usePremieres } from '../../hooks/usePremieres.js'
import Button from '../Button.jsx'
import PremiereSkeleton from '../PremiereSkeleton/PremiereSkeleton.jsx'
import PremiereCarousel from '../PremiereCarousel/PremiereCarousel.jsx'

export default function Premieres() {
  const simulateError = new URLSearchParams(window.location.search).get('estrenos') === 'error'
  const { status, movies, error, retry } = usePremieres(simulateError)

  return (
    <section className="premieres stack" id="promociones" aria-labelledby="premieres-title">
      <h2 id="premieres-title">Próximos estrenos</h2>
      {status === 'loading' && <PremiereSkeleton />}
      {status === 'error' && (
        <div className="premiere-error stack">
          <p role="alert">{error}</p>
          <Button onClick={retry}>Reintentar</Button>
        </div>
      )}
      {status === 'success' && <PremiereCarousel movies={movies} />}
    </section>
  )
}
