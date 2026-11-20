import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Premieres from './components/Premieres/Premieres.jsx'
import { useDebounce } from './hooks/useDebounce.js'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import { movies } from './data/movies.js'

const FAVORITES_STORAGE_KEY = 'cine-empresariales-favorites'

function loadFavoriteIds() {
  try {
    const savedIds = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    const parsedIds = savedIds ? JSON.parse(savedIds) : []

    if (!Array.isArray(parsedIds)) {
      return []
    }

    return [...new Set(parsedIds.filter((id) => movies.some((movie) => movie.id === id)))]
  } catch {
    return []
  }
}

function App() {
  const [favoriteIds, setFavoriteIds] = useState(loadFavoriteIds)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function toggleFavorite(movieId) {
    const movie = movies.find((item) => item.id === movieId)
    const alreadyFavorite = favoriteIds.includes(movieId)
    setFavoriteIds((currentIds) => currentIds.includes(movieId)
      ? currentIds.filter((id) => id !== movieId)
      : [...currentIds, movieId])
    const message = alreadyFavorite
      ? `Se quitó «${movie.title}» de favoritas.`
      : `Se añadió «${movie.title}» a favoritas.`
    toast(message, { id: movieId })
  }

  return (
    <>
      <Header favoriteCount={favoriteIds.length} />
      <main>
        <Hero movie={movies[0]} searchValue={searchText} onSearchChange={setSearchText} onClear={() => setSearchText('')} />
        <Premieres />
        <MovieList
          movies={movies}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          searchText={searchText ? debouncedSearchText : ''}
        />
      </main>
      <Footer />
      <Toaster position="top-right" duration={3500} toastOptions={{ className: 'favorite-toast' }} />
    </>
  )
}

export default App
