import { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import './hud-console.css'

/**
 * Direction 04 — Operations HUD.
 * Basis: HUD / Sci-Fi FUI. Bracketed panels, telemetry rails, scanning sweep.
 * Dark-first; the light theme renders a daylight instrumentation variant.
 */
export default function HudConsole() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGsap(root, () => {
    gsap.from('[data-panel]', {
      opacity: 0,
      x: -18,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.05,
      scrollTrigger: { trigger: '[data-modules]', start: 'top 85%' },
    })
    gsap.from('[data-boot]', { opacity: 0, y: 14, duration: 0.6, ease: 'power2.out', stagger: 0.08 })
  })

  return (
    <div className="hud" ref={root} data-tpl="hud-console">
      <div className="hud__grid-overlay" aria-hidden />
      {reduced ? null : <div className="hud__scan" aria-hidden />}

      <header className="hud__header">
        <div className="hud__brand">
          <span className="hud__bracket">[</span>
          <span className="hud__mark">{company.wordmark}</span>
          <span className="hud__bracket">]</span>
        </div>
        <nav className="hud__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>
                  <ChevronRight size={12} aria-hidden />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="hud__status">
          <span className="hud__dot" aria-hidden />
          SYS / {company.location.toUpperCase()}
        </p>
      </header>

      <main id="main" tabIndex={-1} className="hud__main">
        <section className="hud__hero" aria-labelledby="hud-hero">
          <div className="hud__rail" aria-hidden>
            {Array.from({ length: 22 }, (_, i) => (
              <span key={i} className={i % 4 === 0 ? 'hud__tick hud__tick--major' : 'hud__tick'} />
            ))}
          </div>
          <div className="hud__hero-body">
            <p className="hud__label" data-boot>
              // MISSION BRIEF
            </p>
            <h1 className="hud__title" id="hud-hero" data-boot>
              {company.primaryMessage}
            </h1>
            <p className="hud__lede" data-boot>
              {company.summary}
            </p>
            <div className="hud__readout" data-boot>
              <span>OBJECTIVE</span>
              <strong>{company.secondaryMessage}</strong>
            </div>
            <a className="hud__cta" href="#services" data-boot>
              {company.capabilityCta}
              <ChevronRight size={16} aria-hidden />
            </a>
          </div>
        </section>

        <section className="hud__section" id="services" aria-labelledby="hud-services">
          <h2 className="hud__h2" id="hud-services">
            <span>02</span> Capability modules
          </h2>
          <ul className="hud__modules" data-modules>
            {services.map((service) => (
              <li key={service.id} data-panel>
                <div className="hud__module-head">
                  <span className="hud__module-id">MOD-{service.index}</span>
                  <span className="hud__module-state">READY</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="hud__section" id="about" aria-labelledby="hud-about">
          <h2 className="hud__h2" id="hud-about">
            <span>03</span> Operator profile
          </h2>
          <div className="hud__panel">
            <p>{company.summary}</p>
            <p>
              A single accountable team runs discovery, delivery and maintenance, so the system's
              designers remain its operators.
            </p>
          </div>
        </section>

        <section className="hud__section" id="industries" aria-labelledby="hud-industries">
          <h2 className="hud__h2" id="hud-industries">
            <span>04</span> Deployment sectors
          </h2>
          <ul className="hud__sectors">
            {industries.map((industry) => (
              <li key={industry.id} data-panel>
                <span className="hud__module-id">SEC-{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="hud__section" id="certifications" aria-labelledby="hud-cert">
          <h2 className="hud__h2" id="hud-cert">
            <span>05</span> Compliance registry
          </h2>
          <ul className="hud__registry">
            {complianceCards.map((card) => (
              <li key={card.id} data-panel>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="hud__section" id="contact" aria-labelledby="hud-contact">
          <h2 className="hud__h2" id="hud-contact">
            <span>06</span> Channel
          </h2>
          <div className="hud__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="hud__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="hud__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>COMING SOON</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="hud__footer">
        <span>{company.legalName}</span>
        <span aria-hidden>////////</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
