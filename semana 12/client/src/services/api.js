import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error)
    console.error('[QuizLab API]', JSON.stringify({
      method: error.config?.method,
      resource: error.config?.url,
      message: error.message,
      code: error.code,
      status: error.response?.status ?? null,
    }))
    return Promise.reject(error)
  },
)

export async function listExams({ signal, page = 1 } = {}) {
  const { data } = await api.get('exams/', { signal, params: { page } })
  return Array.isArray(data)
    ? { results: data, count: data.length, next: null, previous: null }
    : data
}

export async function createExam(exam) {
  const { data } = await api.post('exams/', exam)
  return data
}

export async function deleteExam(id) {
  await api.delete(`exams/${id}/`)
}

export function getApiError(error) {
  if (!error.response) {
    return 'No se pudo conectar con la API. Verifica que Django esté encendido y que el origen esté autorizado por CORS.'
  }
  const body = error.response.data
  if (typeof body === 'string') return body
  return Object.entries(body)
    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(' ') : messages}`)
    .join(' · ') || `La API respondió con el estado ${error.response.status}.`
}
