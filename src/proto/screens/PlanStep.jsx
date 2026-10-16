import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ATTRACTIONS, CATEGORIES, CROWD, ZONES, byId } from '../data.js'
import { crowdFor, liveWaits, nextShow, parkNowMinutes, clock } from '../logic.js'
import ParkMap from '../ParkMap.jsx'
import { useProto } from '../store.jsx'
import { AppBar, BottomBar, Icon, waitLevel } from '../ui.jsx'

const REFRESH_S = 15

export default function PlanStep({ step }) {
  const { state, toggle } = useProto()
  const navigate = useNavigate()
  const crowd = state.date ? crowdFor(state.date) : 'media'
  const [view, setView] = useState('mapa')
  const [cat, setCat] = useState('todas')
  const [onlyFit, setOnlyFit] = useState(false)
  const [sortByWait, setSortByWait] = useState(true)
  const [openId, setOpenId] = useState(null)
  const opener = useRef(null)

  // Simulación "en vivo": las esperas se recalculan cada 15 s.
  const [tick, setTick] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [updatedAt, setUpdatedAt] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (now - updatedAt >= REFRESH_S * 1000) {
      setUpdatedAt(now)
      setTick((n) => n + 1)
    }
  }, [now, updatedAt])
  const ago = Math.max(0, Math.floor((now - updatedAt) / 1000))
  const waits = useMemo(() => liveWaits(crowd, new Date(), tick), [crowd, tick])
  const nowMin = parkNowMinutes()

  const tooTall = (a) => state.minHeight != null && a.minHeight > state.minHeight
  const visibleList = ATTRACTIONS.filter((a) => (cat === 'todas' || a.cat === cat) && !(onlyFit && tooTall(a)))
  const visible = new Set(visibleList.map((a) => a.id))
  const sorted = sortByWait
    ? [...visibleList].sort((a, b) => (waits[a.id] ?? 999) - (waits[b.id] ?? 999))
    : visibleList

  const open = (id, el) => {
    opener.current = el
    setOpenId(id)
  }
  const close = () => {
    setOpenId(null)
    opener.current?.focus()
  }

  return (
    <div className="screen">
      <AppBar title="Mapa y atracciones" step={state.date ? step : null} back={state.date ? '/prototipo/fecha' : '/prototipo'} />
      <main className="screen-body flush">
        <div className="pad">
          <h1 tabIndex={-1} className="screen-h1">Elige qué quieren hacer</h1>
          <p className="live">
            <span className="live-dot" aria-hidden="true" />
            Esperas en vivo <span className="muted">(simuladas)</span> · actualizado hace {ago} s
          </p>
          {!state.date ? (
            <p className="note">
              <Icon name="info" size={18} /> Modo en el parque: afluencia {CROWD.media.short.toLowerCase()} de ejemplo.
            </p>
          ) : null}

          <div className="seg" role="tablist" aria-label="Vista">
            {[['mapa', 'Mapa', 'map'], ['lista', 'Lista', 'list']].map(([id, label, icon]) => (
              <button key={id} type="button" role="tab" aria-selected={view === id}
                className={view === id ? 'on' : ''} onClick={() => setView(id)}>
                <Icon name={icon} size={18} /> {label}
              </button>
            ))}
          </div>

          <div className="chips" role="group" aria-label="Filtrar por tipo">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className={`chip${cat === c.id ? ' on' : ''}`}
                aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          {state.minHeight != null ? (
            <label className="switch">
              <input type="checkbox" checked={onlyFit} onChange={(e) => setOnlyFit(e.target.checked)} />
              <span className="switch-ui" aria-hidden="true" />
              <span>Solo aptas para {state.minHeight} cm</span>
            </label>
          ) : null}
        </div>

        {view === 'mapa' ? (
          <div className="map-wrap">
            <ParkMap waits={waits} visible={visible} inPlan={state.plan} tooTall={tooTall} onOpen={open} selected={openId} />
            <div className="map-legend" aria-hidden="true">
              <span><i className="lg low" />≤ 15 min</span>
              <span><i className="lg mid" />16–35</span>
              <span><i className="lg high" />+35</span>
              <span><i className="lg show" />Show</span>
            </div>
          </div>
        ) : (
          <div className="pad">
            <div className="list-head">
              <span className="muted">{sorted.length} {sorted.length === 1 ? 'resultado' : 'resultados'}</span>
              <button type="button" className="text-btn" onClick={() => setSortByWait((v) => !v)} aria-pressed={sortByWait}>
                <Icon name="sort" size={16} /> {sortByWait ? 'Menor espera' : 'Por zona'}
              </button>
            </div>
            <ul className="attr-list">
              {sorted.map((a) => (
                <AttractionRow key={a.id} a={a} wait={waits[a.id]} nowMin={nowMin}
                  planned={state.plan.includes(a.id)} blocked={tooTall(a)} minHeight={state.minHeight}
                  onToggle={() => toggle(a.id)} onOpen={(el) => open(a.id, el)} />
              ))}
            </ul>
            {sorted.length === 0 ? (
              <p className="empty">
                Nada con estos filtros.{' '}
                <button type="button" className="text-btn" onClick={() => { setCat('todas'); setOnlyFit(false) }}>
                  Quitar filtros
                </button>
              </p>
            ) : null}
          </div>
        )}
      </main>

      <BottomBar>
        <div className="bb-total">
          <span className="bb-label">En tu plan</span>
          <strong aria-live="polite">
            {state.plan.length} {state.plan.length === 1 ? 'atracción' : 'atracciones'}
          </strong>
        </div>
        {state.date ? (
          <button type="button" className="pill" disabled={state.plan.length === 0}
            onClick={() => navigate('/prototipo/itinerario')}>
            Ver mi día
          </button>
        ) : (
          <button type="button" className="pill" onClick={() => navigate('/prototipo/fecha')}>
            Elegir fecha
          </button>
        )}
      </BottomBar>

      {openId ? (
        <Sheet a={byId[openId]} wait={waits[openId]} nowMin={nowMin} planned={state.plan.includes(openId)}
          blocked={tooTall(byId[openId])} minHeight={state.minHeight}
          onToggle={() => toggle(openId)} onClose={close} />
      ) : null}
    </div>
  )
}

