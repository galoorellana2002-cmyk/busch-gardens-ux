import { useNavigate } from 'react-router-dom'

const TOTAL = 4

export function AppBar({ title, step, back, backLabel = 'Volver' }) {
  const navigate = useNavigate()
  return (
    <header className="appbar">
      <div className="appbar-row">
        {back ? (
          <button type="button" className="icon-btn" onClick={() => navigate(back)} aria-label={backLabel}>
            <Icon name="back" />
          </button>
        ) : (
          <span className="icon-btn-space" />
        )}
        <div className="appbar-title">
          {step ? <span className="appbar-step">Paso {step} de {TOTAL}</span> : null}
          <span>{title}</span>
        </div>
        <span className="demo-tag" title="Prototipo de demostración">Demo</span>
      </div>
      {step ? (
        <div
          className="progress"
          role="progressbar"
          aria-label="Progreso"
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step}
        >
          <i style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>
      ) : null}
    </header>
  )
}

export function BottomBar({ children }) {
  return <div className="bottombar">{children}</div>
}

export function Counter({ label, hint, value, min = 0, max = 10, onChange }) {
  return (
    <div className="counter">
      <div>
        <div className="counter-label">{label}</div>
        {hint ? <div className="counter-hint">{hint}</div> : null}
      </div>
      <div className="counter-ctrl" role="group" aria-label={label}>
        <button
          type="button"
          className="round"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`Quitar uno: ${label}`}
        >
          −
        </button>
        <output aria-live="polite" aria-label={`${label}: ${value}`}>{value}</output>
        <button
          type="button"
          className="round"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`Añadir uno: ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

// Badge de espera: color + texto (nunca solo color).
export function waitLevel(min) {
  if (min <= 15) return 'low'
  if (min <= 35) return 'mid'
  return 'high'
}

const PATHS = {
  back: 'M15 5l-7 7 7 7',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zm0 0v14m6-12v14',
  list: 'M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  close: 'M6 6l12 12M18 6L6 18',
  up: 'M6 15l6-6 6 6',
  down: 'M6 9l6 6 6-6',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  clock: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  walk: 'M13 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM10 21l2-6 3 3v3m-5-12l-3 4m3-4l3 1 2 3m-5-4v6',
  ruler: 'M4 20L20 4M7 17l2 2M10 14l1.5 1.5M13 11l2 2M16 8l1.5 1.5',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  ticket: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 000-4V7zm10-2v14',
  calendar: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  warn: 'M12 9v4m0 3.5h.01M10.3 4.3L2.6 18a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0z',
  drop: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
  sort: 'M7 4v16m0 0l-3-3m3 3l3-3M17 20V4m0 0l-3 3m3-3l3 3',
  info: 'M12 16v-5m0-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

export function Icon({ name, size = 22, stroke = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
