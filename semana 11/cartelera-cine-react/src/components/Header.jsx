function Header({ favoriteCount }) {
  return (
    <header className="site-header" id="inicio">
      <div className="site-header__inner">
        <a className="brand" href="#inicio" aria-label="Cine Empresariales, inicio">
          <span className="brand-mark" aria-hidden="true">CE</span>
          <span>Cine Empresariales</span>
        </a>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#cartelera">Cartelera</a>
          <a href="#promociones">Estrenos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <span className="favorite-count tabular-numbers">♥ Favoritas: {favoriteCount}</span>
      </div>
    </header>
  )
}

export default Header
