// Marcan de dónde sale cada cifra: del CV (real) o inventada para explicar el caso (ilustrativa).
export function Real({ children = 'Dato real' }) {
  return <span className="badge real">{children}</span>
}

export function Ilustrativo({ children = 'Ilustrativo' }) {
  return <span className="badge ilus">{children}</span>
}
