import { MonolithPage } from './MonolithPage'
import { monolithVariants } from './monolith-variants'

/** Direction 25 — scroll-driven V, stacked strata. */
export default function MonolithStrata() {
  return <MonolithPage config={monolithVariants.strata} />
}
