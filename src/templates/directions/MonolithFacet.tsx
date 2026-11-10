import { MonolithPage } from './MonolithPage'
import { monolithVariants } from './monolith-variants'

/** Direction 26 — scroll-driven V, faceted crystal. */
export default function MonolithFacet() {
  return <MonolithPage config={monolithVariants.facet} />
}
