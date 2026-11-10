import { useEffect } from 'react'

/** Sets the document title and meta description for a route. */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (tag) tag.content = description
  }, [title, description])
}

/** Moves focus to the main region after a route change, for screen reader users. */
export function useFocusMain(): void {
  useEffect(() => {
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [])
}
