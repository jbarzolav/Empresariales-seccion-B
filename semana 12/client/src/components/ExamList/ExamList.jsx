import { useState } from 'react'
import { useExams } from '../../hooks/useExams'
import { deleteExam, getApiError } from '../../services/api'
import { ErrorState, LoadingState } from '../RequestState/RequestState'

export default function ExamList() {
  const { data, loading, error, page, setPage, refresh } = useExams()
  const [pendingExam, setPendingExam] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState('')
  const [notice, setNotice] = useState('')

  async function handleDelete() {
    setDeleting(true)
    setActionError('')
    setNotice('')
    try {
      await deleteExam(pendingExam.id)
      setNotice(`Se eliminó «${pendingExam.title}» correctamente.`)
      setPendingExam(null)
      if (data.results.length === 1 && page > 1) setPage(page - 1)
      else refresh()
    } catch (failure) {
      setActionError(getApiError(failure))
    } finally {
      setDeleting(false)
    }
  }
  return <section className="panel">
    <div className="section-heading"><div><p className="eyebrow">BIBLIOTECA DE EVALUACIONES</p><h2>Exámenes disponibles</h2></div><button className="button secondary" onClick={refresh}>Actualizar</button></div>
    {notice && <p className="notice" role="status">{notice}</p>}
    {actionError && <p className="form-error" role="alert">{actionError}</p>}
    {pendingExam && <div className="confirm-row"><span>¿Eliminar «{pendingExam.title}»? Sus preguntas y alternativas también se eliminarán.</span><div className="actions"><button className="button secondary" disabled={deleting} onClick={() => setPendingExam(null)}>Cancelar</button><button className="button" disabled={deleting} onClick={handleDelete}>{deleting ? 'Eliminando…' : 'Confirmar eliminación'}</button></div></div>}
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={refresh} /> : <>
      <p className="count">{data.count} exámenes registrados</p>
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Título</th><th>Descripción</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>
        {data.results.map((exam) => <tr key={exam.id}><td>#{exam.id}</td><td className="exam-title">{exam.title}</td><td>{exam.description}</td><td>{new Date(exam.created_date).toLocaleDateString('es-PE')}</td><td><button className="danger" disabled={deleting} aria-label={`Eliminar ${exam.title}`} onClick={() => { setPendingExam(exam); setActionError(''); setNotice('') }}>Eliminar</button></td></tr>)}
      </tbody></table></div>
      {!data.results.length && <p className="empty">No hay exámenes registrados.</p>}
      <div className="pagination"><button disabled={!data.previous} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page}</span><button disabled={!data.next} onClick={() => setPage(page + 1)}>Siguiente</button></div>
    </>}
  </section>
}
