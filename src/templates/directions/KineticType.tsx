import { useRef } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import './kinetic-type.css'

/**
 * Direction 05 — Kinetic Statement.
 * Basis: Kinetic Typography. Type is the interface; words are split into spans and
 * revealed per character. Without motion the words simply render in place.
 */
function SplitWord({ text }: { text: string }) {
  return (
    <span className="kt__word">
      {Array.from(text).map((character, index) => (
        <span className="kt__char" key={`${character}-${index}`} data-char>
          {character}
        </span>
      ))}
    </span>
  )
}

export default function KineticType() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGsap(root, () => {
    gsap.from('[data-char]', {
      yPercent: 120,
      opacity: 0,
      duration: 0.7,
      ease: 'power4.out',
      stagger: 0.022,
    })

    gsap.utils.toArray<HTMLElement>('[data-slide]').forEach((element) => {
      gsap.from(element, {
        xPercent: -6,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      })
    })
  })

  return (
    <div className="kt" ref={root} data-tpl="kinetic-type">
      <header className="kt__header">
        <span className="kt__mark">{company.wordmark}</span>
        <nav className="kt__nav" aria-label="Primary">
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
        <section className="kt__hero" aria-labelledby="kt-hero">
          <h1 className="kt__title" id="kt-hero">
            <span className="visually-hidden">{company.primaryMessage}</span>
            <span aria-hidden className="kt__line">
              <SplitWord text="MODERN" />
            </span>
            <span aria-hidden className="kt__line kt__line--outline">
              <SplitWord text="DIGITAL" />
            </span>
            <span aria-hidden className="kt__line">
              <SplitWord text="SOLUTIONS" />
            </span>
          </h1>
          <div className="kt__hero-foot">
            <p>{company.summary}</p>
            <a className="kt__cta" href="#services">
              {company.capabilityCta}
            </a>
          </div>
        </section>

        <div className={`kt__marquee${reduced ? ' kt__marquee--static' : ''}`} aria-hidden>
          <div className="kt__marquee-track">
            {Array.from({ length: 2 }, (_, pass) => (
              <span key={pass}>
                {services.map((service) => (
                  <span key={`${pass}-${service.id}`}>
                    {service.name} <em>◆</em>{' '}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section className="kt__section" id="services" aria-labelledby="kt-services">
          <h2 className="kt__h2" id="kt-services">
            Services
          </h2>
          <ol className="kt__services">
            {services.map((service) => (
              <li key={service.id} data-slide>
                <span className="kt__svc-num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="kt__statement" aria-label="Brand statement">
          <p data-slide>{company.secondaryMessage}</p>
        </section>

        <section className="kt__section" id="about" aria-labelledby="kt-about">
          <h2 className="kt__h2" id="kt-about">
            Who we are
          </h2>
          <div className="kt__about" data-slide>
            <p>{company.summary}</p>
            <p>
              Discovery, delivery and maintenance stay with one accountable team rather than moving
              between hands.
            </p>
          </div>
        </section>

        <section className="kt__section" id="industries" aria-labelledby="kt-industries">
          <h2 className="kt__h2" id="kt-industries">
            Industries
          </h2>
          <ul className="kt__industries">
            {industries.map((industry) => (
              <li key={industry.id} data-slide>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="kt__section" id="certifications" aria-labelledby="kt-cert">
          <h2 className="kt__h2" id="kt-cert">
            Compliance
          </h2>
          <ul className="kt__compliance">
            {complianceCards.map((card) => (
              <li key={card.id} data-slide>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="kt__section" id="contact" aria-labelledby="kt-contact">
          <h2 className="kt__h2" id="kt-contact">
            Contact
          </h2>
          <div className="kt__contact" data-slide>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a className="kt__big-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="kt__big-link" href={`tel:${contact.phoneHref}`}>
              {contact.phone}
            </a>
            <ul className="kt__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="kt__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
