import { useEffect, useState } from 'react'
import { getApiError, listExams } from '../services/api'

export function useExams() {
  const [data, setData] = useState({ results: [], count: 0, next: null, previous: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPageState] = useState(1)
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    listExams({ signal: controller.signal, page })
      .then(setData)
      .catch((failure) => {
        if (!controller.signal.aborted) setError(getApiError(failure))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [page, revision])

  function setPage(value) {
    setLoading(true)
    setError('')
    setPageState(value)
  }
  function refresh() {
    setLoading(true)
    setError('')
    setRevision((value) => value + 1)
  }
  return { data, loading, error, page, setPage, refresh }
}
