import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './swiss-grid.css'

/**
 * Direction 01 — Swiss Signal.
 * Basis: Swiss Modernism 2.0. A strict 12-column grid, hairline rules, numbered rows.
 * Motion is a staggered mask reveal; every element is visible without JavaScript.
 */
export default function SwissGrid() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-reveal]', {
      yPercent: 108,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '[data-hero]', start: 'top 80%' },
    })

    gsap.utils.toArray<HTMLElement>('[data-row]').forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 88%' },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((rule) => {
      gsap.from(rule, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: rule, start: 'top 92%' },
      })
    })
  })

  return (
    <div className="sw" ref={root} data-tpl="swiss-grid">
      <header className="sw__header">
        <a className="sw__mark" href="#main">
          {company.wordmark}
        </a>
        <nav className="sw__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="sw__loc">{company.location}</span>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="sw__hero" data-hero aria-labelledby="sw-hero-title">
          <p className="sw__idx">00 / Index</p>
          <h1 className="sw__title" id="sw-hero-title">
            <span className="sw__mask">
              <span data-reveal>Modern</span>
            </span>
            <span className="sw__mask">
              <span data-reveal>digital</span>
            </span>
            <span className="sw__mask">
              <span data-reveal>solutions</span>
            </span>
          </h1>
          <div className="sw__hero-meta">
            <p className="sw__lede">{company.summary}</p>
            <p className="sw__sub">{company.secondaryMessage}</p>
            <a className="sw__cta" href="#services">
              {company.capabilityCta}
              <ArrowDownRight size={18} aria-hidden />
            </a>
          </div>
        </section>

        <hr className="sw__rule" data-rule />

        <section className="sw__section" id="about" aria-labelledby="sw-about">
          <h2 className="sw__h2" id="sw-about">
            <span className="sw__num">01</span> Who we are
          </h2>
          <div className="sw__cols">
            <p className="sw__body">{company.summary}</p>
            <p className="sw__body">
              The practice is organised around nine service areas and five sectors, delivered by one
              accountable team from discovery through maintenance.
            </p>
          </div>
        </section>

        <hr className="sw__rule" data-rule />

        <section className="sw__section" id="services" aria-labelledby="sw-services">
          <h2 className="sw__h2" id="sw-services">
            <span className="sw__num">02</span> Services
          </h2>
          <ol className="sw__list">
            {services.map((service) => (
              <li className="sw__row" key={service.id} data-row>
                <span className="sw__row-num">{service.index}</span>
                <h3 className="sw__row-name">{service.name}</h3>
                <p className="sw__row-sum">{service.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <hr className="sw__rule" data-rule />

        <section className="sw__section" id="industries" aria-labelledby="sw-industries">
          <h2 className="sw__h2" id="sw-industries">
            <span className="sw__num">03</span> Industries
          </h2>
          <ul className="sw__grid5">
            {industries.map((industry) => (
              <li key={industry.id} data-row>
                <span className="sw__row-num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="sw__rule" data-rule />

        <section className="sw__section" id="certifications" aria-labelledby="sw-cert">
          <h2 className="sw__h2" id="sw-cert">
            <span className="sw__num">04</span> Certifications &amp; compliance
          </h2>
          <ul className="sw__compliance">
            {complianceCards.map((card) => (
              <li key={card.id} data-row>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="sw__rule" data-rule />

        <section className="sw__section" id="contact" aria-labelledby="sw-contact">
          <h2 className="sw__h2" id="sw-contact">
            <span className="sw__num">05</span> Contact
          </h2>
          <div className="sw__contact">
            <address className="sw__addr">
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="sw__links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="sw__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="sw__footer">
        <span>{company.legalName}</span>
        <span>{company.primaryMessage}</span>
      </footer>
    </div>
  )
}
