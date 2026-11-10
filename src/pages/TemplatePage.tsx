import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getTemplate, templateComponents, templates } from '../templates/registry'
import { ThemeToggle } from '../components/ThemeToggle'
import { NotFoundPage } from './NotFoundPage'
import { usePageMeta, useFocusMain } from '../lib/usePageMeta'
import { company } from '../content/company'
import './gallery.css'

function TemplateFallback() {
  return (
    <div className="tpl-loading" role="status">
      <div className="tpl-loading__bar">
        <span />
      </div>
      Loading direction
    </div>
  )
}

export function TemplatePage() {
  const { templateId } = useParams<{ templateId: string }>()
  const meta = getTemplate(templateId)
  const index = templates.findIndex((entry) => entry.id === templateId)
  const next = index >= 0 ? templates[(index + 1) % templates.length] : undefined

  usePageMeta(
    meta ? `${meta.name} — ${company.wordmark}` : `Direction not found — ${company.wordmark}`,
    meta ? meta.thesis : 'The requested homepage direction could not be found.',
  )
  useFocusMain()

  if (!meta || !templateId) return <NotFoundPage />

  const Direction = templateComponents[templateId]

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Suspense fallback={<TemplateFallback />}>
        <Direction />
      </Suspense>

      <nav className="tplbar" aria-label="Prototype gallery navigation">
        <div className="tplbar__inner">
          <span className="tplbar__label">
            <span className="tplbar__num">{meta.number}</span>
            {meta.name}
          </span>
          <Link className="tplbar__btn" to="/templates">
            <ArrowLeft size={15} aria-hidden />
            Gallery
          </Link>
          {next ? (
            <Link className="tplbar__btn" to={`/templates/${next.id}`}>
              Next
            </Link>
          ) : null}
          <ThemeToggle className="tplbar__btn tplbar__btn--icon" />
        </div>
      </nav>
    </>
  )
}
