import { useEffect, useState } from 'react'
import { movies } from '../data/movies.js'

const loading = { status: 'loading', movies: [], error: '' }

export function usePremieres(simulateError) {
  const [result, setResult] = useState(loading)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setResult(simulateError && attempt === 0
        ? { status: 'error', movies: [], error: 'No se pudieron cargar los estrenos. Vuelve a intentarlo.' }
        : { status: 'success', movies: movies.slice(4), error: '' })
    }, 1300)

    return () => window.clearTimeout(timer)
  }, [attempt, simulateError])

  function retry() {
    setResult(loading)
    setAttempt((current) => current + 1)
  }

  return { ...result, retry }
}
