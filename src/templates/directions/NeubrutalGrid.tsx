import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './neubrutal-grid.css'

/**
 * Direction 06 — Civic Brutalist.
 * Basis: Neubrutalism. Hard borders, offset shadows, zero gradients. State changes
 * are mechanical and instant rather than eased.
 */
const blockTones = ['nb--yellow', 'nb--blue', 'nb--paper', 'nb--red'] as const

export default function NeubrutalGrid() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-pop]', {
      opacity: 0,
      y: 18,
      duration: 0.35,
      ease: 'steps(4)',
      stagger: 0.05,
      scrollTrigger: { trigger: '[data-svc]', start: 'top 85%' },
    })
  })

  return (
    <div className="nb" ref={root} data-tpl="neubrutal-grid">
      <header className="nb__header">
        <span className="nb__mark">{company.wordmark}</span>
        <nav className="nb__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="nb__main">
        <section className="nb__hero" aria-labelledby="nb-hero">
          <div className="nb__hero-main">
            <p className="nb__tag">{company.location}</p>
            <h1 id="nb-hero">{company.primaryMessage}</h1>
            <p className="nb__lede">{company.summary}</p>
            <a className="nb__cta" href="#services">
              {company.capabilityCta}
              <ArrowRight size={20} aria-hidden />
            </a>
          </div>
          <aside className="nb__hero-side" aria-label="Brand statement">
            <p>{company.secondaryMessage}</p>
          </aside>
        </section>

        <section className="nb__section" id="services" aria-labelledby="nb-services">
          <h2 id="nb-services">Services</h2>
          <ul className="nb__grid" data-svc>
            {services.map((service, index) => (
              <li key={service.id} className={blockTones[index % blockTones.length]} data-pop>
                <span className="nb__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="nb__section nb__section--invert" id="about" aria-labelledby="nb-about">
          <h2 id="nb-about">Who we are</h2>
          <div className="nb__about">
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery through maintenance. No hand-offs between
              disconnected vendors.
            </p>
          </div>
        </section>

        <section className="nb__section" id="industries" aria-labelledby="nb-industries">
          <h2 id="nb-industries">Industries</h2>
          <ul className="nb__grid nb__grid--5">
            {industries.map((industry, index) => (
              <li key={industry.id} className={blockTones[(index + 1) % blockTones.length]} data-pop>
                <span className="nb__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="nb__section" id="certifications" aria-labelledby="nb-cert">
          <h2 id="nb-cert">Certifications &amp; compliance</h2>
          <ul className="nb__grid nb__grid--5">
            {complianceCards.map((card) => (
              <li key={card.id} className="nb--paper" data-pop>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="nb__section" id="contact" aria-labelledby="nb-contact">
          <h2 id="nb-contact">Contact</h2>
          <div className="nb__contact">
            <div className="nb__contact-block nb--paper">
              <h3>Office</h3>
              <address>
                {contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="nb__contact-block nb--yellow">
              <h3>Direct</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <div className="nb__contact-block nb--blue">
              <h3>Channels</h3>
              <ul className="nb__social">
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

      <footer className="nb__footer">
        <span>{company.legalName}</span>
        <span>{company.primaryMessage}</span>
      </footer>
    </div>
  )
}
