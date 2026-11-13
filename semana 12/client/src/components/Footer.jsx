function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer__inner">
        <section className="footer-section" aria-labelledby="footer-brand">
          <h2 id="footer-brand">Cine Empresariales</h2>
          <p>Disfruta tus historias favoritas en la pantalla grande.</p>
        </section>

        <section className="footer-section" aria-labelledby="footer-contact">
          <h2 id="footer-contact">Contacto</h2>
          <address>
            <a href="mailto:contacto@cineempresariales.test">contacto@cineempresariales.test</a>
            <a href="tel:+51900000000">+51 900 000 000</a>
            <span>Av. de Ejemplo 123, Lima, Perú</span>
          </address>
        </section>

        <section className="footer-section" aria-labelledby="footer-information">
          <h2 id="footer-information">Información</h2>
          <p>Atención todos los días de 10:00 a. m. a 11:00 p. m.</p>
          <p>Proyecto académico de cartelera de cine.</p>
        </section>
      </div>
      <p className="site-footer__copyright">© 2026 Cine Empresariales</p>
    </footer>
  )
}

export default Footer
