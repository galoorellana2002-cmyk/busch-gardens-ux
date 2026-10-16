// Datos de ejemplo del prototipo. Parque, zonas, atracciones y precios son inventados:
// no corresponden a ningún parque real.

export const PARK = {
  name: 'Parque Horizonte',
  opens: 10 * 60,
  closes: 19 * 60,
}

// Coordenadas sobre el mapa ilustrado (viewBox 360 × 540).
export const ZONES = {
  entrada: { name: 'Entrada', x: 180, y: 510 },
  trueno: { name: 'Valle del Trueno', x: 245, y: 85, color: '#ffe3d1' },
  bosque: { name: 'Bosque Antiguo', x: 90, y: 160, color: '#d7f1d4' },
  sabana: { name: 'Sabana', x: 275, y: 285, color: '#f7eec9' },
  coral: { name: 'Puerto Coral', x: 75, y: 375, color: '#d4ecf8' },
  festival: { name: 'Ciudad Festival', x: 205, y: 430, color: '#efe1f8' },
}

export const CATEGORIES = [
  { id: 'todas', label: 'Todas' },
  { id: 'emocion', label: 'Emoción' },
  { id: 'familia', label: 'Familia' },
  { id: 'infantil', label: 'Infantiles' },
  { id: 'animales', label: 'Animales' },
  { id: 'show', label: 'Shows' },
]

// minHeight en cm (0 = sin restricción). base = espera típica en minutos con afluencia media al mediodía.
export const ATTRACTIONS = [
  {
    id: 'halcon', name: 'Halcón Veloz', zone: 'trueno', cat: 'emocion', kind: 'Montaña rusa',
    minHeight: 137, base: 50, duration: 4, x: 200, y: 62,
    desc: 'Lanzamiento a 100 km/h, dos inversiones y una caída casi vertical.',
  },
  {
    id: 'condor', name: 'Caída del Cóndor', zone: 'trueno', cat: 'emocion', kind: 'Torre de caída',
    minHeight: 122, base: 35, duration: 3, x: 292, y: 58,
    desc: 'Subida lenta a 60 m con vista a todo el parque y caída libre de tres segundos.',
  },
  {
    id: 'rio', name: 'Río Rápido', zone: 'bosque', cat: 'familia', kind: 'Balsas en rápidos',
    minHeight: 107, base: 30, duration: 7, x: 55, y: 120, wet: true,
    desc: 'Balsas redondas para seis personas entre cascadas. Vas a terminar mojado.',
  },
  {
    id: 'serpiente', name: 'Serpiente de Jade', zone: 'bosque', cat: 'familia', kind: 'Montaña rusa familiar',
    minHeight: 102, base: 25, duration: 3, x: 128, y: 200,
    desc: 'Curvas rápidas entre los árboles, sin inversiones. La primera montaña rusa ideal.',
  },
  {
    id: 'expedicion', name: 'Expedición Sabana', zone: 'sabana', cat: 'animales', kind: 'Safari en vehículo',
    minHeight: 0, base: 20, duration: 15, x: 250, y: 238,
    desc: 'Recorrido guiado entre cebras, jirafas y avestruces en un hábitat abierto.',
  },
  {
    id: 'jirafas', name: 'Mirador de Jirafas', zone: 'sabana', cat: 'animales', kind: 'Encuentro con animales',
    minHeight: 0, base: 15, duration: 10, x: 318, y: 312,
    desc: 'Plataforma elevada para ver de cerca a las jirafas a la hora de comer.',
  },
  {
    id: 'aves', name: 'Aves en Vuelo', zone: 'sabana', cat: 'show', kind: 'Show',
    minHeight: 0, base: 0, duration: 25, x: 245, y: 335, shows: ['11:00', '14:00', '16:30'],
    desc: 'Rapaces y loros vuelan sobre el público en un anfiteatro al aire libre.',
  },
  {
    id: 'arrecife', name: 'Arrecife Vivo', zone: 'coral', cat: 'animales', kind: 'Acuario',
    minHeight: 0, base: 5, duration: 15, x: 44, y: 332,
    desc: 'Túnel submarino con rayas, tortugas y un arrecife de coral recreado.',
  },
  {
    id: 'ola', name: 'Ola Gigante', zone: 'coral', cat: 'emocion', kind: 'Barco péndulo',
    minHeight: 122, base: 20, duration: 4, x: 112, y: 382,
    desc: 'Un barco que se balancea hasta quedar casi vertical sobre el lago.',
  },
  {
    id: 'torbellino', name: 'Torbellino', zone: 'coral', cat: 'familia', kind: 'Tazas giratorias',
    minHeight: 0, base: 15, duration: 3, x: 42, y: 432,
    desc: 'Tú controlas cuánto gira tu taza. Menores de 107 cm, con un adulto.',
  },
  {
    id: 'ritmos', name: 'Ritmos del Mundo', zone: 'festival', cat: 'show', kind: 'Show',
    minHeight: 0, base: 0, duration: 30, x: 205, y: 382, shows: ['12:00', '15:00', '18:00'],
    desc: 'Música y acrobacias en vivo en el teatro principal del parque.',
  },
  {
    id: 'carrusel', name: 'Carrusel de Estrellas', zone: 'festival', cat: 'infantil', kind: 'Carrusel',
    minHeight: 0, base: 5, duration: 4, x: 152, y: 436,
    desc: 'Carrusel clásico de dos pisos con animales de fantasía.',
  },
  {
    id: 'mariposas', name: 'Vuelo de Mariposas', zone: 'festival', cat: 'infantil', kind: 'Juego infantil',
    minHeight: 91, base: 10, duration: 3, x: 248, y: 458,
    desc: 'Mariposas que suben y bajan suavemente. Pensado para los más pequeños.',
  },
  {
    id: 'tren', name: 'Tren del Horizonte', zone: 'festival', cat: 'familia', kind: 'Tren panorámico',
    minHeight: 0, base: 10, duration: 20, x: 318, y: 480,
    desc: 'Vuelta completa al parque con paradas en la Sabana y el Valle del Trueno.',
  },
]

export const byId = Object.fromEntries(ATTRACTIONS.map((a) => [a.id, a]))

// Precios de ejemplo en USD según la afluencia prevista del día.
export const PRICES = {
  baja: { adult: 89, kid: 84 },
  media: { adult: 99, kid: 94 },
  alta: { adult: 114, kid: 109 },
}

export const CROWD = {
  baja: { label: 'Afluencia baja', short: 'Baja', factor: 0.7 },
  media: { label: 'Afluencia media', short: 'Media', factor: 1 },
  alta: { label: 'Afluencia alta', short: 'Alta', factor: 1.35 },
}
