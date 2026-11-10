import type { MonolithVariant } from './MonolithScene'

/**
 * Per-variant configuration for the scroll-driven V directions.
 *
 * Each variant changes the sculpture's construction and its pastel accent, so the
 * five routes read as genuinely different pages rather than a recoloured one.
 * All accents stay low-chroma and are used for surfaces and accents only — never
 * for text — so the measured AA contrast of the base palette is preserved.
 */
export type VariantConfig = {
  readonly variant: MonolithVariant
  /** Short description of the sculptural treatment, shown in the page header. */
  readonly treatment: string
  /** Accent pastel, overriding --blush. */
  readonly accent: { readonly light: string; readonly dark: string }
  /** Sculpture surface colour. */
  readonly sculpture: { readonly light: string; readonly dark: string }
  readonly lights: {
    readonly light: readonly [string, string]
    readonly dark: readonly [string, string]
  }
}

const WARM_LIGHTS = { light: ['#f6e7de', '#cfd9e6'], dark: ['#c9b7c4', '#9fb0bd'] } as const
const COOL_LIGHTS = { light: ['#eaf0f6', '#e3ddef'], dark: ['#b3c1cf', '#a9a0bd'] } as const

export const monolithVariants: Readonly<Record<string, VariantConfig>> = {
  solid: {
    variant: 'solid',
    treatment: 'Solid extrusion',
    accent: { light: '#e8c8c4', dark: '#6f5a58' },
    sculpture: { light: '#e3cfc9', dark: '#8d8296' },
    lights: WARM_LIGHTS,
  },
  wire: {
    variant: 'wire',
    treatment: 'Edge wireframe',
    accent: { light: '#c3d3c0', dark: '#5b6a58' },
    sculpture: { light: '#8fa48c', dark: '#b9cdb6' },
    lights: COOL_LIGHTS,
  },
  strata: {
    variant: 'strata',
    treatment: 'Stacked strata',
    accent: { light: '#c8d5e0', dark: '#566372' },
    sculpture: { light: '#bcccdc', dark: '#7d8a9c' },
    lights: COOL_LIGHTS,
  },
  facet: {
    variant: 'facet',
    treatment: 'Faceted crystal',
    accent: { light: '#d5cde0', dark: '#625a72' },
    sculpture: { light: '#cabfdb', dark: '#8b7f9e' },
    lights: WARM_LIGHTS,
  },
  points: {
    variant: 'points',
    treatment: 'Vertex cloud',
    accent: { light: '#e7dcc9', dark: '#6d6252' },
    sculpture: { light: '#9c8f78', dark: '#ddcdb2' },
    lights: WARM_LIGHTS,
  },
}
