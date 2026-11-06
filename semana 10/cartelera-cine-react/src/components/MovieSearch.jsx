function MovieSearch({ value, onChange }) {
  return (
    <div className="movie-search form-field">
      <label className="form-label" htmlFor="movie-search-input">
        Buscar películas
      </label>
      <input
        id="movie-search-input"
        className="form-control"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Escribe el título de una película"
      />
    </div>
  )
}

export default MovieSearch
