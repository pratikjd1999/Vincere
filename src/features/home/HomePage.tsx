import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { faqs, processSteps } from './content'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import { useTheme } from '../../lib/theme-context'
import { useFocusMain, usePageMeta } from '../../lib/usePageMeta'
import { ThemeToggle } from '../../components/ThemeToggle'
import './home.css'

/**
 * Home page. A faceted V sits fixed behind the whole page and revolves with the
 * document scroll: no rotation at the top, just over one turn by the footer.
 * Falls back to a static SVG letterform when WebGL is unavailable.
 */
const HomeScene = lazy(() => import('./HomeScene'))

/** Sculpture surface and key-light colours per theme. */
const SCULPTURE = { light: '#cabfdb', dark: '#8b7f9e' } as const
const LIGHTS = {
  light: ['#f6e7de', '#cfd9e6'],
  dark: ['#c9b7c4', '#9fb0bd'],
} as const
const ACCENT = { light: '#d5cde0', dark: '#625a72' } as const

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
      <span aria-hidden className="home__spaced">
        {Array.from(text).map((character, index) => (
          <span key={`${character}-${index}`} data-letter>
            {character}
          </span>
        ))}
      </span>
    </>
  )
}

export function HomePage() {
  usePageMeta(
    `${company.wordmark} — ${company.primaryMessage}`,
    company.summary,
  )
  useFocusMain()

  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { resolved } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [enable3d] = useState(() => supportsWebGl() && !isConstrainedDevice())

  const sculptureColor = SCULPTURE[resolved]
  const sculptureLights = LIGHTS[resolved]
  // Accent arrives as a token, not as inline styling.
  const accentVars = { '--blush': ACCENT[resolved] } as CSSProperties

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
      node?.style.setProperty('--home-progress', value.toFixed(4))
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

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

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
    <div className="home" ref={root} data-page="home" style={accentVars}>
      {/* Fixed behind every section — the page is read against the turning V. */}
      <div className="home__sculpture" aria-hidden>
        {enable3d ? (
          <Suspense fallback={<div className="home__sculpture-static" />}>
            <HomeScene
              color={sculptureColor}
              lights={sculptureLights}
              progress={progress}
              rotateOnScroll={!reduced}
            />
          </Suspense>
        ) : (
          /* CSS fallback: the same letterform, turned by the --home-progress property. */
          <div className="home__sculpture-static">
            <svg viewBox="0 0 200 200" role="presentation">
              <path d="M22 26 L78 26 L100 158 L122 26 L178 26 L100 190 Z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="home__header">
        <a className="home__mark" href="#home">
          {company.wordmark}
        </a>

        <nav
          className="home__nav"
          id="home-nav"
          aria-label="Primary"
          data-open={menuOpen ? 'true' : 'false'}
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="home__actions">
          <ThemeToggle className="home__toggle" />
          <button
            type="button"
            className="home__toggle home__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="home-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="home__stage" id="home" aria-labelledby="home-hero">
          <h1 className="home__hero" id="home-hero">
            <Spaced text="MODERN" />
            <Spaced text="DIGITAL" />
            <Spaced text="SOLUTIONS" />
          </h1>

          <div className="home__stage-foot">
            <p className="home__lede" data-soft>
              {company.summary}
            </p>
            <div className="home__cta-row" data-soft>
              <a className="home__cta" href="#services">
                {company.capabilityCta}
              </a>
              <a className="home__cta home__cta--ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section className="home__section" id="about" aria-labelledby="home-about">
          <div className="home__section-head">
            <h2 id="home-about">About us</h2>
            <p>Who we are</p>
          </div>
          <div className="home__about">
            <div className="home__prose" data-card>
              <p>{company.summary}</p>
              <p>
                One accountable team carries a system through discovery, delivery and maintenance, so
                the people who design it remain the people who support it.
              </p>
            </div>
            <dl className="home__facts" data-card>
              <div>
                <dt>Based in</dt>
                <dd>{company.location}</dd>
              </div>
              <div>
                <dt>Works with</dt>
                <dd>Government and private-sector clients</dd>
              </div>
              <div>
                <dt>Service areas</dt>
                <dd>{String(services.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Sectors served</dt>
                <dd>{String(industries.length).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="home__section" id="services" aria-labelledby="home-services">
          <div className="home__section-head">
            <h2 id="home-services">Services</h2>
            <p>{String(services.length).padStart(2, '0')} service areas</p>
          </div>
          <ul className="home__cards">
            {services.map((service) => (
              <li key={service.id} data-card>
                <div className="home__card-meta">
                  <span>{service.index}</span>
                  <span>{service.category}</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="home__quiet" aria-label="Brand statement">
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="home__section" id="process" aria-labelledby="home-process">
          <div className="home__section-head">
            <h2 id="home-process">How we work</h2>
            <p>From first conversation to long-term support</p>
          </div>
          <ol className="home__steps">
            {processSteps.map((step) => (
              <li key={step.id} data-card>
                <span className="home__step-index">{step.index}</span>
                <h3>{step.name}</h3>
                <p>{step.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="home__section" id="industries" aria-labelledby="home-industries">
          <div className="home__section-head">
            <h2 id="home-industries">Industries</h2>
            <p>{String(industries.length).padStart(2, '0')} sectors served</p>
          </div>
          <ul className="home__cards home__cards--tight">
            {industries.map((industry) => (
              <li key={industry.id} data-card>
                <div className="home__card-meta">
                  <span>{industry.index}</span>
                </div>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="home__section" id="certifications" aria-labelledby="home-cert">
          <div className="home__section-head">
            <h2 id="home-cert">Certifications &amp; compliance</h2>
            <p>Details available on request</p>
          </div>
          <ul className="home__cards home__cards--tight">
            {complianceCards.map((card) => (
              <li key={card.id} data-card>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="home__section" id="faq" aria-labelledby="home-faq">
          <div className="home__section-head">
            <h2 id="home-faq">Frequently asked questions</h2>
          </div>
          <div className="home__faq">
            {faqs.map((item) => (
              <details key={item.id} data-card>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="home__section" id="contact" aria-labelledby="home-contact">
          <div className="home__section-head">
            <h2 id="home-contact">Contact us</h2>
            <p>We usually start with a conversation</p>
          </div>
          <div className="home__contact" data-card>
            <div className="home__contact-lead">
              <h3>Have a project in mind?</h3>
              <p>Tell us what you need and we will take it from there.</p>
              <a className="home__cta" href={`mailto:${contact.email}`}>
                Email us
              </a>
            </div>
            <div className="home__contact-col">
              <h4>Address</h4>
              <address>
                {contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="home__contact-col">
              <h4>Reach us</h4>
              <div className="home__contact-links">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </div>
              <ul className="home__social">
                {socialChannels.map((channel) => (
                  <li key={channel}>
                    {channel} <span>Coming soon</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="home__footer">
        <div className="home__footer-grid">
          <div className="home__footer-brand">
            <span className="home__mark">{company.wordmark}</span>
            <p>{company.primaryMessage}. {company.secondaryMessage}.</p>
          </div>

          <nav aria-label="Footer">
            <h2>Company</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          </div>
        </div>

        <div className="home__footer-base">
          <span>
            &copy; {new Date().getFullYear()} {company.legalName}
          </span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}
