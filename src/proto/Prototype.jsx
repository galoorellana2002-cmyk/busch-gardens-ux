import { useEffect, useRef } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer.jsx'
import { ProtoProvider, useProto } from './store.jsx'
import Welcome from './screens/Welcome.jsx'
import DateStep from './screens/DateStep.jsx'
import PlanStep from './screens/PlanStep.jsx'
import ItineraryStep from './screens/ItineraryStep.jsx'
import ReviewStep from './screens/ReviewStep.jsx'
import DoneStep from './screens/DoneStep.jsx'
import '../styles/proto.css'

const STEPS = [
  { path: 'fecha', label: 'Fecha y visitantes' },
  { path: 'plan', label: 'Mapa y atracciones' },
  { path: 'itinerario', label: 'Tu día' },
  { path: 'revision', label: 'Revisión y compra' },
]

export default function Prototype() {
  useEffect(() => {
    document.title = 'Prototipo · Planifica tu visita — Caso UX/UI'
  }, [])
  return (
    <ProtoProvider>
      <Shell />
    </ProtoProvider>
  )
}

function Shell() {
  const { pathname } = useLocation()
  const screenRef = useRef(null)
  const current = pathname.split('/')[2] || ''
  const stepIndex = current === 'listo' ? STEPS.length : STEPS.findIndex((s) => s.path === current)

  // Cada pantalla nueva empieza arriba y lleva el foco a su título (lectores de pantalla).
  useEffect(() => {
    screenRef.current?.scrollTo?.({ top: 0, behavior: 'instant' })
    window.scrollTo({ top: 0, behavior: 'instant' })
    const h = screenRef.current?.querySelector('h1')
    h?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="proto-page">
      <Disclaimer compact />
      <div className="proto-layout">
        <aside className="proto-side" aria-label="Sobre este prototipo">
          <Link to="/" className="back-case">‹ Caso de estudio</Link>
          <h2>Prototipo interactivo</h2>
          <p>
            Reconstrucción en código del flujo rediseñado más representativo: <strong>planificar la visita</strong>,
            ver el mapa con tiempos de espera, armar el itinerario y comprar las entradas.
          </p>
          <ol className="side-steps">
            {STEPS.map((s, i) => (
              <li key={s.path} className={i === stepIndex ? 'on' : i < stepIndex ? 'done' : ''}>
                <span>{i + 1}</span>
                {s.label}
              </li>
            ))}
          </ol>
          <p className="side-note">
            Parque, atracciones, precios y tiempos de espera son <strong>datos de ejemplo</strong>. La compra es una
            simulación: no se piden ni se guardan datos de pago.
          </p>
        </aside>

        <div className="device" aria-label="Pantalla del prototipo">
          <div className="device-screen" ref={screenRef}>
            <Routes>
              <Route index element={<Welcome />} />
              <Route path="fecha" element={<DateStep step={1} />} />
              <Route path="plan" element={<PlanStep step={2} />} />
              <Route path="itinerario" element={<Guard need="date"><ItineraryStep step={3} /></Guard>} />
              <Route path="revision" element={<Guard need="date"><ReviewStep step={4} /></Guard>} />
              <Route path="listo" element={<Guard need="confirmed"><DoneStep /></Guard>} />
              <Route path="*" element={<Navigate to="/prototipo" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

function Guard({ need, children }) {
  const { state } = useProto()
  if (need === 'date' && !state.date) return <Navigate to="/prototipo/fecha" replace />
  if (need === 'confirmed' && !state.confirmedAt) return <Navigate to="/prototipo/revision" replace />
  return children
}

