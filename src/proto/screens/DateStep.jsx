import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CROWD, PRICES } from '../data.js'
import { crowdFor, formatLong, money, monthName, ticketTotal, upcomingDays } from '../logic.js'
import { useProto } from '../store.jsx'
import { AppBar, BottomBar, Counter } from '../ui.jsx'

const WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

export default function DateStep({ step }) {
  const { state, set } = useProto()
  const navigate = useNavigate()
  const days = useMemo(() => upcomingDays(28), [])
  const lead = (days[0].date.getDay() + 6) % 7 // lunes = 0
  const cheapest = Math.min(...days.map((d) => d.price))
  const crowd = state.date ? crowdFor(state.date) : null
  const guests = state.adults + state.kids
  const total = ticketTotal(state)
  const hasKids = state.kids + state.infants > 0
  const ready = Boolean(state.date) && state.adults >= 1

  const months = [...new Set(days.map((d) => monthName(d.date)))].join(' – ')

  return (
    <div className="screen">
      <AppBar title="Fecha y visitantes" step={step} back="/prototipo" />
      <main className="screen-body">
        <h1 tabIndex={-1} className="screen-h1">¿Cuándo vienen?</h1>
        <p className="lead small">El precio depende de la afluencia prevista. Los días más tranquilos cuestan menos.</p>

        <section className="card" aria-labelledby="cal-title">
          <div className="cal-head">
            <h2 id="cal-title" className="card-title cap">{months}</h2>
            <span className="cal-from">desde {money(cheapest)}</span>
          </div>
          <div className="cal-legend" aria-hidden="true">
            <span><i className="dot baja" />Baja</span>
            <span><i className="dot media" />Media</span>
            <span><i className="dot alta" />Alta</span>
          </div>
          <div className="cal-grid" role="radiogroup" aria-label="Fecha de la visita">
            {WEEK.map((w) => (
              <span key={w} className="cal-wd" aria-hidden="true">{w}</span>
            ))}
            {Array.from({ length: lead }, (_, i) => (
              <span key={`b${i}`} aria-hidden="true" />
            ))}
            {days.map((d) => {
              const selected = state.date === d.iso
              return (
                <button
                  key={d.iso}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`cal-day ${d.crowd}${selected ? ' sel' : ''}`}
                  onClick={() => set({ date: d.iso })}
                  aria-label={`${formatLong(d.iso)}, ${CROWD[d.crowd].label.toLowerCase()}, ${money(d.price)} por adulto`}
                >
                  <span className="cal-n">{d.date.getDate()}</span>
                  <span className="cal-p">${d.price}</span>
                  <i className={`dot ${d.crowd}`} aria-hidden="true" />
                </button>
              )
            })}
          </div>
          {crowd ? (
            <p className="cal-sel cap" aria-live="polite">
              <strong>{formatLong(state.date)}</strong> · {CROWD[crowd].label} ·{' '}
              {money(PRICES[crowd].adult)} adulto, {money(PRICES[crowd].kid)} niño
            </p>
          ) : (
            <p className="cal-sel muted">Elige un día para ver el precio.</p>
          )}
        </section>

        <section className="card" aria-labelledby="who-title">
          <h2 id="who-title" className="card-title">¿Quiénes vienen?</h2>
          <Counter label="Adultos" hint="10 años o más" value={state.adults} min={1} max={10}
            onChange={(v) => set({ adults: v })} />
          <Counter label="Niños" hint="De 3 a 9 años" value={state.kids} max={10}
            onChange={(v) => set((s) => ({ kids: v, minHeight: v + s.infants > 0 ? (s.minHeight ?? 110) : null }))} />
          <Counter label="Menores de 3" hint="Entran gratis" value={state.infants} max={6}
            onChange={(v) => set((s) => ({ infants: v, minHeight: s.kids + v > 0 ? (s.minHeight ?? 95) : null }))} />

          {hasKids ? (
            <div className="height-box">
              <label htmlFor="h" className="height-label">
                Altura del niño más bajo
                <output htmlFor="h">{state.minHeight ?? 110} cm</output>
              </label>
              <input
                id="h"
                type="range"
                min={80}
                max={140}
                step={1}
                value={state.minHeight ?? 110}
                onChange={(e) => set({ minHeight: Number(e.target.value) })}
                aria-describedby="h-hint"
              />
              <p id="h-hint" className="hint">
                Lo usamos para marcar qué atracciones puede disfrutar. Puedes cambiarlo después; es una estimación.
              </p>
            </div>
          ) : null}
        </section>
      </main>
      <BottomBar>
        <div className="bb-total">
          <span className="bb-label">{guests} {guests === 1 ? 'entrada' : 'entradas'}{state.infants ? ` + ${state.infants} gratis` : ''}</span>
          <strong>{state.date ? money(total) : '—'}</strong>
        </div>
        <button type="button" className="pill" disabled={!ready} onClick={() => navigate('/prototipo/plan')}>
          {state.date ? 'Elegir atracciones' : 'Elige una fecha'}
        </button>
      </BottomBar>
    </div>
  )
}
