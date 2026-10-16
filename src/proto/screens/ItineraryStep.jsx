import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CROWD, PARK, ZONES } from '../data.js'
import { clock, crowdFor, formatLong, optimize, schedule } from '../logic.js'
import { useProto } from '../store.jsx'
import { AppBar, BottomBar, Icon, waitLevel } from '../ui.jsx'

const ARRIVALS = [600, 630, 660, 720, 780]

export default function ItineraryStep({ step }) {
  const { state, set } = useProto()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const crowd = crowdFor(state.date)
  const plan = schedule(state.plan, crowd, state.start)

  const move = (i, dir) => {
    const next = [...state.plan]
    const j = i + dir
    ;[next[i], next[j]] = [next[j], next[i]]
    set({ plan: next })
    setMessage('')
  }
  const remove = (id) => {
    set({ plan: state.plan.filter((x) => x !== id) })
    setMessage('')
  }
  const autoOrder = () => {
    const order = optimize(state.plan, crowd, state.start)
    const after = schedule(order, crowd, state.start)
    const saved = plan.ends - after.ends
    if (saved > 0) {
      set({ plan: order })
      setMessage(`Listo: terminas ${saved} min antes (${clock(after.ends)}).`)
    } else {
      setMessage('Tu orden ya es el más rápido que encontramos.')
    }
  }

  const tooTall = (a) => state.minHeight != null && a.minHeight > state.minHeight

  return (
    <div className="screen">
      <AppBar title="Tu día" step={step} back="/prototipo/plan" />
      <main className="screen-body">
        <h1 tabIndex={-1} className="screen-h1">Tu día, hora por hora</h1>
        <p className="lead small cap">{formatLong(state.date)} · {CROWD[crowd].label.toLowerCase()}</p>

        <section className="card summary" aria-label="Resumen del día">
          <label className="arrive">
            <span>Llegada</span>
            <select value={state.start} onChange={(e) => { set({ start: Number(e.target.value) }); setMessage('') }}>
              {ARRIVALS.map((m) => <option key={m} value={m}>{clock(m)}</option>)}
            </select>
          </label>
          <div><span>Terminas</span><strong>{plan.items.length ? clock(plan.ends) : '—'}</strong></div>
          <div><span>Espera prevista</span><strong>{plan.totalWait} min</strong></div>
        </section>

        {plan.items.length > 1 ? (
          <button type="button" className="pill ghost wide" onClick={autoOrder}>
            <Icon name="spark" size={18} /> Ordenar para esperar menos
          </button>
        ) : null}
        <p className="toast" role="status" aria-live="polite">{message}</p>

        {plan.items.length === 0 ? (
          <div className="empty card">
            <p>Todavía no hay atracciones en tu plan.</p>
            <Link className="pill" to="/prototipo/plan">Elegir atracciones</Link>
          </div>
        ) : (
          <ol className="timeline">
            {plan.items.map((it, i) => (
              <li key={it.a.id} className={it.missed || it.late ? 'issue' : ''}>
                <div className="tl-time">{it.missed ? '—' : clock(it.begins)}</div>
                <div className="tl-card">
                  <div className="tl-head">
                    <div>
                      <strong>{it.a.name}</strong>
                      <span className="muted">{ZONES[it.a.zone].name}</span>
                    </div>
                    <div className="tl-ctrl">
                      <button type="button" className="icon-btn sm" onClick={() => move(i, -1)} disabled={i === 0}
                        aria-label={`Subir ${it.a.name}`}><Icon name="up" size={18} /></button>
                      <button type="button" className="icon-btn sm" onClick={() => move(i, 1)}
                        disabled={i === plan.items.length - 1} aria-label={`Bajar ${it.a.name}`}><Icon name="down" size={18} /></button>
                      <button type="button" className="icon-btn sm" onClick={() => remove(it.a.id)}
                        aria-label={`Quitar ${it.a.name}`}><Icon name="trash" size={18} /></button>
                    </div>
                  </div>
                  <div className="tl-meta">
                    <span><Icon name="walk" size={15} /> {it.walk} min a pie</span>
                    {it.a.cat === 'show' ? (
                      <span className="wait show">Función {it.missed ? '—' : clock(it.begins)}</span>
                    ) : (
                      <span className={`wait ${waitLevel(it.wait)}`}><b>{it.wait}</b> min de fila</span>
                    )}
                    <span><Icon name="clock" size={15} /> {it.a.duration} min</span>
                  </div>
                  {it.missed ? (
                    <p className="alert sm"><Icon name="warn" size={16} /> A esa hora ya no hay funciones. Súbelo en la lista.</p>
                  ) : it.late ? (
                    <p className="alert sm"><Icon name="warn" size={16} /> Termina después del cierre ({clock(PARK.closes)}).</p>
                  ) : null}
                  {tooTall(it.a) ? (
                    <p className="alert sm soft"><Icon name="ruler" size={16} /> No apta para {state.minHeight} cm: usen intercambio de pasajeros.</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
        <Link className="more add-more" to="/prototipo/plan">Añadir más atracciones</Link>
        <p className="fine">Esperas previstas a partir de datos de ejemplo. El parque abre de {clock(PARK.opens)} a {clock(PARK.closes)}.</p>
      </main>
      <BottomBar>
        <div className="bb-total">
          <span className="bb-label">{plan.items.length} en el plan</span>
          <strong>{plan.items.length ? `${clock(state.start)}–${clock(plan.ends)}` : '—'}</strong>
        </div>
        <button type="button" className="pill" onClick={() => navigate('/prototipo/revision')}>Comprar entradas</button>
      </BottomBar>
    </div>
  )
}
