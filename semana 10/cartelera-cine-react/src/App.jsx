import { useEffect, useState } from 'react'
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

    return parsedIds.filter((id) => movies.some((movie) => movie.id === id))
  } catch {
    return []
  }
}

function App() {
  const [favoriteIds, setFavoriteIds] = useState(loadFavoriteIds)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  function handleSearchChange(nextText) {
    console.info('[Search] Input changed:', nextText)
    setSearchText(nextText)
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [searchText])

  useEffect(() => {
    if (debouncedSearchText) {
      console.info('[Search] Debounced query ready:', debouncedSearchText)
    }
  }, [debouncedSearchText])

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function toggleFavorite(movieId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero movie={movies[0]} searchValue={searchText} onSearchChange={handleSearchChange} />
        <MovieList
          movies={movies}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          searchText={debouncedSearchText}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
