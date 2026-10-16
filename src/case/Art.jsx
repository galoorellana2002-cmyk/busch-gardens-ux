// Ilustraciones propias en SVG: maquetas simplificadas del prototipo. Sin fotos ni recursos de marca.

const G = (
  <defs>
    <linearGradient id="gb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#30d158" />
      <stop offset="1" stopColor="#0a84ff" />
    </linearGradient>
  </defs>
)

export function HeroPhone() {
  const pins = [
    [70, 150, '#d70015', '50'], [150, 120, '#b25000', '35'], [60, 250, '#1a7f37', '10'],
    [170, 230, '#7d3cb5', '★'], [120, 320, '#1a7f37', '5'], [190, 330, '#b25000', '20'],
  ]
  return (
    <svg viewBox="0 0 260 520" className="phone-svg">
      {G}
      <rect x="4" y="4" width="252" height="512" rx="42" fill="#1d1d1f" />
      <rect x="14" y="14" width="232" height="492" rx="33" fill="#fbfbfd" />
      <rect x="98" y="24" width="64" height="18" rx="9" fill="#1d1d1f" />
      <text x="130" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1d1d1f">Mapa y atracciones</text>
      <rect x="30" y="80" width="200" height="3" rx="1.5" fill="#ececf0" />
      <rect x="30" y="80" width="100" height="3" rx="1.5" fill="url(#gb)" />
      <rect x="26" y="96" width="208" height="300" rx="18" fill="#eaf6e6" />
      <path d="M40 110 C90 96 150 100 220 112 L220 190 C170 200 100 196 40 186Z" fill="#ffe3d1" />
      <path d="M40 200 C80 196 120 214 112 290 L40 296Z" fill="#d7f1d4" />
      <path d="M130 200 C180 196 220 210 220 270 C210 300 150 300 130 280Z" fill="#f7eec9" />
      <path d="M40 304 C90 300 130 320 120 380 L40 384Z" fill="#d4ecf8" />
      <path d="M95 250 C120 244 140 262 132 282 C120 296 96 290 92 272Z" fill="#6ab9f5" />
      {pins.map(([x, y, c, t]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="15" fill={c} stroke="#fff" strokeWidth="3" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{t}</text>
        </g>
      ))}
      <rect x="26" y="410" width="208" height="56" rx="16" fill="#fff" stroke="#ececf0" />
      <rect x="40" y="424" width="70" height="8" rx="4" fill="#d2d2d7" />
      <rect x="40" y="440" width="44" height="12" rx="6" fill="#1d1d1f" />
      <rect x="148" y="422" width="74" height="32" rx="16" fill="#0071e3" />
      <text x="185" y="442" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Ver mi día</text>
    </svg>
  )
}

