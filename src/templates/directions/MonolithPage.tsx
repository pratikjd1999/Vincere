import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import { useTheme } from '../../lib/theme-context'
import type { VariantConfig } from './monolith-variants'
import './pastel-monolith.css'

/**
 * Shared page for the scroll-driven V directions (23–27).
 *
 * A sculptural V sits fixed behind the whole page and revolves as the document
 * scrolls: no rotation at the top, just over one turn by the footer. The V is the
 * page's background rather than a hero object, so every section is read against it.
 *
 * Referenced from the immersive-studio pattern (a sculptural mark revolving through a
 * scroll) but rebuilt in a muted pastel palette, with a V in place of the reference's
 * animal mark.
 *
 * The reference site is a studio portfolio; the capability cards here carry a service
 * category rather than a client or year, because no project has been approved.
 *
 * Each route supplies a different `VariantConfig`, changing how the V is built and
 * which pastel leads — the layout and content stay identical so the sculpture is the
 * only variable under comparison.
 */
const MonolithScene = lazy(() => import('./MonolithScene'))

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

/** Splits a word into letters so the hero can be tracked out dramatically. */
function Spaced({ text }: { text: string }) {
  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden className="pm__spaced">
        {Array.from(text).map((character, index) => (
          <span key={`${character}-${index}`} data-letter>
            {character}
          </span>
        ))}
      </span>
    </>
  )
}

export function MonolithPage({ config }: { config: VariantConfig }) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { resolved } = useTheme()
  const [enable3d] = useState(() => supportsWebGl() && !isConstrainedDevice())

  const sculptureColor = config.sculpture[resolved]
  const sculptureLights = config.lights[resolved]
  // Accent arrives as a token, not as inline styling.
  const accentVars = { '--blush': config.accent[resolved] } as CSSProperties

  /**
   * Document scroll progress, 0 at the top and 1 at the bottom. Held in a ref and
   * read inside the render loop, so scrolling never re-renders React. The same value
   * drives a CSS custom property for the no-WebGL fallback.
   */
  const progress = useRef(0)

  useEffect(() => {
    if (reduced) return
    const node = root.current
    let frame = 0

    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      progress.current = value
      node?.style.setProperty('--pm-progress', value.toFixed(4))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduced])

  useGsap(root, () => {
    gsap.from('[data-letter]', {
      opacity: 0,
      y: 22,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.026,
    })
    gsap.from('[data-soft]', {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: 'power2.out',
      delay: 0.3,
      stagger: 0.1,
    })
    gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 90%' },
      })
    })
  })

  return (
    <div className="pm" ref={root} data-tpl="pastel-monolith" style={accentVars}>
      {/* Fixed behind every section — the page is read against the turning V. */}
      <div className="pm__sculpture" aria-hidden>
        {enable3d ? (
          <Suspense fallback={<div className="pm__sculpture-static" />}>
            <MonolithScene
              color={sculptureColor}
              lights={sculptureLights}
              progress={progress}
              rotateOnScroll={!reduced}
              variant={config.variant}
            />
          </Suspense>
        ) : (
          /* CSS fallback: the same letterform, turned by the --pm-progress property. */
          <div className="pm__sculpture-static">
            <svg viewBox="0 0 200 200" role="presentation">
              <path d="M22 26 L78 26 L100 158 L122 26 L178 26 L100 190 Z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      <header className="pm__header">
        <span className="pm__mark">{company.wordmark}</span>
        <nav className="pm__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="pm__loc">
          {company.location} — {config.treatment}
        </span>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="pm__stage" aria-labelledby="pm-hero">
          <h1 className="pm__hero" id="pm-hero">
            <Spaced text="MODERN" />
            <Spaced text="DIGITAL" />
            <Spaced text="SOLUTIONS" />
          </h1>

          <div className="pm__stage-foot">
            <p className="pm__lede" data-soft>
              {company.summary}
            </p>
            <a className="pm__cta" href="#services" data-soft>
              {company.capabilityCta}
            </a>
          </div>
        </section>

        <section className="pm__section" id="services" aria-labelledby="pm-services">
          <div className="pm__section-head">
            <h2 id="pm-services">Capabilities</h2>
            <p>{String(services.length).padStart(2, '0')} service areas</p>
          </div>
          <ul className="pm__cards">
            {services.map((service) => (
              <li key={service.id} data-card>
                <div className="pm__card-meta">
                  <span>{service.index}</span>
                  <span>{service.category}</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pm__quiet" aria-label="Brand statement">
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="pm__section" id="about" aria-labelledby="pm-about">
          <div className="pm__section-head">
            <h2 id="pm-about">The studio</h2>
          </div>
          <div className="pm__prose" data-card>
            <p>{company.summary}</p>
            <p>
              One accountable team carries a system through discovery, delivery and maintenance, so
              the people who design it remain the people who support it.
            </p>
          </div>
        </section>

        <section className="pm__section" id="industries" aria-labelledby="pm-industries">
          <div className="pm__section-head">
            <h2 id="pm-industries">Sectors</h2>
            <p>{String(industries.length).padStart(2, '0')} served</p>
          </div>
          <ul className="pm__cards pm__cards--tight">
            {industries.map((industry) => (
              <li key={industry.id} data-card>
                <div className="pm__card-meta">
                  <span>{industry.index}</span>
                </div>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pm__section" id="certifications" aria-labelledby="pm-cert">
          <div className="pm__section-head">
            <h2 id="pm-cert">Compliance</h2>
          </div>
          <ul className="pm__cards pm__cards--tight">
            {complianceCards.map((card) => (
              <li key={card.id} data-card>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pm__section" id="contact" aria-labelledby="pm-contact">
          <div className="pm__section-head">
            <h2 id="pm-contact">Contact</h2>
          </div>
          <div className="pm__contact" data-card>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="pm__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="pm__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="pm__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
