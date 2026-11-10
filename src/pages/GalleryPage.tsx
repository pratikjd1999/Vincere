import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { templates } from '../templates/registry'
import type { TemplateMeta } from '../templates/registry'
import { ThemeToggle } from '../components/ThemeToggle'
import { usePageMeta } from '../lib/usePageMeta'
import { company } from '../content/company'
import './gallery.css'

/** Swatches are data, so they arrive as CSS custom properties rather than styles. */
function swatchVars(meta: TemplateMeta): CSSProperties {
  return {
    '--c1': meta.swatches[0],
    '--c2': meta.swatches[1],
    '--c3': meta.swatches[2],
  } as CSSProperties
}

const toneLabel: Record<TemplateMeta['tone'], string> = {
  light: 'Light only',
  dark: 'Dark first',
  dual: 'Light + dark',
}

export function GalleryPage() {
  usePageMeta(
    `Homepage directions — ${company.wordmark}`,
    'Twenty homepage design directions explored for the Vincere Corp public website.',
  )

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="gallery">
        <header className="gallery__bar">
          <span className="gallery__wordmark">{company.wordmark}</span>
          <div className="gallery__bar-actions">
            <ThemeToggle className="gallery__toggle" />
          </div>
        </header>

        <main id="main" tabIndex={-1}>
          <div className="gallery__intro">
            <p className="gallery__eyebrow">Prototype phase — direction gallery</p>
            <h1 className="gallery__title">Twenty homepage directions</h1>
            <p className="gallery__lede">
              Each direction is a complete, interactive homepage built on a different layout
              archetype, type system, palette and motion technique. The selected direction becomes
              the foundation for the six-page public website.
            </p>
            <p className="gallery__note">
              All twenty use the same approved content so the comparison is about design, not copy.
              No project, client, metric or certificate is represented anywhere in this prototype.
            </p>
          </div>

          <ul className="gallery__grid">
            {templates.map((meta) => (
              <li key={meta.id} className="card" style={swatchVars(meta)}>
                <div className="card__preview" aria-hidden>
                  <span className="card__preview-number">{meta.number}</span>
                </div>
                <div className="card__body">
                  <h2 className="card__name">
                    <Link className="card__link" to={`/templates/${meta.id}`}>
                      {meta.name}
                    </Link>
                  </h2>
                  <p className="card__thesis">{meta.thesis}</p>
                  <dl className="card__specs">
                    <div className="card__spec">
                      <dt>Basis</dt>
                      <dd>{meta.basis}</dd>
                    </div>
                    <div className="card__spec">
                      <dt>Layout</dt>
                      <dd>{meta.layout}</dd>
                    </div>
                    <div className="card__spec">
                      <dt>Motion</dt>
                      <dd>{meta.motion}</dd>
                    </div>
                    <div className="card__spec">
                      <dt>Type</dt>
                      <dd>
                        {meta.headingFont}
                        {meta.headingFont === meta.bodyFont ? '' : ` + ${meta.bodyFont}`}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="card__footer">
                  <span className="card__tone">
                    {toneLabel[meta.tone]}
                    {meta.uses3d ? ' · WebGL' : ''}
                  </span>
                  <span className="card__open">
                    Open <ArrowRight size={15} aria-hidden />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </main>

        <footer className="gallery__footer">
          <p>
            {company.legalName} — {company.location}. Prototype gallery for internal direction
            selection.
          </p>
        </footer>
      </div>
    </>
  )
}