export function DecisionArt({ kind }) {
  if (kind === 'calendar') {
    const prices = [89, 99, 89, 89, 99, 114, 114, 89, 89, 99, 89, 99, 114, 114]
    return (
      <svg viewBox="0 0 320 200">
        {G}
        <rect x="10" y="10" width="300" height="180" rx="20" fill="#fff" />
        {prices.map((p, i) => {
          const x = 24 + (i % 7) * 40
          const y = 40 + Math.floor(i / 7) * 66
          const sel = i === 3
          const c = p === 89 ? '#1a7f37' : p === 99 ? '#c27c0e' : '#d70015'
          return (
            <g key={i}>
              <rect x={x} y={y} width="34" height="56" rx="10" fill={sel ? '#0071e3' : '#f5f5f7'} />
              <text x={x + 17} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={sel ? '#fff' : '#1d1d1f'}>{i + 12}</text>
              <text x={x + 17} y={y + 37} textAnchor="middle" fontSize="9" fill={sel ? '#fff' : '#6e6e73'}>${p}</text>
              <circle cx={x + 17} cy={y + 47} r="3" fill={sel ? '#fff' : c} />
            </g>
          )
        })}
        <text x="24" y="30" fontSize="11" fontWeight="600" fill="#1a7f37">desde $89</text>
      </svg>
    )
  }
  if (kind === 'height') {
    return (
      <svg viewBox="0 0 320 200">
        {G}
        <rect x="10" y="10" width="300" height="180" rx="20" fill="#fff" />
        <text x="30" y="44" fontSize="13" fontWeight="600" fill="#1d1d1f">Altura del niño más bajo</text>
        <text x="290" y="44" textAnchor="end" fontSize="13" fontWeight="700" fill="#0066cc">110 cm</text>
        <rect x="30" y="62" width="260" height="6" rx="3" fill="#e3e3e8" />
        <rect x="30" y="62" width="130" height="6" rx="3" fill="#0071e3" />
        <circle cx="160" cy="65" r="11" fill="#fff" stroke="#d2d2d7" />
        {[['Serpiente de Jade', '102 cm', true], ['Caída del Cóndor', '122 cm', false]].map(([n, h, ok], i) => (
          <g key={n} transform={`translate(30 ${96 + i * 44})`}>
            <rect width="260" height="36" rx="10" fill={ok ? '#e3f6e8' : '#fff4e5'} />
            <text x="12" y="23" fontSize="12" fontWeight="600" fill="#1d1d1f">{n}</text>
            <text x="248" y="23" textAnchor="end" fontSize="11" fontWeight="600" fill={ok ? '#0f5d26' : '#8a3c00'}>{ok ? `${h} · apta` : `${h} · no apta`}</text>
          </g>
        ))}
      </svg>
    )
  }
  if (kind === 'map') {
    return (
      <svg viewBox="0 0 320 200">
        <rect x="10" y="10" width="300" height="180" rx="20" fill="#eaf6e6" />
        <path d="M20 30 C90 16 180 20 300 36 L300 90 C200 100 100 96 20 86Z" fill="#ffe3d1" />
        <path d="M20 100 C80 96 130 110 140 180 L20 180Z" fill="#d4ecf8" />
        <path d="M160 110 C220 100 290 110 300 140 L300 180 L170 180Z" fill="#f7eec9" />
        <path d="M30 140 C120 120 200 160 290 60" fill="none" stroke="#fffaf0" strokeWidth="8" strokeLinecap="round" />
        {[[70, 56, '#d70015', '45'], [200, 50, '#b25000', '30'], [80, 140, '#1a7f37', '10'], [230, 145, '#7d3cb5', '★'], [150, 110, '#1a7f37', '15']].map(([x, y, c, t]) => (
          <g key={`${x}`}>
            <circle cx={x} cy={y} r="17" fill={c} stroke="#fff" strokeWidth="3" />
            <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{t}</text>
          </g>
        ))}
      </svg>
    )
  }
  if (kind === 'timeline') {
    const rows = [['10:04', 'Halcón Veloz', '25 min'], ['10:36', 'Caída del Cóndor', '20 min'], ['11:00', 'Aves en Vuelo', 'Show']]
    return (
      <svg viewBox="0 0 320 200">
        {G}
        <rect x="10" y="10" width="300" height="180" rx="20" fill="#fff" />
        <line x1="58" y1="40" x2="58" y2="170" stroke="#e3e3e8" strokeWidth="2" />
        {rows.map(([t, n, w], i) => (
          <g key={n} transform={`translate(0 ${30 + i * 52})`}>
            <text x="58" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d1d1f">{t}</text>
            <rect x="86" y="2" width="206" height="40" rx="12" fill="#f5f5f7" />
            <text x="100" y="27" fontSize="12" fontWeight="600" fill="#1d1d1f">{n}</text>
            <rect x="222" y="12" width="60" height="20" rx="7" fill={w === 'Show' ? '#f2e8fc' : '#fff0d9'} />
            <text x="252" y="26" textAnchor="middle" fontSize="10" fontWeight="600" fill={w === 'Show' ? '#5b2a86' : '#874000'}>{w}</text>
          </g>
        ))}
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 320 200">
      {G}
      <rect x="10" y="10" width="300" height="180" rx="20" fill="#fff" />
      {['Visita', 'Entradas', 'Tu día'].map((t, i) => (
        <g key={t} transform={`translate(26 ${26 + i * 44})`}>
          <rect width="268" height="36" rx="10" fill="#f5f5f7" />
          <text x="12" y="23" fontSize="12" fontWeight="600" fill="#1d1d1f">{t}</text>
          <text x="256" y="23" textAnchor="end" fontSize="11" fill="#0066cc">Cambiar</text>
        </g>
      ))}
      <rect x="26" y="160" width="268" height="22" rx="11" fill="#0071e3" />
      <text x="160" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Comprar como invitado</text>
    </svg>
  )
}
