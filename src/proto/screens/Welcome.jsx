import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PARK } from '../data.js'
import { formatLong } from '../logic.js'
import { useProto } from '../store.jsx'
import { AppBar, Icon } from '../ui.jsx'

export default function Welcome() {
  const { state, reset } = useProto()
  const resumable = state.date && !state.confirmedAt
  const location = useLocation()
  const navigate = useNavigate()
  const restart = Boolean(location.state?.restart)

  useEffect(() => {
    if (restart) {
      reset()
      navigate('/prototipo', { replace: true, state: null })
    }
  }, [restart, reset, navigate])

  return (
    <div className="screen">
      <AppBar title={PARK.name} back="/" backLabel="Volver al caso de estudio" />
      <main className="screen-body">
        <div className="hero-card" aria-hidden="true">
          <HeroArt />
        </div>
        <h1 tabIndex={-1} className="screen-h1">Planifica tu día en un solo lugar</h1>
        <p className="lead">
          Elige la fecha con el mejor precio, mira qué atracciones pueden disfrutar todos y llega con el día armado.
        </p>

        <ul className="value-list">
          <li>
            <span className="vi"><Icon name="calendar" /></span>
            <div><strong>Precio y afluencia por día</strong><span>Antes de elegir el tipo de entrada.</span></div>
          </li>
          <li>
            <span className="vi"><Icon name="ruler" /></span>
            <div><strong>Filtro por altura</strong><span>Sabes qué puede hacer cada niño antes de llegar.</span></div>
          </li>
          <li>
            <span className="vi"><Icon name="clock" /></span>
            <div><strong>Esperas en el mapa</strong><span>Y un itinerario que se ordena solo.</span></div>
          </li>
        </ul>

        {resumable ? (
          <div className="resume">
            <p>
              Tienes un plan para el <strong>{formatLong(state.date)}</strong> con {state.plan.length}{' '}
              {state.plan.length === 1 ? 'atracción' : 'atracciones'}.
            </p>
            <div className="resume-actions">
              <Link className="pill" to="/prototipo/itinerario">Continuar</Link>
              <button type="button" className="text-btn" onClick={reset}>Empezar de cero</button>
            </div>
          </div>
        ) : null}

        <div className="stack">
          <Link className="pill wide" to="/prototipo/fecha">Planificar mi visita</Link>
          <Link className="pill ghost wide" to="/prototipo/plan">Ya estoy en el parque: ver mapa</Link>
        </div>
        <p className="fine">Prototipo de portafolio con datos de ejemplo. No es un sitio de venta real.</p>
      </main>
    </div>
  )
}

function HeroArt() {
  return (
    <svg viewBox="0 0 340 180" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#30d158" />
          <stop offset="1" stopColor="#0a84ff" />
        </linearGradient>
      </defs>
      <rect width="340" height="180" fill="url(#hsky)" />
      <circle cx="270" cy="48" r="22" fill="#fff" opacity=".85" />
      <path d="M0 150 C60 110 110 135 170 112 S280 90 340 120 V180 H0Z" fill="#fff" opacity=".18" />
      <path d="M0 165 C70 140 140 160 200 142 S300 128 340 146 V180 H0Z" fill="#fff" opacity=".28" />
      <path
        d="M20 140 C40 60 70 60 90 120 S130 150 150 80 S200 40 220 110 S270 140 300 70"
        fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"
      />
      {[40, 70, 110, 150, 190, 230, 270].map((x) => (
        <line key={x} x1={x} y1="180" x2={x} y2="118" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      ))}
    </svg>
  )
}
