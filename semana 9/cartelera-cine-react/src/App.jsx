import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import { movies } from './data/movies.js'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero movie={movies[0]} />
        <MovieList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default App
