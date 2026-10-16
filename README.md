# Busch Gardens · Mejoras UX/UI

Caso de estudio y prototipo interactivo del proyecto de UX/UI que hice para una empresa en Estados Unidos (Busch Gardens) entre 10/2024 y 03/2025: rediseño de flujos de usuario, prototipado en Figma y pruebas de usabilidad, con un **aumento del 25 % en satisfacción de usuario** según encuestas post‑implementación.

> **Proyecto de portafolio.** Concepto no oficial, sin afiliación con Busch Gardens ni SeaWorld Parks & Entertainment. No usa logotipos, fotos ni recursos de la marca. El parque del prototipo ("Parque Horizonte"), sus atracciones, ilustraciones, precios y tiempos de espera son inventados.

## Qué hay en el sitio

### 1. Caso de estudio (`/`)
Página al estilo de las páginas de producto de Apple:

- **Problema**: por qué comprar era fácil pero planificar el día no.
- **Investigación**: métodos, hallazgos y tres personas.
- **Flujos antes y después**: diagramas en HTML y SVG (de 9 pasos con fricción a 5 conectados).
- **Decisiones de diseño**: cada una enlazada al hallazgo que resuelve y a su pantalla en el prototipo.
- **Pruebas de usabilidad**: cinco tareas con tasa de éxito y tiempo medio, antes y después.
- **Resultados**: el +25 % de satisfacción como cifra principal.

**Sobre las cifras.** Solo son reales los datos del CV: cliente, país, periodo, alcance (flujos, Figma, pruebas de usabilidad) y el +25 % en satisfacción. Todo lo demás (hallazgos, personas, citas, pasos, tasas de éxito, tiempos) es una reconstrucción ilustrativa, y en pantalla lleva la etiqueta **Ilustrativo**. Los datos reales llevan la etiqueta **Dato real**.

### 2. Prototipo interactivo (`/prototipo`)
El flujo rediseñado más representativo, reconstruido en código y pensado primero para el celular:

1. **Fecha y visitantes**: calendario con precio y afluencia de cada día, entradas por edad y altura del niño más bajo.
2. **Mapa y atracciones**: mapa ilustrado con tiempos de espera "en vivo" (simulados, se actualizan cada 15 s), filtros por tipo y por altura, lista equivalente y hoja de detalle.
3. **Tu día**: itinerario con hora de llegada a cada atracción, horarios de shows, avisos y botón para ordenarlo con menos espera.
4. **Revisión y compra**: todo en una pantalla, compra como invitado.
5. **Confirmación**: entrada de demostración (marcada "DEMO · no válida") y descarga del itinerario en `.ics`.

**La compra es una simulación.** No se piden ni se guardan datos de pago ni datos personales. El estado del prototipo se guarda solo en el `localStorage` del navegador, por comodidad.

En computadora el prototipo se muestra dentro de un teléfono, con una explicación al lado. En el celular ocupa toda la pantalla.

## Accesibilidad

- Contraste AA en textos y estados; foco visible en todos los controles.
- Objetivos táctiles de 44 px o más.
- Las esperas se muestran con número **y** color, nunca solo color.
- El mapa tiene una lista equivalente; los marcadores son botones con etiqueta.
- La hoja de detalle es un diálogo modal: atrapa el foco, se cierra con Escape y devuelve el foco.
- Al cambiar de pantalla, el foco va al título.
- Sin animaciones si el sistema pide reducir movimiento (`prefers-reduced-motion`).

## Stack

- React 19 + Vite 8 + React Router 7.
- CSS propio (sin librerías de UI), tipografía del sistema, azul `#0071e3` y el degradado verde → azul (`#30d158 → #0a84ff`) del portafolio.
- Ilustraciones propias en SVG.
- Sin backend, sin APIs, sin claves y sin servicios de pago.

## Correr en local

Requiere Node.js 24.

```bash
npm install
npm run dev
```

Abre http://localhost:5178.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Despliegue en Vercel (plan Hobby, gratis)

1. En Vercel: **Add New… → Project** e importa este repositorio.
2. Vercel detecta Vite solo. No hace falta ninguna variable de entorno.
3. `vercel.json` redirige todas las rutas a `index.html` para que `/prototipo` funcione al recargar.

## Estructura

```
src/
  case/          Caso de estudio: contenido (content.js), página e ilustraciones
  proto/         Prototipo: datos de ejemplo, lógica (esperas, itinerario), estado y pantallas
  components/    Aviso de portafolio, etiquetas "Dato real" / "Ilustrativo", animación al hacer scroll
  styles/        base.css (tokens), case.css, proto.css
```

---

Diseño y desarrollo: [Alejandro Orellana](https://alejandoroorellana.dev)