function WaitBadge({ a, wait, nowMin }) {
  if (a.cat === 'show') {
    const next = nextShow(a, nowMin)
    return <span className="wait show">{next != null ? `Próx. ${clock(next)}` : 'Mañana'}</span>
  }
  return (
    <span className={`wait ${waitLevel(wait)}`}>
      <b>{wait}</b> min
    </span>
  )
}

function AttractionRow({ a, wait, nowMin, planned, blocked, minHeight, onToggle, onOpen }) {
  return (
    <li className={`attr${blocked ? ' blocked' : ''}`}>
      <button type="button" className="attr-main" onClick={(e) => onOpen(e.currentTarget)}>
        <span className={`attr-art ${a.cat}`} aria-hidden="true" />
        <span className="attr-text">
          <strong>{a.name}</strong>
          <span>{a.kind} · {ZONES[a.zone].name}</span>
          <span className="attr-tags">
            {a.minHeight ? (
              <span className={`tag${blocked ? ' warn' : ''}`}>
                <Icon name="ruler" size={13} /> {a.minHeight} cm{blocked ? ` · no apta (${minHeight} cm)` : ''}
              </span>
            ) : <span className="tag">Sin altura mínima</span>}
            {a.wet ? <span className="tag"><Icon name="drop" size={13} /> Te mojas</span> : null}
          </span>
        </span>
        <WaitBadge a={a} wait={wait} nowMin={nowMin} />
      </button>
      <button type="button" className={`add${planned ? ' on' : ''}`} onClick={onToggle}
        aria-pressed={planned} aria-label={planned ? `Quitar ${a.name} del plan` : `Añadir ${a.name} al plan`}>
        <Icon name={planned ? 'check' : 'plus'} size={18} stroke={2.4} />
      </button>
    </li>
  )
}

function Sheet({ a, wait, nowMin, planned, blocked, minHeight, onToggle, onClose }) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    const el = ref.current
    el?.querySelector('h2')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current()
      if (e.key === 'Tab') {
        const f = [...el.querySelectorAll('button')]
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [])

  return (
    <div className="sheet-layer" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" ref={ref}
        onClick={(e) => e.stopPropagation()}>
        <div className={`sheet-art ${a.cat}`} aria-hidden="true">
          <span className="sheet-grab" />
        </div>
        <div className="sheet-body">
          <div className="sheet-top">
            <div>
              <p className="sheet-eyebrow">{a.kind} · {ZONES[a.zone].name}</p>
              <h2 id="sheet-title" tabIndex={-1}>{a.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
              <Icon name="close" size={20} />
            </button>
          </div>
          <p>{a.desc}</p>
          <dl className="facts">
            <div>
              <dt>{a.cat === 'show' ? 'Funciones' : 'Espera ahora'}</dt>
              <dd>{a.cat === 'show' ? a.shows.join(' · ') : <WaitBadge a={a} wait={wait} nowMin={nowMin} />}</dd>
            </div>
            <div><dt>Duración</dt><dd>{a.duration} min</dd></div>
            <div><dt>Altura mínima</dt><dd>{a.minHeight ? `${a.minHeight} cm` : 'Sin restricción'}</dd></div>
          </dl>
          {blocked ? (
            <p className="alert">
              <Icon name="warn" size={18} />
              <span>
                El más pequeño ({minHeight} cm) no llega a {a.minHeight} cm. Si la añades, un adulto puede esperar con
                él y cambiar de turno al bajar (intercambio de pasajeros).
              </span>
            </p>
          ) : null}
          <button type="button" className={`pill wide${planned ? ' ghost' : ''}`} onClick={onToggle} aria-pressed={planned}>
            {planned ? 'Quitar de mi plan' : 'Añadir a mi plan'}
          </button>
        </div>
      </div>
    </div>
  )
}
