import { ATTRACTIONS, ZONES } from './data.js'
import { Icon, waitLevel } from './ui.jsx'

// Mapa ilustrado propio (no es el plano de ningún parque real). Los marcadores son botones HTML
// encima del dibujo, para que tengan buen tamaño táctil y se puedan usar con teclado.
export default function ParkMap({ waits, visible, inPlan, tooTall, onOpen, selected }) {
  return (
    <div className="map" role="group" aria-label="Mapa del parque con tiempos de espera">
      <MapArt />
      {ATTRACTIONS.map((a) => {
        const show = a.cat === 'show'
        const w = waits[a.id]
        const shown = visible.has(a.id)
        const blocked = tooTall(a)
        const planned = inPlan.includes(a.id)
        const label = [
          a.name,
          a.kind,
          show ? `funciones ${a.shows.join(', ')}` : `espera ${w} minutos`,
          blocked ? 'no apta para la altura indicada' : null,
          planned ? 'en tu plan' : null,
        ].filter(Boolean).join(', ')
        return (
          <button
            key={a.id}
            type="button"
            className={[
              'pin',
              show ? 'show' : waitLevel(w),
              shown ? '' : 'faded',
              blocked ? 'blocked' : '',
              planned ? 'planned' : '',
              selected === a.id ? 'sel' : '',
            ].join(' ')}
            style={{ left: `${(a.x / 360) * 100}%`, top: `${(a.y / 540) * 100}%` }}
            onClick={(e) => onOpen(a.id, e.currentTarget)}
            aria-label={label}
            tabIndex={shown ? 0 : -1}
            aria-hidden={shown ? undefined : true}
          >
            <span className="pin-bubble">
              {show ? <Icon name="spark" size={16} /> : <b>{w}</b>}
              {show ? null : <small>min</small>}
            </span>
            {planned ? <span className="pin-check"><Icon name="check" size={11} stroke={3} /></span> : null}
          </button>
        )
      })}
    </div>
  )
}

function Zone({ id, d }) {
  return <path d={d} fill={ZONES[id].color} stroke="#fff" strokeWidth="3" />
}

function Tree({ x, y, r = 7 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#7cc98a" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.45} fill="#9bd8a6" />
    </g>
  )
}

function MapArt() {
  return (
    <svg className="map-art" viewBox="0 0 360 540" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lake" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fd3ff" />
          <stop offset="1" stopColor="#4aa8f0" />
        </linearGradient>
        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#c9e6c4" />
        </pattern>
      </defs>
      <rect width="360" height="540" fill="#eaf6e6" />
      <rect width="360" height="540" fill="url(#dots)" />

      <Zone id="trueno" d="M150 20 C210 0 330 10 350 40 C365 90 330 140 270 145 C220 150 160 130 150 95 C142 65 130 32 150 20Z" />
      <Zone id="bosque" d="M10 80 C40 60 120 70 160 110 C185 140 170 230 120 240 C70 250 15 220 10 170Z" />
      <Zone id="sabana" d="M200 190 C250 165 340 175 352 220 C362 280 350 345 300 360 C250 372 205 350 195 300 C188 260 180 205 200 190Z" />
      <Zone id="coral" d="M8 290 C40 270 120 300 150 345 C165 380 140 455 90 465 C40 472 8 450 8 400Z" />
      <Zone id="festival" d="M140 370 C180 350 280 360 345 400 C360 440 352 495 320 505 C260 515 180 500 150 480 C125 455 118 395 140 370Z" />

      <path d="M120 250 C150 245 200 262 190 300 C182 335 140 345 120 330 C95 312 92 258 120 250Z" fill="url(#lake)" />
      <path d="M128 285 q10 -6 20 0 t20 0" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />

      <g fill="none" stroke="#fffaf0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M180 535 L190 470 C200 430 230 410 250 380 C265 350 260 320 265 290 C270 250 250 200 245 150 C240 120 240 100 238 80" />
        <path d="M190 470 C150 440 110 420 85 390 C70 360 70 320 85 290 C100 260 110 230 100 200 C95 175 90 150 92 130" />
        <path d="M100 200 C150 170 200 140 240 120" />
      </g>
      <g fill="none" stroke="#e7dcc2" strokeWidth="1.5" strokeDasharray="3 5">
        <path d="M180 535 L190 470 C200 430 230 410 250 380 C265 350 260 320 265 290 C270 250 250 200 245 150 C240 120 240 100 238 80" />
        <path d="M190 470 C150 440 110 420 85 390 C70 360 70 320 85 290 C100 260 110 230 100 200 C95 175 90 150 92 130" />
      </g>

      <path d="M170 40 C185 10 200 10 210 40 S235 70 250 30 S285 10 300 45 S325 75 335 50" fill="none" stroke="#ff9f6b" strokeWidth="3" strokeLinecap="round" />
      <path d="M215 470 C240 488 280 492 330 478" fill="none" stroke="#c6a9e0" strokeWidth="3" strokeDasharray="2 4" />

      {[[30, 95], [150, 150], [40, 230], [160, 220], [70, 200], [330, 200], [215, 210], [340, 340], [25, 455], [135, 465], [335, 420]].map(([x, y]) => (
        <Tree key={`${x}-${y}`} x={x} y={y} />
      ))}

      <g className="map-labels" fontFamily="inherit" fontWeight="600" fontSize="11" fill="#3a3a3c" textAnchor="middle">
        <text x="300" y="118">Valle del Trueno</text>
        <text x="115" y="92">Bosque Antiguo</text>
        <text x="300" y="215">Sabana</text>
        <text x="92" y="292">Puerto Coral</text>
        <text x="210" y="498">Ciudad Festival</text>
      </g>
      <g transform="translate(180 524)">
        <rect x="-34" y="-11" width="68" height="20" rx="10" fill="#1d1d1f" />
        <text y="3.5" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#fff">Entrada</text>
      </g>
    </svg>
  )
}
