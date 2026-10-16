// Contenido del caso de estudio. Solo son reales los datos del CV (cliente, periodo, alcance y el +25 %).
// Todo lo demás es una reconstrucción ilustrativa para explicar el proceso, y se marca como tal en pantalla.

export const REAL = {
  client: 'Busch Gardens',
  country: 'Estados Unidos',
  period: '10/2024 – 03/2025',
  scope: ['Rediseño de flujos de usuario', 'Prototipado en Figma', 'Testing de usabilidad'],
  satisfaction: '+25%',
  satisfactionNote: 'en satisfacción de usuario, según encuestas post‑implementación',
}

export const PAINS = [
  {
    title: 'El precio aparecía al final',
    text: 'Primero se elegía el tipo de entrada y después la fecha. El precio cambiaba en ese momento y muchos volvían atrás.',
  },
  {
    title: 'La altura se descubría en la fila',
    text: 'Las restricciones de altura vivían en la ficha de cada atracción, lejos de donde las familias planificaban.',
  },
  {
    title: 'Planificar y comprar eran dos mundos',
    text: 'Mapa, horarios de shows y tiempos de espera estaban fuera del flujo de compra. El plan se hacía de memoria.',
  },
]

export const METHODS = [
  { title: 'Evaluación heurística', text: 'Recorrido del flujo de compra y planificación contra principios de usabilidad.' },
  { title: 'Entrevistas', text: 'Conversaciones con visitantes frecuentes y de primera vez sobre cómo preparan el día.' },
  { title: 'Pruebas del flujo actual', text: 'Tareas cronometradas sobre el sitio existente para medir la línea base.' },
  { title: 'Mapa de recorrido', text: 'Del “queremos ir” al “ya estamos dentro”, con los momentos de duda marcados.' },
]

export const FINDINGS = [
  { n: '01', title: 'La fecha decide todo', text: 'El precio y la afluencia dependen del día, así que la fecha tiene que ir primero.' },
  { n: '02', title: 'Las familias filtran por el más pequeño', text: 'La pregunta real no es “¿qué hay?”, sino “¿qué podemos hacer todos?”.' },
  { n: '03', title: 'La espera pesa más que la distancia', text: 'Los visitantes cruzan el parque si eso les ahorra una fila larga.' },
  { n: '04', title: 'Crear una cuenta frena la compra', text: 'Pedir registro antes de pagar provocaba abandonos en el último paso.' },
]

export const PERSONAS = [
  {
    initials: 'MR',
    name: 'Mariana',
    role: '38 años · Viene con sus dos hijos',
    goal: 'Saber antes de llegar qué puede hacer cada niño.',
    pain: 'Descubrir en la fila que el menor no llega a la altura.',
    quote: 'Lo peor es hacer 40 minutos de fila y que al final no lo dejen subir.',
    grad: 'linear-gradient(135deg,#30d158,#0a84ff)',
  },
  {
    initials: 'DV',
    name: 'Diego',
    role: '24 años · Fan de las montañas rusas',
    goal: 'Subirse a todas las montañas rusas en un solo día.',
    pain: 'No saber qué fila está más corta en este momento.',
    quote: 'Si sé dónde hay menos fila, cruzo el parque sin pensarlo.',
    grad: 'linear-gradient(135deg,#ff9f0a,#ff375f)',
  },
  {
    initials: 'LT',
    name: 'Linda y Tom',
    role: '60+ · Visitantes de un día',
    goal: 'Comprar rápido y no perderse los shows.',
    pain: 'Crear una cuenta y comparar doce tipos de entrada.',
    quote: 'Solo queremos dos entradas para el sábado. ¿Por qué tantos pasos?',
    grad: 'linear-gradient(135deg,#bf5af2,#5e5ce6)',
  },
]

export const FLOW_BEFORE = [
  { label: 'Inicio' },
  { label: 'Tipo de entrada', note: '12 opciones' },
  { label: 'Fecha', note: 'el precio cambia aquí', pain: true },
  { label: 'Crear cuenta', note: 'obligatorio', pain: true },
  { label: 'Datos de visitantes' },
  { label: 'Pago' },
  { label: 'Correo de confirmación' },
  { label: 'Mapa en PDF', note: 'fuera del flujo', pain: true },
  { label: 'Esperas', note: 'solo dentro del parque', pain: true },
]

