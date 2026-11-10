import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { useReducedMotion } from '../../lib/motion'
import './studio-index.css'

/**
 * Direction 22 — Studio Index.
 * An immersive studio-index treatment: a live shader field fills the viewport and
 * responds as you move through the capability list, with a trailing cursor and
 * oversized type.
 *
 * Adapted deliberately from the studio-portfolio pattern: a real studio index lists
 * completed projects, and no project, client or result has been approved for this
 * site, so the index lists capability areas instead. Nothing here implies delivered work.
 */
const StudioField = lazy(() => import('./StudioField'))

/** Colour pair per capability row, driving the shader as focus moves. */
const FIELD_COLORS: readonly (readonly [string, string])[] = [
  ['#12060a', '#ff3d00'],
  ['#050b16', '#00a3ff'],
  ['#0a0616', '#8b5cf6'],
  ['#0a1005', '#84cc16'],
  ['#160611', '#ec4899'],
  ['#04121a', '#06b6d4'],
  ['#160f04', '#f59e0b'],
  ['#0d0505', '#ef4444'],
  ['#050f0c', '#10b981'],
]

const IDLE_COLORS: readonly [string, string] = ['#050507', '#2a2a33']

function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isConstrainedDevice(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4
  return window.matchMedia('(pointer: coarse)').matches && cores <= 4
}

/** Dot that eases toward the pointer. Skipped entirely on touch or reduced motion. */
function CursorTrail() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = dot.current
    if (!node) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const position = { ...target }
    let frame = 0

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    const tick = () => {
      position.x += (target.x - position.x) * 0.14
      position.y += (target.y - position.y) * 0.14
      node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="si__cursor" ref={dot} aria-hidden />
}

export default function StudioIndex() {
  const reduced = useReducedMotion()
  const [enable3d] = useState(() => supportsWebGl() && !isConstrainedDevice())
  const [pointerFine] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const [focused, setFocused] = useState<number | null>(null)

  const colors = focused === null ? IDLE_COLORS : (FIELD_COLORS[focused] ?? IDLE_COLORS)

  // Focus and hover drive the same state, so keyboard users get the same field response.
  const activate = useCallback((index: number) => () => setFocused(index), [])
  const clear = useCallback(() => setFocused(null), [])

  return (
    <div className="si" data-tpl="studio-index" data-focused={focused !== null}>
      <div className="si__field" aria-hidden>
        {enable3d ? (
          <Suspense fallback={<div className="si__field-fallback" />}>
            <StudioField colors={colors} active={focused === null ? 0 : 1} animate={!reduced} />
          </Suspense>
        ) : (
          /* Complete CSS composition for devices that skip WebGL. */
          <div className="si__field-fallback" />
        )}
      </div>

      {pointerFine && !reduced ? <CursorTrail /> : null}

      <header className="si__header">
        <span className="si__mark">{company.wordmark}</span>
        <nav className="si__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="si__loc">{company.location}</span>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="si__intro" aria-labelledby="si-hero">
          <h1 id="si-hero">
            <span>Modern</span>
            <span className="si__outline">digital</span>
            <span>solutions</span>
          </h1>
          <p className="si__lede">{company.summary}</p>
          <a className="si__cta" href="#services">
            <span>{company.capabilityCta}</span>
          </a>
        </section>

        <section className="si__index-wrap" id="services" aria-labelledby="si-index">
          <div className="si__index-head">
            <h2 id="si-index">Capability index</h2>
            <p>
              {String(services.length).padStart(2, '0')} areas — hover or focus a row to read the
              field
            </p>
          </div>

          <ol className="si__index" onMouseLeave={clear}>
            {services.map((service, index) => (
              /* id makes each capability row individually addressable, so the
                 anchor below resolves instead of dangling. */
              <li
                key={service.id}
                id={service.id}
                className={focused === index ? 'is-focused' : undefined}
              >
                <a
                  href={`#${service.id}`}
                  onMouseEnter={activate(index)}
                  onFocus={activate(index)}
                  onBlur={clear}
                  aria-describedby={`si-desc-${service.id}`}
                >
                  <span className="si__index-num">{service.index}</span>
                  <span className="si__index-name">{service.name}</span>
                  <span className="si__index-meta" id={`si-desc-${service.id}`}>
                    {service.summary}
                  </span>
                  <span className="si__index-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="si__panel" id="about" aria-labelledby="si-about">
          <h2 id="si-about">Studio</h2>
          <div className="si__panel-body">
            <p className="si__big">{company.secondaryMessage}</p>
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance, so the people who
              design a system remain the people who keep it running.
            </p>
          </div>
        </section>

        <section className="si__panel" id="industries" aria-labelledby="si-industries">
          <h2 id="si-industries">Sectors</h2>
          <ul className="si__tiles">
            {industries.map((industry) => (
              <li key={industry.id}>
                <span className="si__index-num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="si__panel" id="certifications" aria-labelledby="si-cert">
          <h2 id="si-cert">Compliance</h2>
          <ul className="si__tiles si__tiles--tight">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="si__panel" id="contact" aria-labelledby="si-contact">
          <h2 id="si-contact">Contact</h2>
          <div className="si__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="si__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="si__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="si__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
