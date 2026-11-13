import { useEffect, useState } from 'react'
import ExamList from './components/ExamList/ExamList'
import ExamForm from './components/ExamForm/ExamForm'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [createdTitle, setCreatedTitle] = useState('')
  useEffect(() => {
    const handleRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])
  const isNewExam = route === '#/exams/new'
  function handleCreated(exam) {
    setCreatedTitle(exam.title)
    window.location.hash = '/exams'
  }
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#/exams"><span className="brand-mark">Q</span><span>Quiz<span className="brand-accent">Lab</span></span></a><span className="session-label">LABORATORIO 12 · SERVICIOS WEB</span><span className="badge">React + Django</span></header>
    <main className="workspace"><div className="intro"><p className="eyebrow">GESTIÓN ACADÉMICA</p><h1>{isNewExam ? <>Una nueva idea.<br/><span>Un nuevo examen.</span></> : <>Tu próxima evaluación<br/><span>empieza aquí.</span></>}</h1><p>{isNewExam ? 'Define el título y los temas de la evaluación.' : 'Organiza los exámenes de tu curso en un solo lugar.'}</p><a className="button intro-action" href={isNewExam ? '#/exams' : '#/exams/new'} onClick={() => setCreatedTitle('')}>{isNewExam ? '← Volver al listado' : '+ Nuevo examen'}</a></div>
    {isNewExam ? <ExamForm onCreated={handleCreated} /> : <>{createdTitle && <p role="status" className="notice">Se creó «{createdTitle}» correctamente.</p>}<ExamList /></>}</main>
    <footer>QuizLab · Desarrollo de Aplicaciones Empresariales · Semana 12</footer>
  </div>
}
