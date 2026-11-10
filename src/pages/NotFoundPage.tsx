import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { company } from '../content/company'
import './gallery.css'

export function NotFoundPage() {
  usePageMeta(
    `Page not found — ${company.wordmark}`,
    'The requested page could not be found on the Vincere Corp website.',
  )

  return (
    <main id="main" tabIndex={-1} className="notfound">
      <div className="notfound__inner">
        <p className="notfound__eyebrow">Error 404</p>
        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__body">
          That address does not match a homepage direction in this prototype gallery.
        </p>
        <Link className="notfound__link" to="/">
          Return to the direction gallery
        </Link>
      </div>
    </main>
  )
}