export const FLOW_AFTER = [
  { label: 'Fecha', note: 'con precio y afluencia', to: '/prototipo/fecha' },
  { label: 'Quiénes vienen', note: 'edades y altura', to: '/prototipo/fecha' },
  { label: 'Mapa y atracciones', note: 'esperas y filtros', to: '/prototipo/plan' },
  { label: 'Tu día', note: 'itinerario que se ordena solo', to: '/prototipo/itinerario' },
  { label: 'Revisión y compra', note: 'como invitado', to: '/prototipo/revision' },
]

export const DECISIONS = [
  {
    n: '01',
    title: 'La fecha va primero, con el precio a la vista',
    text: 'Un calendario muestra el precio y la afluencia de cada día antes de elegir nada más. Los días tranquilos se ven más baratos de un vistazo.',
    finding: 'Hallazgo 01',
    to: '/prototipo/fecha',
    art: 'calendar',
  },
  {
    n: '02',
    title: '“¿Quiénes vienen?” incluye la altura',
    text: 'Un solo dato, la altura del niño más bajo, filtra y marca las atracciones en todo el flujo. Si algo no es apto, se explica la alternativa.',
    finding: 'Hallazgo 02',
    to: '/prototipo/fecha',
    art: 'height',
  },
  {
    n: '03',
    title: 'Un mapa con las esperas encima',
    text: 'Cada atracción muestra su espera con número y color, y hay una lista equivalente para quien prefiere leer o usa lector de pantalla.',
    finding: 'Hallazgo 03',
    to: '/prototipo/plan',
    art: 'map',
  },
  {
    n: '04',
    title: 'Un itinerario que se ordena solo',
    text: 'El plan calcula a qué hora llegas a cada atracción, respeta los horarios de shows y sugiere el orden con menos fila.',
    finding: 'Hallazgos 01 y 03',
    to: '/prototipo/itinerario',
    art: 'timeline',
  },
  {
    n: '05',
    title: 'Todo se revisa en una pantalla, sin cuenta',
    text: 'Fecha, entradas e itinerario en una sola revisión, con “Cambiar” en cada bloque y compra como invitado.',
    finding: 'Hallazgo 04',
    to: '/prototipo/revision',
    art: 'review',
  },
]

export const PROCESS = [
  { when: 'Oct 2024', title: 'Descubrir', text: 'Evaluación del flujo actual, entrevistas y línea base.' },
  { when: 'Nov 2024', title: 'Definir', text: 'Personas, hallazgos y nuevo mapa de flujos.' },
  { when: 'Dic – Ene', title: 'Prototipar', text: 'Wireframes y prototipo navegable en Figma.' },
  { when: 'Feb 2025', title: 'Probar', text: 'Dos rondas de pruebas de usabilidad e iteración.' },
  { when: 'Mar 2025', title: 'Entregar', text: 'Especificaciones, implementación y encuesta posterior.' },
]

// Pruebas de usabilidad: datos ilustrativos (8 participantes por ronda).
export const TASKS = [
  { task: 'Encontrar el día más barato del próximo fin de semana', before: [50, 160], after: [100, 45] },
  { task: 'Comprar 2 entradas de adulto y 1 de niño', before: [63, 250], after: [100, 110] },
  { task: 'Saber si un niño de 110 cm puede subir a una atracción', before: [38, 115], after: [88, 20] },
  { task: 'Encontrar la atracción cercana con menos espera', before: [25, 150], after: [88, 30] },
  { task: 'Armar un plan con cuatro atracciones', before: [13, 360], after: [75, 150] },
]

export const LEARNINGS = [
  { title: 'Ordenar es diseñar', text: 'Mover la fecha al principio resolvió más problemas que cualquier pantalla nueva.' },
  { title: 'Un dato, muchas pantallas', text: 'Pedir la altura una vez y usarla en todo el flujo evitó repetir preguntas.' },
  { title: 'Color y texto, siempre juntos', text: 'Las esperas se leen por número y por color, para que funcionen con daltonismo y lector de pantalla.' },
]
