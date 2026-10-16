import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Estado del prototipo. Se guarda en localStorage solo como comodidad (si falla, todo sigue funcionando).
// Nunca se guardan datos personales ni de pago: el prototipo no los pide.
const KEY = 'horizonte-proto-v1'

export const INITIAL = {
  date: null,
  adults: 2,
  kids: 0,
  infants: 0,
  minHeight: null,
  plan: [],
  start: 600,
  confirmedAt: null,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL
  } catch {
    return INITIAL
  }
}

const Ctx = createContext(null)

export function ProtoProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [state])

  const api = useMemo(
    () => ({
      state,
      set: (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
      toggle: (id) =>
        setState((s) => ({ ...s, plan: s.plan.includes(id) ? s.plan.filter((x) => x !== id) : [...s.plan, id] })),
      reset: () => setState(INITIAL),
    }),
    [state],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export const useProto = () => useContext(Ctx)
