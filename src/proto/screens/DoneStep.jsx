import { Link, useNavigate } from 'react-router-dom'
import { PARK, ZONES } from '../data.js'
import { bookingCode, buildIcs, clock, crowdFor, fakeQr, formatLong, money, schedule, ticketTotal } from '../logic.js'
import { useProto } from '../store.jsx'
import { AppBar, Icon } from '../ui.jsx'

export default function DoneStep() {
  const { state } = useProto()
  const navigate = useNavigate()
  const code = bookingCode(state)
  const qr = fakeQr(code)
  const plan = schedule(state.plan, crowdFor(state.date), state.start)
  const guests = state.adults + state.kids + state.infants

  const downloadIcs = () => {
    const blob = new Blob([buildIcs(state)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `itinerario-demo-${state.date}.ics`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  // Se reinicia al llegar a la bienvenida; si se reiniciara aquí, la guarda de esta ruta redirigiría antes.
  const again = () => navigate('/prototipo', { state: { restart: true } })

  return (
    <div className="screen">
      <AppBar title="Listo" />
      <main className="screen-body">
        <div className="done-mark" aria-hidden="true"><Icon name="check" size={34} stroke={3} /></div>
        <h1 tabIndex={-1} className="screen-h1 center">¡Todo listo!</h1>
        <p className="lead small center">Tu compra simulada se completó. Así se vería la confirmación.</p>

        <article className="ticket" aria-label="Entrada de demostración">
          <div className="ticket-top">
            <span className="ticket-park">{PARK.name}</span>
            <span className="ticket-demo">Demo · no válida</span>
          </div>
          <div className="ticket-main">
            <div className="qr-wrap">
              <svg viewBox={`-1 -1 ${qr.size + 2} ${qr.size + 2}`} className="qr" role="img"
                aria-label="Código decorativo de demostración, no es una entrada válida">
                <rect x="-1" y="-1" width={qr.size + 2} height={qr.size + 2} fill="#fff" />
                {qr.cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="#1d1d1f" />)}
              </svg>
              <span className="qr-stamp" aria-hidden="true">DEMO</span>
            </div>
            <dl className="ticket-facts">
              <div><dt>Fecha</dt><dd className="cap">{formatLong(state.date)}</dd></div>
              <div><dt>Visitantes</dt><dd>{guests}</dd></div>
              <div><dt>Código</dt><dd className="mono">{code}</dd></div>
              <div><dt>Total simulado</dt><dd>{money(ticketTotal(state))}</dd></div>
            </dl>
          </div>
        </article>

        {plan.items.length ? (
          <section className="card" aria-labelledby="d-plan">
            <h2 id="d-plan" className="card-title">Tu itinerario</h2>
            <ol className="mini-plan">
              {plan.items.filter((i) => !i.missed).map((i) => (
                <li key={i.a.id}>
                  <span className="mono">{clock(i.begins)}</span>
                  <span><strong>{i.a.name}</strong> <span className="muted">· {ZONES[i.a.zone].name}</span></span>
                </li>
              ))}
            </ol>
            <button type="button" className="pill ghost wide" onClick={downloadIcs}>
              <Icon name="calendar" size={18} /> Añadir al calendario (.ics)
            </button>
          </section>
        ) : null}

        <div className="stack">
          <Link className="pill wide" to="/">Volver al caso de estudio</Link>
          <button type="button" className="text-btn center" onClick={again}>Probar el flujo otra vez</button>
        </div>
        <p className="fine">Proyecto de portafolio. No se procesó ningún pago ni se guardaron datos personales.</p>
      </main>
    </div>
  )
}
