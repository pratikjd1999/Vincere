import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let reducedQuery: MediaQueryList | null = null

function reducedMotionQuery(): MediaQueryList {
  reducedQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)')
  return reducedQuery
}

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = reducedMotionQuery()
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/**
 * Tracks `prefers-reduced-motion` as an external store, so no render-phase state
 * update is needed. Every animated surface reads this and renders a complete static
 * composition when motion is not wanted.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => reducedMotionQuery().matches,
    () => false,
  )
}

/**
 * Runs a GSAP setup function inside a scoped context that is reverted on unmount.
 * When reduced motion is requested the callback never runs, so elements keep their
 * natural (fully visible) CSS state.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (context: gsap.Context) => void,
  enabled = true,
): void {
  const setupRef = useRef(setup)
  const reduced = useReducedMotion()

  // Keep the latest callback without touching the ref during render.
  useLayoutEffect(() => {
    setupRef.current = setup
  })

  useLayoutEffect(() => {
    if (reduced || !enabled || !scope.current) return
    const context = gsap.context((self) => setupRef.current(self), scope.current)
    // Pinned/scrubbed triggers measure before webfonts settle; refresh once they do.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => context.revert()
  }, [scope, reduced, enabled])
}

/** True once the element has entered the viewport — drives CSS-only reveal states. */
export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '-10% 0px'): boolean {
  const [entered, setEntered] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin, reduced])

  // With reduced motion the content is treated as immediately present.
  return reduced || entered
}

/** Pointer-driven parallax offset written straight to CSS custom properties. */
export function usePointerParallax(ref: RefObject<HTMLElement | null>): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced || window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const rect = node.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        node.style.setProperty('--px', x.toFixed(4))
        node.style.setProperty('--py', y.toFixed(4))
      })
    }
    const onLeave = () => {
      node.style.setProperty('--px', '0')
      node.style.setProperty('--py', '0')
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ref, reduced])
}

/** Counts up to `value` once active. Returns the final value directly if reduced. */
export function useCountUp(value: number, active: boolean, durationMs = 1200): number {
  const [progressValue, setProgressValue] = useState(0)
  const reduced = useReducedMotion()
  const animate = active && !reduced

  useEffect(() => {
    if (!animate) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setProgressValue(Math.round(value * eased))
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [value, animate, durationMs])

  if (reduced) return active ? value : 0
  return progressValue
}

/**
 * Reveals `text` one character at a time. Derived rather than stored when disabled,
 * so nothing is written to state during an effect on the static path.
 */
export function useTypedText(text: string, enabled: boolean, msPerChar = 30): string {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const target = Math.min(Math.floor((now - start) / msPerChar), text.length)
      setCount(target)
      if (target < text.length) frame = window.requestAnimationFrame(step)
    }
    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [text, enabled, msPerChar])

  if (!enabled) return text
  return text.slice(0, count)
}

export { gsap, ScrollTrigger }
