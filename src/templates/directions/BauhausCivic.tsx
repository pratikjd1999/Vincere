import { useRef } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './bauhaus-civic.css'

/**
 * Direction 20 — Bauhaus Civic.
 * Basis: Bauhaus. Primary colour and primary shape do the structural work; circles,
 * quadrants and hard offset shadows instead of imagery. Presses are mechanical.
 */
const shapeClasses = ['bh--circle', 'bh--quarter', 'bh--triangle', 'bh--square'] as const

export default function BauhausCivic() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-shape]', {
      opacity: 0,
      rotate: -45,
      scale: 0.7,
      duration: 0.6,
      ease: 'back.out(1.6)',
      stagger: 0.06,
      scrollTrigger: { trigger: '[data-shapes]', start: 'top 85%' },
    })
    gsap.from('[data-build]', { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', stagger: 0.08 })
  })

  return (
    <div className="bh" ref={root} data-tpl="bauhaus-civic">
      <header className="bh__header">
        <span className="bh__mark">{company.wordmark}</span>
        <nav className="bh__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="bh__main">
        <section className="bh__hero" aria-labelledby="bh-hero">
          <div className="bh__hero-copy">
            <p className="bh__eyebrow" data-build>
              {company.location}
            </p>
            <h1 id="bh-hero" data-build>
              {company.primaryMessage}
            </h1>
            <p className="bh__lede" data-build>
              {company.summary}
            </p>
            <a className="bh__cta" href="#services" data-build>
              {company.capabilityCta}
            </a>
          </div>
          <div className="bh__composition" aria-hidden>
            <span className="bh__form bh__form--red" />
            <span className="bh__form bh__form--blue" />
            <span className="bh__form bh__form--yellow" />
            <span className="bh__form bh__form--bar" />
          </div>
        </section>

        <section className="bh__band" aria-label="Brand statement">
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="bh__section" id="services" aria-labelledby="bh-services">
          <h2 id="bh-services">Services</h2>
          <ul className="bh__grid" data-shapes>
            {services.map((service, index) => (
              <li key={service.id}>
                <span className={`bh__glyph ${shapeClasses[index % shapeClasses.length]}`} data-shape aria-hidden />
                <span className="bh__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bh__section bh__section--split" id="about" aria-labelledby="bh-about">
          <h2 id="bh-about">Who we are</h2>
          <div className="bh__about">
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance. Form follows the work,
              not the other way round.
            </p>
          </div>
        </section>

        <section className="bh__section" id="industries" aria-labelledby="bh-industries">
          <h2 id="bh-industries">Industries</h2>
          <ul className="bh__blocks">
            {industries.map((industry, index) => (
              <li key={industry.id} className={`bh__tone-${index % 3}`}>
                <span className="bh__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bh__section" id="certifications" aria-labelledby="bh-cert">
          <h2 id="bh-cert">Certifications &amp; compliance</h2>
          <ul className="bh__blocks bh__blocks--plain">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bh__section" id="contact" aria-labelledby="bh-contact">
          <h2 id="bh-contact">Contact</h2>
          <div className="bh__contact">
            <div className="bh__contact-block">
              <h3>Office</h3>
              <address>
                {contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="bh__contact-block bh__tone-1">
              <h3>Direct</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <div className="bh__contact-block bh__tone-2">
              <h3>Channels</h3>
              <ul className="bh__social">
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

      <footer className="bh__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
