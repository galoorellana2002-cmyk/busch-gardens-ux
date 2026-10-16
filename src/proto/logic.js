import { ATTRACTIONS, CROWD, PARK, PRICES, ZONES, byId } from './data.js'

// ---------- Fechas ----------

export function isoDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseIso(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const fmtLong = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' })
const fmtWeekday = new Intl.DateTimeFormat('es', { weekday: 'short' })
const fmtMonth = new Intl.DateTimeFormat('es', { month: 'long' })

export const formatLong = (iso) => fmtLong.format(parseIso(iso))
export const weekdayShort = (d) => fmtWeekday.format(d).replace('.', '')
export const monthName = (d) => fmtMonth.format(d)

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// Afluencia prevista: fines de semana altos, viernes medio, el resto varía (determinista por fecha).
export function crowdFor(iso) {
  const day = parseIso(iso).getDay()
  if (day === 0 || day === 6) return 'alta'
  if (day === 5) return 'media'
  return hash(iso) % 3 === 0 ? 'media' : 'baja'
}

export function upcomingDays(count = 28, from = new Date()) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    const iso = isoDate(d)
    const crowd = crowdFor(iso)
    return { iso, date: d, crowd, price: PRICES[crowd].adult }
  })
}

// ---------- Entradas ----------

export function ticketTotal({ date, adults, kids }) {
  if (!date) return 0
  const p = PRICES[crowdFor(date)]
  return adults * p.adult + kids * p.kid
}

export const money = (n) =>
  new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

// ---------- Tiempos de espera ----------

// Forma típica de un día: poca fila al abrir, pico después del almuerzo, baja al final.
const CURVE = [
  [10, 0.5], [11, 0.8], [12, 1], [13, 1.15], [14, 1.2], [15, 1.1], [16, 0.95], [17, 0.8], [18, 0.6], [19, 0.5],
]

export function hourFactor(hour) {
  if (hour <= CURVE[0][0]) return CURVE[0][1]
  for (let i = 1; i < CURVE.length; i++) {
    const [h1, f1] = CURVE[i]
    const [h0, f0] = CURVE[i - 1]
    if (hour <= h1) return f0 + ((hour - h0) / (h1 - h0)) * (f1 - f0)
  }
  return CURVE[CURVE.length - 1][1]
}

const round5 = (n) => Math.max(0, Math.round(n / 5) * 5)

export function predictedWait(a, crowd, minutes) {
  if (a.cat === 'show') return 0
  return round5(a.base * CROWD[crowd].factor * hourFactor(minutes / 60))
}

// Hora del parque para la vista "en vivo": la hora real, llevada al horario de apertura.
export function parkNowMinutes(now = new Date()) {
  const m = now.getHours() * 60 + now.getMinutes()
  if (m < PARK.opens || m >= PARK.closes) return 13 * 60 + 30
  return m
}

export function liveWaits(crowd, now = new Date(), tick = 0) {
  const minutes = parkNowMinutes(now)
  const out = {}
  for (const a of ATTRACTIONS) {
    if (a.cat === 'show') continue
    // Ruido pequeño y estable por atracción y por actualización, para que se mueva sin saltar.
    const noise = ((hash(`${a.id}-${tick}`) % 11) - 5) * (a.base > 20 ? 1 : 0.4)
    out[a.id] = round5(a.base * CROWD[crowd].factor * hourFactor(minutes / 60) + noise)
  }
  return out
}

export function nextShow(a, minutes) {
  return (a.shows || []).map(toMinutes).find((t) => t >= minutes) ?? null
}

// ---------- Itinerario ----------

export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const clock = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function walkMinutes(fromZone, toZone) {
  if (fromZone === toZone) return 2
  const a = ZONES[fromZone]
  const b = ZONES[toZone]
  return Math.round(Math.hypot(a.x - b.x, a.y - b.y) / 30) + 2
}

