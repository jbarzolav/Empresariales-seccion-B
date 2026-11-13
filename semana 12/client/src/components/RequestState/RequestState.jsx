export function LoadingState() {
  return <div className="skeleton" role="status" aria-label="Cargando exámenes" aria-live="polite">
    <p>Consultando los exámenes…</p>
    {[1, 2, 3].map((row) => <div className="skeleton-line" key={row} aria-hidden="true" />)}
  </div>
}

export function ErrorState({ message, onRetry }) {
  return <div className="error-panel" role="alert">
    <h3>No pudimos cargar los exámenes</h3>
    <p>{message}</p>
    <button className="button" onClick={onRetry}>Reintentar</button>
  </div>
}
