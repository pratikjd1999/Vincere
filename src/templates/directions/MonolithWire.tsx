import { MonolithPage } from './MonolithPage'
import { monolithVariants } from './monolith-variants'

/** Direction 24 — scroll-driven V, edge wireframe. */
export default function MonolithWire() {
  return <MonolithPage config={monolithVariants.wire} />
}