export function schedule(ids, crowd, start = PARK.opens) {
  let t = start
  let pos = 'entrada'
  const items = []
  for (const id of ids) {
    const a = byId[id]
    if (!a) continue
    const walk = walkMinutes(pos, a.zone)
    t += walk
    let wait
    let missed = false
    if (a.cat === 'show') {
      const next = nextShow(a, t)
      if (next === null) {
        missed = true
        wait = 0
      } else {
        wait = next - t
      }
    } else {
      wait = predictedWait(a, crowd, t)
    }
    t += wait
    const begins = t
    if (!missed) t += a.duration
    items.push({ a, walk, wait, begins, ends: t, missed, late: t > PARK.closes })
    pos = a.zone
  }
  return { items, ends: t, totalWait: items.reduce((s, i) => s + (i.a.cat === 'show' ? 0 : i.wait), 0) }
}

// Orden sugerido: el que termina antes sin perder funciones de shows ni pasarse del cierre.
// Con pocas atracciones se prueban todas las combinaciones; con muchas, se elige paso a paso
// lo que cueste menos (caminar + esperar) desde donde estás.
function cost(ids, crowd, start) {
  const { items, ends } = schedule(ids, crowd, start)
  return ends + items.filter((i) => i.missed).length * 1000 + items.filter((i) => i.late).length * 300
}

function permutations(list) {
  if (list.length <= 1) return [list]
  return list.flatMap((x, i) => permutations([...list.slice(0, i), ...list.slice(i + 1)]).map((p) => [x, ...p]))
}

export function optimize(ids, crowd, start = PARK.opens) {
  if (ids.length <= 7) {
    let best = ids
    let bestCost = cost(ids, crowd, start)
    for (const p of permutations(ids)) {
      const c = cost(p, crowd, start)
      if (c < bestCost) {
        best = p
        bestCost = c
      }
    }
    return best
  }
  const left = [...ids]
  const order = []
  while (left.length) {
    let best = null
    for (const id of left) {
      const c = cost([...order, id], crowd, start)
      if (!best || c < best.c) best = { id, c }
    }
    order.push(best.id)
    left.splice(left.indexOf(best.id), 1)
  }
  return cost(order, crowd, start) < cost(ids, crowd, start) ? order : ids
}

// ---------- Confirmación ----------

export function bookingCode(state) {
  const h = hash(JSON.stringify([state.date, state.adults, state.kids, state.infants, state.plan, state.confirmedAt]))
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let s = ''
  let n = h
  for (let i = 0; i < 8; i++) {
    s += chars[n % chars.length]
    n = Math.floor(n / chars.length) || hash(s)
  }
  return `HZ-${s.slice(0, 4)}-${s.slice(4)}`
}

// Matriz decorativa tipo código QR (no codifica nada). 21 × 21 con los tres marcadores.
export function fakeQr(seed) {
  const size = 21
  let h = hash(seed)
  const cells = []
  const finder = (x, y) => {
    for (const [fx, fy] of [[0, 0], [14, 0], [0, 14]]) {
      const dx = x - fx
      const dy = y - fy
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        const ring = Math.min(dx, dy, 6 - dx, 6 - dy)
        return ring === 0 || ring >= 2 ? 1 : 0
      }
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return 0
    }
    return null
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const f = finder(x, y)
      let on
      if (f !== null) on = f
      else {
        h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0
        h = (h + x * 31 + y * 17) >>> 0
        on = h % 100 < 47 ? 1 : 0
      }
      if (on) cells.push([x, y])
    }
  }
  return { size, cells }
}

export function buildIcs(state) {
  const { items } = schedule(state.plan, crowdFor(state.date), state.start)
  const d = state.date.replaceAll('-', '')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const t = (m) => `${d}T${clock(m).replace(':', '')}00`
  const esc = (s) => s.replace(/[,;\\]/g, (c) => `\\${c}`)
  const events = items
    .filter((i) => !i.missed)
    .map(
      (i, n) => [
        'BEGIN:VEVENT',
        `UID:${state.date}-${n}-${i.a.id}@parque-horizonte.demo`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${t(i.begins)}`,
        `DTEND:${t(i.ends)}`,
        `SUMMARY:${esc(i.a.name)} (demo)`,
        `LOCATION:${esc(ZONES[i.a.zone].name)} · ${PARK.name}`,
        'DESCRIPTION:Itinerario de demostración. Proyecto de portafolio\\, no es una reserva real.',
        'END:VEVENT',
      ].join('\r\n'),
    )
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Portafolio//Prototipo UX//ES', ...events, 'END:VCALENDAR'].join('\r\n')
}
