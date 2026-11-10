import { MonolithPage } from './MonolithPage'
import { monolithVariants } from './monolith-variants'

/** Direction 23 — scroll-driven V, solid extrusion. */
export default function PastelMonolith() {
  return <MonolithPage config={monolithVariants.solid} />
}
