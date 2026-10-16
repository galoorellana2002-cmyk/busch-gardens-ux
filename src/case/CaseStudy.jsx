import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Disclaimer from '../components/Disclaimer.jsx'
import { Ilustrativo, Real } from '../components/Badges.jsx'
import useReveal from '../components/useReveal.js'
import {
  DECISIONS, FINDINGS, FLOW_AFTER, FLOW_BEFORE, LEARNINGS, METHODS, PAINS, PERSONAS, PROCESS, REAL, TASKS,
} from './content.js'
import { DecisionArt, HeroPhone } from './Art.jsx'
import '../styles/case.css'

const PORTFOLIO = 'https://alejandoroorellana.dev'
const REPO = 'https://github.com/galoorellana2002-cmyk/busch-gardens-ux'

const SECTIONS = [
  ['problema', 'Problema'],
  ['investigacion', 'Investigación'],
  ['flujos', 'Flujos'],
  ['diseno', 'Diseño'],
  ['pruebas', 'Pruebas'],
  ['resultados', 'Resultados'],
]

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function CaseStudy() {
  useReveal()
  useEffect(() => {
    document.title = 'Busch Gardens · Caso UX/UI — Alejandro Orellana'
  }, [])

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Disclaimer />
      <header className="gnav">
        <div className="wrap gnav-row">
          <a className="brand" href={PORTFOLIO}>
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>Alejandro Orellana</span>
          </a>
          <nav aria-label="Secciones del caso" className="gnav-links">
            {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <Link className="pill sm" to="/prototipo">Probar prototipo</Link>
        </div>
      </header>

      <main id="contenido">
        {/* ---------- Portada ---------- */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Caso de estudio · UX/UI · {REAL.country}</p>
              <h1>{REAL.client}</h1>
              <p className="hero-sub">Planificar el día en el parque, sin fricción: de elegir la fecha a saber qué fila hacer primero.</p>
              <div className="hero-stat">
                <span className="big-grad">{REAL.satisfaction}</span>
                <span>{REAL.satisfactionNote} <Real /></span>
              </div>
              <div className="hero-cta">
                <Link className="pill" to="/prototipo">Probar el prototipo</Link>
                <a className="more" href="#problema">Leer el caso</a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true"><HeroPhone /></div>
          </div>

          <div className="wrap">
            <dl className="specs">
              <div><dt>Periodo</dt><dd>{REAL.period} <Real /></dd></div>
              <div><dt>Alcance</dt><dd>{REAL.scope.join(' · ')} <Real /></dd></div>
              <div><dt>Herramientas</dt><dd>Figma para flujos y prototipos</dd></div>
              <div><dt>Mi rol</dt><dd>Investigación, rediseño de flujos, prototipado y pruebas</dd></div>
            </dl>

            <aside className="legend" aria-label="Cómo leer las cifras">
              <p><Real /> viene del proyecto (mi CV): cliente, periodo, alcance y el aumento del 25 % en satisfacción.</p>
              <p><Ilustrativo /> es una reconstrucción para explicar el proceso. Por confidencialidad no publico pantallas, citas ni datos del cliente; esos números y citas no son reales.</p>
            </aside>
          </div>

          <nav className="wrap toc" aria-label="En esta página">
            {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </section>

        {/* ---------- Problema ---------- */}
        <section id="problema" className="band dark on-dark">
          <div className="wrap">
            <p className="eyebrow reveal">El problema <Ilustrativo /></p>
            <h2 className="headline reveal">Comprar una entrada era fácil.<br />Planificar el día, no.</h2>
            <p className="intro reveal">
              El flujo se pensó para vender entradas, no para preparar la visita. Quien venía en familia o por primera vez
              tenía que armar el plan por su cuenta, en varias pestañas y de memoria.
            </p>
            <div className="grid3">
              {PAINS.map((p) => (
                <article key={p.title} className="tile dark-tile reveal">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Investigación ---------- */}
        <section id="investigacion" className="band">
          <div className="wrap">
            <p className="eyebrow reveal">Investigación <Ilustrativo /></p>
            <h2 className="headline reveal">Escuchar antes de dibujar.</h2>
            <p className="intro reveal">Cuatro métodos para entender cómo se prepara una visita, de la idea hasta la puerta.</p>
            <div className="grid4">
              {METHODS.map((m) => (
                <article key={m.title} className="tile soft reveal">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              ))}
            </div>

            <h3 className="subhead reveal">Hallazgos</h3>
            <ol className="findings">
              {FINDINGS.map((f) => (
                <li key={f.n} className="reveal">
                  <span className="f-n">{f.n}</span>
                  <div><h4>{f.title}</h4><p>{f.text}</p></div>
                </li>
              ))}
            </ol>

            <h3 className="subhead reveal">Personas <Ilustrativo>Personas y citas ilustrativas</Ilustrativo></h3>
            <div className="grid3">
              {PERSONAS.map((p) => (
                <article key={p.name} className="tile persona reveal">
                  <div className="p-head">
                    <span className="avatar" style={{ background: p.grad }} aria-hidden="true">{p.initials}</span>
                    <div><h4>{p.name}</h4><p className="muted">{p.role}</p></div>
                  </div>
                  <blockquote>
                    <p>“{p.quote}”</p>
                    <footer>Cita ilustrativa</footer>
                  </blockquote>
                  <dl>
                    <div><dt>Quiere</dt><dd>{p.goal}</dd></div>
                    <div><dt>Le frustra</dt><dd>{p.pain}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Flujos ---------- */}
        <section id="flujos" className="band gray">
          <div className="wrap">
            <p className="eyebrow reveal">Flujos de usuario <Ilustrativo>Reconstrucción ilustrativa</Ilustrativo></p>
            <h2 className="headline reveal">De nueve pasos sueltos<br />a cinco que se conectan.</h2>
            <p className="intro reveal">
              El rediseño de flujos fue el centro del proyecto. Así se ve la idea, reconstruida con el prototipo de este sitio.
            </p>

            <div className="flows">
              <figure className="flow before reveal" aria-labelledby="fb-cap">
                <figcaption id="fb-cap"><span className="flow-tag">Antes</span> Comprar y planificar por separado</figcaption>
                <ol className="flow-list">
                  {FLOW_BEFORE.map((s, i) => (
                    <li key={s.label} className={s.pain ? 'pain' : ''}>
                      <span className="node-n">{i + 1}</span>
                      <span className="node-t">
                        <strong>{s.label}</strong>
                        {s.note ? <small>{s.note}</small> : null}
                      </span>
                      {s.pain ? <span className="node-flag">Fricción</span> : null}
                    </li>
                  ))}
                </ol>
                <p className="flow-loop">
                  <LoopIcon /> Si el precio no convencía en el paso 3, se volvía al paso 2 y se empezaba de nuevo.
                </p>
              </figure>

              <figure className="flow after reveal" aria-labelledby="fa-cap">
                <figcaption id="fa-cap"><span className="flow-tag new">Después</span> Un solo recorrido: planificar es comprar</figcaption>
                <ol className="flow-list">
                  {FLOW_AFTER.map((s, i) => (
                    <li key={s.label}>
                      <span className="node-n">{i + 1}</span>
                      <span className="node-t">
                        <strong>{s.label}</strong>
                        <small>{s.note}</small>
                      </span>
                      <Link className="node-link" to={s.to} aria-label={`Ver “${s.label}” en el prototipo`}>Ver</Link>
                    </li>
                  ))}
                </ol>
                <p className="flow-end">
                  <span className="end-dot" aria-hidden="true" /> Confirmación con entradas e itinerario juntos, y el mapa con esperas ya dentro del flujo.
                </p>
              </figure>
            </div>

            <FlowCompare />
          </div>
        </section>

        {/* ---------- Decisiones de diseño ---------- */}
        <section id="diseno" className="band">
          <div className="wrap">
            <p className="eyebrow reveal">Decisiones de diseño</p>
            <h2 className="headline reveal">Cada pantalla responde<br />a un hallazgo.</h2>
            <div className="decisions">
              {DECISIONS.map((d, i) => (
                <article key={d.n} className={`decision reveal${i === 0 ? ' wide' : ''}`}>
                  <div className="d-art" aria-hidden="true"><DecisionArt kind={d.art} /></div>
                  <div className="d-copy">
                    <span className="d-n">{d.n} · responde al {d.finding.toLowerCase()}</span>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                    <Link className="more" to={d.to}>Verlo en el prototipo</Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="a11y reveal">
              <h3>Accesible desde el principio</h3>
              <ul>
                <li>Contraste AA en textos y estados.</li>
                <li>Objetivos táctiles de 44 px o más.</li>
                <li>Esperas con número y color, nunca solo color.</li>
                <li>Mapa con lista equivalente y foco visible.</li>
                <li>Sin animaciones si el sistema pide reducir movimiento.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Proceso ---------- */}
        <section className="band gray" aria-labelledby="proc-title">
          <div className="wrap">
            <p className="eyebrow reveal">Proceso · {REAL.period} <Ilustrativo>Fases ilustrativas</Ilustrativo></p>
            <h2 id="proc-title" className="headline reveal">Seis meses, cinco etapas.</h2>
            <ol className="process">
              {PROCESS.map((p) => (
                <li key={p.title} className="reveal">
                  <span className="p-when">{p.when}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Pruebas ---------- */}
        <section id="pruebas" className="band">
          <div className="wrap">
            <p className="eyebrow reveal">Pruebas de usabilidad <Ilustrativo /></p>
            <h2 className="headline reveal">Medir antes y después.</h2>
            <p className="intro reveal">
              Las mismas cinco tareas, primero con el flujo anterior y después con el prototipo en Figma. Sesiones moderadas
              de unos 30 minutos, 8 participantes por ronda. Los números de esta sección son ilustrativos.
            </p>

            <div className="tests reveal">
              <div className="tests-legend" aria-hidden="true">
                <span><i className="sw before" />Antes</span>
                <span><i className="sw after" />Después</span>
              </div>
              <table className="tasks">
                <caption className="sr-only">Tasa de éxito y tiempo medio por tarea, antes y después del rediseño (datos ilustrativos)</caption>
                <thead>
                  <tr>
                    <th scope="col">Tarea</th>
                    <th scope="col">Tasa de éxito</th>
                    <th scope="col">Tiempo medio</th>
                  </tr>
                </thead>
                <tbody>
                  {TASKS.map((t, i) => (
                    <tr key={t.task}>
                      <th scope="row"><span className="t-n">{i + 1}</span>{t.task}</th>
                      <td>
                        <Bar label="Antes" value={t.before[0]} max={100} text={`${t.before[0]} %`} kind="before" />
                        <Bar label="Después" value={t.after[0]} max={100} text={`${t.after[0]} %`} kind="after" />
                      </td>
                      <td>
                        <Bar label="Antes" value={t.before[1]} max={360} text={mmss(t.before[1])} kind="before" />
                        <Bar label="Después" value={t.after[1]} max={360} text={mmss(t.after[1])} kind="after" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="fine">Tiempo en minutos:segundos. Barras de tiempo: más corta es mejor.</p>
            </div>

            <div className="grid3 iter">
              <article className="tile soft reveal">
                <h3>Ronda 1</h3>
                <p>Los participantes no veían el filtro de altura dentro de los filtros. Se movió a “¿Quiénes vienen?”.</p>
              </article>
              <article className="tile soft reveal">
                <h3>Ronda 2</h3>
                <p>El mapa solo con colores confundía. Se añadió el número de minutos en cada marcador y una leyenda.</p>
              </article>
              <article className="tile soft reveal">
                <h3>Después de lanzar</h3>
                <p>Encuesta de satisfacción a visitantes para comparar con la medición anterior al rediseño.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Resultados ---------- */}
        <section id="resultados" className="band dark on-dark results">
          <div className="wrap center">
            <p className="eyebrow reveal">Resultados</p>
            <p className="giant reveal"><span className="big-grad">{REAL.satisfaction}</span></p>
            <p className="giant-sub reveal">{REAL.satisfactionNote}. <Real /></p>
            <div className="grid3 results-grid">
              <div className="reveal"><strong>9 → 5</strong><span>pasos para comprar y planificar</span><Ilustrativo /></div>
              <div className="reveal"><strong>≥ 75 %</strong><span>de éxito en las cinco tareas de la segunda ronda</span><Ilustrativo /></div>
              <div className="reveal"><strong>1</strong><span>solo recorrido: entradas e itinerario juntos</span><Ilustrativo /></div>
            </div>
          </div>
        </section>

        {/* ---------- Aprendizajes ---------- */}
        <section className="band" aria-labelledby="learn-title">
          <div className="wrap">
            <p className="eyebrow reveal">Aprendizajes</p>
            <h2 id="learn-title" className="headline reveal">Lo que me llevo.</h2>
            <div className="grid3">
              {LEARNINGS.map((l) => (
                <article key={l.title} className="tile soft reveal">
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Llamado al prototipo ---------- */}
        <section className="band cta-band">
          <div className="wrap center">
            <h2 className="headline reveal">Pruébalo tú mismo.</h2>
            <p className="intro reveal center">
              El flujo rediseñado, reconstruido en código: elige una fecha, arma tu día con el mapa y haz una compra simulada.
              Funciona en el celular.
            </p>
            <div className="hero-cta center reveal">
              <Link className="pill" to="/prototipo">Abrir el prototipo</Link>
              <a className="more" href={REPO}>Ver en GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>
            <strong>Proyecto de portafolio.</strong> Concepto no oficial, sin afiliación con Busch Gardens ni SeaWorld Parks
            &amp; Entertainment. Las marcas pertenecen a sus dueños. No se usan logotipos, fotos ni recursos de la marca: el
            parque del prototipo, sus atracciones, ilustraciones y precios son inventados.
          </p>
          <p>
            Diseño y desarrollo: <a href={PORTFOLIO}>Alejandro Orellana</a> · <a href={REPO}>Código en GitHub</a>
          </p>
        </div>
      </footer>
    </>
  )
}

function Bar({ label, value, max, text, kind }) {
  return (
    <div className={`bar ${kind}`}>
      <span className="bar-l">{label}</span>
      <span className="bar-track"><i style={{ width: `${Math.max(4, (value / max) * 100)}%` }} /></span>
      <span className="bar-v">{text}</span>
    </div>
  )
}

function LoopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 12a8 8 0 0113.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 01-13.7 5.6L4 15.5M4 20v-4.5h4.5" />
    </svg>
  )
}

// Diagrama SVG que resume el cambio de estructura: pasos y puntos de fricción.
function FlowCompare() {
  const before = FLOW_BEFORE.length
  const after = FLOW_AFTER.length
  const step = 64
  return (
    <figure className="compare reveal">
      <svg viewBox="0 0 640 170" role="img" aria-labelledby="cmp-t cmp-d">
        <title id="cmp-t">Comparación de flujos</title>
        <desc id="cmp-d">
          Antes: {before} pasos, 4 con fricción y una vuelta atrás. Después: {after} pasos en línea, sin vueltas. Diagrama ilustrativo.
        </desc>
        <text x="0" y="22" className="c-lab">Antes</text>
        <line x1="60" y1="46" x2={60 + (before - 1) * step} y2="46" className="c-line" />
        <path d={`M${60 + 2 * step} 34 C ${60 + 2 * step} 4, ${60 + step} 4, ${60 + step} 34`} className="c-loop" />
        {FLOW_BEFORE.map((s, i) => (
          <circle key={s.label} cx={60 + i * step} cy="46" r="11" className={s.pain ? 'c-pain' : 'c-node'} />
        ))}
        <text x="0" y="112" className="c-lab">Después</text>
        <line x1="60" y1="136" x2={60 + (after - 1) * step * 1.6} y2="136" className="c-line new" />
        {FLOW_AFTER.map((s, i) => (
          <circle key={s.label} cx={60 + i * step * 1.6} cy="136" r="13" className="c-new" />
        ))}
      </svg>
      <figcaption>
        <span><i className="c-key node" />Paso</span>
        <span><i className="c-key pain" />Fricción</span>
        <span><i className="c-key new" />Paso rediseñado</span>
      </figcaption>
    </figure>
  )
}
