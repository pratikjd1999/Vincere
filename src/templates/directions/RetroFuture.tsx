import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import './retro-future.css'

/**
 * Direction 19 — Horizon Grid.
 * Basis: Retro-Futurism. A neon perspective horizon with CRT texture. The grid
 * travel and scanlines are decoration only and stop entirely under reduced motion.
 */
export default function RetroFuture() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGsap(root, () => {
    gsap.from('[data-neon]', { opacity: 0, y: 26, duration: 0.75, ease: 'power3.out', stagger: 0.09 })
    gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        x: -20,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 90%' },
      })
    })
  })

  return (
    <div className="rf" ref={root} data-tpl="retro-future">
      <div className={`rf__horizon${reduced ? ' rf__horizon--still' : ''}`} aria-hidden>
        <div className="rf__sun" />
        <div className="rf__grid" />
      </div>
      <div className="rf__crt" aria-hidden />

      <header className="rf__header">
        <span className="rf__mark">{company.wordmark}</span>
        <nav className="rf__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="rf__main">
        <section className="rf__hero" aria-labelledby="rf-hero">
          <p className="rf__kicker" data-neon>
            {company.location}
          </p>
          <h1 className="rf__title" id="rf-hero" data-neon>
            {company.primaryMessage}
          </h1>
          <p className="rf__lede" data-neon>
            {company.summary}
          </p>
          <a className="rf__cta" href="#services" data-neon>
            {company.capabilityCta}
            <ChevronRight size={18} aria-hidden />
          </a>
          <p className="rf__sub" data-neon>
            {company.secondaryMessage}
          </p>
        </section>

        <section className="rf__section" id="services" aria-labelledby="rf-services">
          <h2 className="rf__h2" id="rf-services">
            Services
          </h2>
          <ol className="rf__rows">
            {services.map((service) => (
              <li key={service.id} data-row>
                <span className="rf__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rf__section" id="about" aria-labelledby="rf-about">
          <h2 className="rf__h2" id="rf-about">
            Who we are
          </h2>
          <div className="rf__panel" data-row>
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance rather than passing a
              system between vendors.
            </p>
          </div>
        </section>

        <section className="rf__section" id="industries" aria-labelledby="rf-industries">
          <h2 className="rf__h2" id="rf-industries">
            Industries
          </h2>
          <ul className="rf__cards">
            {industries.map((industry) => (
              <li key={industry.id} data-row>
                <span className="rf__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf__section" id="certifications" aria-labelledby="rf-cert">
          <h2 className="rf__h2" id="rf-cert">
            Compliance
          </h2>
          <ul className="rf__cards">
            {complianceCards.map((card) => (
              <li key={card.id} data-row>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rf__section" id="contact" aria-labelledby="rf-contact">
          <h2 className="rf__h2" id="rf-contact">
            Contact
          </h2>
          <div className="rf__contact" data-row>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="rf__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="rf__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="rf__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
