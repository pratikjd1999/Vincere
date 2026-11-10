import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import './aurora-mesh.css'

/**
 * Direction 03 — Aurora Field.
 * Basis: Gradient Mesh / Aurora Evolved. A drifting colour field behind a centred
 * statement. The field is pure CSS so it degrades to a static wash when motion is reduced.
 */
export default function AuroraMesh() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGsap(root, () => {
    gsap.from('[data-rise]', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.09 })
    gsap.utils.toArray<HTMLElement>('[data-float]').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
        delay: (i % 3) * 0.06,
        scrollTrigger: { trigger: card, start: 'top 88%' },
      })
    })
  })

  return (
    <div className="au" ref={root} data-tpl="aurora-mesh">
      <div className={`au__field${reduced ? ' au__field--static' : ''}`} aria-hidden>
        <span className="au__blob au__blob--1" />
        <span className="au__blob au__blob--2" />
        <span className="au__blob au__blob--3" />
      </div>

      <header className="au__header">
        <span className="au__mark">{company.wordmark}</span>
        <nav className="au__nav" aria-label="Primary">
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
        <section className="au__hero" aria-labelledby="au-hero">
          <p className="au__pill" data-rise>
            {company.location}
          </p>
          <h1 className="au__title" id="au-hero" data-rise>
            {company.primaryMessage}
          </h1>
          <p className="au__lede" data-rise>
            {company.summary}
          </p>
          <div className="au__actions" data-rise>
            <a className="au__cta" href="#services">
              {company.capabilityCta}
              <ArrowRight size={18} aria-hidden />
            </a>
            <a className="au__ghost" href="#contact">
              Contact the team
            </a>
          </div>
          <p className="au__whisper" data-rise>
            {company.secondaryMessage}
          </p>
        </section>

        <section className="au__section" id="services" aria-labelledby="au-services">
          <h2 id="au-services">Capabilities</h2>
          <ul className="au__cards">
            {services.map((service) => (
              <li key={service.id} data-float>
                <span className="au__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="au__section au__section--split" id="about" aria-labelledby="au-about">
          <div>
            <h2 id="au-about">Who we are</h2>
            <p className="au__body">{company.summary}</p>
            <p className="au__body">
              One team carries a project from discovery through maintenance, so the people who design
              a system are the people who keep it running.
            </p>
          </div>
          <ul className="au__industries" id="industries" aria-label="Industries served">
            {industries.map((industry) => (
              <li key={industry.id} data-float>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="au__section" id="certifications" aria-labelledby="au-cert">
          <h2 id="au-cert">Certifications &amp; compliance</h2>
          <ul className="au__compliance">
            {complianceCards.map((card) => (
              <li key={card.id} data-float>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="au__section au__contact" id="contact" aria-labelledby="au-contact">
          <h2 id="au-contact">Contact</h2>
          <div className="au__contact-grid">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="au__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="au__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="au__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
