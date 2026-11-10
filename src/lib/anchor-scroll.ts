import { useEffect } from 'react'
import { useReducedMotion } from './motion'

/**
 * Keeps in-page anchors working under HashRouter.
 *
 * The app is served from GitHub Pages, which has no SPA rewrite, so routing uses the
 * URL hash (`#/templates/swiss-grid`). Every direction also uses ordinary in-page
 * anchors for its section nav (`#services`, `#contact`) and its skip link (`#main`).
 * Left alone, HashRouter would read those as route changes and render the 404 page.
 *
 * This single document-level delegate intercepts them instead: anchors beginning
 * `#/` belong to the router and are ignored; any other `#…` anchor is treated as an
 * in-page jump — scrolled to, and focused so keyboard and screen reader users follow
 * the move. One listener, so no template markup had to change.
 */
export function useAnchorScroll(): void {
  const reduced = useReducedMotion()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Respect modified clicks (open in new tab, etc.) and anything already handled.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      // '#/...' is a router destination; '#' alone is a placeholder.
      if (!href || !href.startsWith('#') || href.startsWith('#/') || href === '#') return

      // Always prevent the default: an unhandled '#id' would corrupt the route.
      event.preventDefault()

      const target = document.getElementById(decodeURIComponent(href.slice(1)))
      if (!target) return

      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

      // Section headings are not focusable by default; make the jump land for AT users.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduced])
}
