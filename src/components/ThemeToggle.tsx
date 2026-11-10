import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/theme-context'

/**
 * Accessible light/dark switch. The pressed state is exposed to assistive tech and
 * the choice is persisted by the ThemeProvider.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, toggle } = useTheme()
  const nextLabel = resolved === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={nextLabel}
      title={nextLabel}
      aria-pressed={resolved === 'dark'}
    >
      {resolved === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
      <span className="visually-hidden">{nextLabel}</span>
    </button>
  )
}
