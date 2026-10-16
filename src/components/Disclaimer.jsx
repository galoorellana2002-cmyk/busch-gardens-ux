// Aviso visible en todas las páginas: es un proyecto de portafolio, no el sitio del parque.
export default function Disclaimer({ compact = false }) {
  return (
    <div className={compact ? 'disclaimer compact' : 'disclaimer'} role="note">
      <strong>Proyecto de portafolio</strong>
      <span aria-hidden="true"> · </span>
      <span>Concepto no oficial, sin afiliación con Busch Gardens ni SeaWorld Parks &amp; Entertainment.</span>
    </div>
  )
}
