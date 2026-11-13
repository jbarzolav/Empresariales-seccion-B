import { useState } from 'react'
import { createExam, getApiError } from '../../services/api'

export default function ExamForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setStatus(null)
    try {
      const exam = await createExam({ title: title.trim(), description: description.trim() })
      onCreated(exam)
    } catch (failure) {
      setStatus(failure.response?.status || null)
      setError(getApiError(failure))
    } finally {
      setSaving(false)
    }
  }

  return <section className="panel form-panel">
    <div className="section-heading"><div><p className="eyebrow">NUEVA EVALUACIÓN</p><h2>Crear un examen</h2></div><span className="badge">Formulario de alta</span></div>
    <form onSubmit={handleSubmit} noValidate className="form-grid" aria-busy={saving}>
      {error && <div role="alert" className="form-error"><strong>{status ? `La API rechazó el envío · HTTP ${status}` : 'No se pudo guardar'}</strong>{error}</div>}
      <label htmlFor="exam-title">Título del examen <input id="exam-title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} disabled={saving} maxLength={200} aria-required="true" placeholder="Ej.: Fundamentos de servicios web"/><span className="field-hint">Obligatorio · máximo 200 caracteres</span></label>
      <label htmlFor="exam-description">Descripción <textarea id="exam-description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} disabled={saving} aria-required="true" placeholder="Describe los temas que cubrirá la evaluación."/><span className="field-hint">Obligatoria · explica el alcance del examen</span></label>
      <div className="form-actions"><button type="button" className="button secondary" disabled={saving} onClick={() => { window.location.hash = '/exams' }}>Cancelar</button><button type="submit" className="button" disabled={saving}>{saving ? 'Guardando…' : 'Guardar examen'}</button></div>
    </form>
  </section>
}
