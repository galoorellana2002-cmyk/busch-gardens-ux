import { Link, useNavigate } from 'react-router-dom'
import { CROWD, PRICES } from '../data.js'
import { clock, crowdFor, formatLong, money, schedule, ticketTotal } from '../logic.js'
import { useProto } from '../store.jsx'
import { AppBar, BottomBar, Icon } from '../ui.jsx'

export default function ReviewStep({ step }) {
  const { state, set } = useProto()
  const navigate = useNavigate()
  const crowd = crowdFor(state.date)
  const price = PRICES[crowd]
  const total = ticketTotal(state)
  const plan = schedule(state.plan, crowd, state.start)

  const confirm = () => {
    set({ confirmedAt: new Date().toISOString() })
    navigate('/prototipo/listo')
  }

  return (
    <div className="screen">
      <AppBar title="Revisión y compra" step={step} back="/prototipo/itinerario" />
      <main className="screen-body">
        <h1 tabIndex={-1} className="screen-h1">Revisa y confirma</h1>
        <p className="lead small">Todo en una pantalla. Puedes cambiar cualquier cosa sin perder lo demás.</p>

        <div className="demo-banner" role="note">
          <Icon name="info" size={20} />
          <p>
            <strong>Compra simulada.</strong> Este prototipo no pide ni guarda datos de pago y no cobra nada. Las
            entradas que genera no sirven para entrar a ningún parque.
          </p>
        </div>

        <section className="card" aria-labelledby="r-visit">
          <div className="row-head">
            <h2 id="r-visit" className="card-title">Visita</h2>
            <Link to="/prototipo/fecha" aria-label="Cambiar fecha y visitantes">Cambiar</Link>
          </div>
          <p className="cap"><strong>{formatLong(state.date)}</strong></p>
          <p className="muted">{CROWD[crowd].label}</p>
        </section>

        <section className="card" aria-labelledby="r-tix">
          <div className="row-head">
            <h2 id="r-tix" className="card-title">Entradas</h2>
            <Link to="/prototipo/fecha" aria-label="Cambiar entradas">Cambiar</Link>
          </div>
          <table className="lines">
            <tbody>
              <tr><th scope="row">{state.adults} × Adulto</th><td>{money(state.adults * price.adult)}</td></tr>
              {state.kids ? <tr><th scope="row">{state.kids} × Niño (3–9)</th><td>{money(state.kids * price.kid)}</td></tr> : null}
              {state.infants ? <tr><th scope="row">{state.infants} × Menor de 3</th><td>Gratis</td></tr> : null}
            </tbody>
            <tfoot>
              <tr><th scope="row">Total</th><td>{money(total)}</td></tr>
            </tfoot>
          </table>
          <p className="fine left">Precios de ejemplo en USD, impuestos incluidos.</p>
        </section>

        <section className="card" aria-labelledby="r-plan">
          <div className="row-head">
            <h2 id="r-plan" className="card-title">Tu día</h2>
            <Link to="/prototipo/itinerario" aria-label="Cambiar itinerario">Cambiar</Link>
          </div>
          {plan.items.length ? (
            <>
              <p><strong>{plan.items.length} {plan.items.length === 1 ? 'atracción' : 'atracciones'}</strong> · {clock(state.start)} a {clock(plan.ends)}</p>
              <p className="muted">{plan.items.map((i) => i.a.name).join(' · ')}</p>
            </>
          ) : (
            <p className="muted">Sin itinerario. Puedes armarlo después de comprar.</p>
          )}
        </section>

        <section className="card" aria-labelledby="r-guest">
          <h2 id="r-guest" className="card-title">Compra como invitado</h2>
          <p className="muted">No hace falta crear una cuenta. En el flujo real, aquí iría el pago con un proveedor externo.</p>
        </section>
      </main>
      <BottomBar>
        <div className="bb-total">
          <span className="bb-label">Total</span>
          <strong>{money(total)}</strong>
        </div>
        <button type="button" className="pill" onClick={confirm}>Confirmar compra simulada</button>
      </BottomBar>
    </div>
  )
}
