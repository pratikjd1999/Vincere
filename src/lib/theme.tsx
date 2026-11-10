import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { THEME_STORAGE_KEY, ThemeContext } from './theme-context'
import type { ResolvedTheme, ThemeChoice } from './theme-context'

let colorSchemeQuery: MediaQueryList | null = null

function darkSchemeQuery(): MediaQueryList {
  colorSchemeQuery ??= window.matchMedia('(prefers-color-scheme: dark)')
  return colorSchemeQuery
}

function subscribeScheme(onChange: () => void): () => void {
  const query = darkSchemeQuery()
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function readStoredChoice(): ThemeChoice {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(readStoredChoice)

  const systemResolved = useSyncExternalStore<ResolvedTheme>(
    subscribeScheme,
    () => (darkSchemeQuery().matches ? 'dark' : 'light'),
    () => 'light',
  )

  const resolved: ResolvedTheme = choice === 'system' ? systemResolved : choice

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolved
    root.style.colorScheme = resolved
  }, [resolved])

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next)
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
  }, [])

  const toggle = useCallback(() => {
    setChoiceState((current) => {
      const base: ResolvedTheme =
        current === 'system' ? (darkSchemeQuery().matches ? 'dark' : 'light') : current
      const next: ThemeChoice = base === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ choice, resolved, setChoice, toggle }),
    [choice, resolved, setChoice, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
