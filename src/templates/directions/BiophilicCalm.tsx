import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './biophilic-calm.css'

/**
 * Direction 18 — Organic Systems.
 * Basis: Organic Biophilic. Curved containers, varied radii and a grounded palette.
 * Technology framed as calm public infrastructure rather than spectacle.
 */
export default function BiophilicCalm() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-grow]', { opacity: 0, y: 26, duration: 0.9, ease: 'power2.out', stagger: 0.1 })
    gsap.utils.toArray<HTMLElement>('[data-leaf]').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        delay: (index % 3) * 0.05,
        scrollTrigger: { trigger: element, start: 'top 88%' },
      })
    })
  })

  return (
    <div className="bp" ref={root} data-tpl="biophilic-calm">
      <header className="bp__header">
        <span className="bp__mark">{company.wordmark}</span>
        <nav className="bp__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="bp__hero" aria-labelledby="bp-hero">
          <div className="bp__hero-body">
            <p className="bp__eyebrow" data-grow>
              {company.location}
            </p>
            <h1 id="bp-hero" data-grow>
              {company.primaryMessage}
            </h1>
            <p className="bp__lede" data-grow>
              {company.summary}
            </p>
            <a className="bp__cta" href="#services" data-grow>
              {company.capabilityCta}
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>
          <div className="bp__hero-shape" data-grow aria-hidden>
            <span className="bp__shape bp__shape--a" />
            <span className="bp__shape bp__shape--b" />
            <span className="bp__shape bp__shape--c" />
          </div>
        </section>

        <div className="bp__divider" aria-hidden>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" role="presentation">
            <path d="M0 62C240 14 420 82 720 52s470-72 720-26v64H0z" fill="currentColor" />
          </svg>
        </div>

        <section className="bp__section bp__section--tint" id="services" aria-labelledby="bp-services">
          <h2 id="bp-services">What we grow</h2>
          <ul className="bp__cards">
            {services.map((service) => (
              <li key={service.id} data-leaf>
                <span className="bp__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bp__section" id="about" aria-labelledby="bp-about">
          <h2 id="bp-about">Who we are</h2>
          <div className="bp__about" data-leaf>
            <p>{company.summary}</p>
            <p>
              One accountable team stays with a system across discovery, delivery and maintenance,
              so it keeps working long after launch. {company.secondaryMessage}.
            </p>
          </div>
        </section>

        <section className="bp__section" id="industries" aria-labelledby="bp-industries">
          <h2 id="bp-industries">Where we work</h2>
          <ul className="bp__pods">
            {industries.map((industry) => (
              <li key={industry.id} data-leaf>
                <span className="bp__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bp__section bp__section--tint" id="certifications" aria-labelledby="bp-cert">
          <h2 id="bp-cert">Certifications &amp; compliance</h2>
          <ul className="bp__pods">
            {complianceCards.map((card) => (
              <li key={card.id} data-leaf>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bp__section" id="contact" aria-labelledby="bp-contact">
          <h2 id="bp-contact">Contact</h2>
          <div className="bp__contact" data-leaf>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="bp__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="bp__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bp__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
