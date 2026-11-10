import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './glitch-split.css'

/**
 * Direction 15 — Chromatic Split.
 * Basis: Chromatic Aberration / RGB Split. Offset channels on headlines and split
 * panels. The glitch is decorative only, so `data-text` duplicates never reach
 * assistive tech and the effect disappears entirely under reduced motion.
 */
export default function GlitchSplit() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-split]', {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -30 : 30),
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '[data-splitwrap]', start: 'top 85%' },
    })
    gsap.from('[data-enter]', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.08 })
  })

  return (
    <div className="gs" ref={root} data-tpl="glitch-split">
      <div className="gs__noise" aria-hidden />

      <header className="gs__header">
        <span className="gs__mark" data-text={company.wordmark}>
          {company.wordmark}
        </span>
        <nav className="gs__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="gs__main">
        <section className="gs__hero" aria-labelledby="gs-hero">
          <p className="gs__tag" data-enter>
            {company.location} — Signal
          </p>
          <h1 className="gs__title" id="gs-hero" data-enter>
            <span className="gs__glitch" data-text={company.primaryMessage}>
              {company.primaryMessage}
            </span>
          </h1>
          <p className="gs__lede" data-enter>
            {company.summary}
          </p>
          <a className="gs__cta" href="#services" data-enter>
            {company.capabilityCta}
            <ArrowRight size={17} aria-hidden />
          </a>
        </section>

        <section className="gs__strip" aria-label="Brand statement">
          <p data-text={company.secondaryMessage}>{company.secondaryMessage}</p>
        </section>

        <section className="gs__section" id="services" aria-labelledby="gs-services">
          <h2 className="gs__h2" id="gs-services">
            Services
          </h2>
          <div className="gs__grid" data-splitwrap>
            {services.map((service) => (
              <article key={service.id} data-split>
                <span className="gs__num">{service.index}</span>
                <h3 data-text={service.name}>{service.name}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gs__section gs__section--split" id="about" aria-labelledby="gs-about">
          <div>
            <h2 className="gs__h2" id="gs-about">
              Who we are
            </h2>
            <p className="gs__body">{company.summary}</p>
            <p className="gs__body">
              Discovery, delivery and maintenance stay with one accountable team from first brief to
              long-term support.
            </p>
          </div>
          <div className="gs__panel" aria-hidden>
            <span className="gs__panel-r" />
            <span className="gs__panel-c" />
          </div>
        </section>

        <section className="gs__section" id="industries" aria-labelledby="gs-industries">
          <h2 className="gs__h2" id="gs-industries">
            Industries
          </h2>
          <div className="gs__grid gs__grid--5" data-splitwrap>
            {industries.map((industry) => (
              <article key={industry.id} data-split>
                <span className="gs__num">{industry.index}</span>
                <h3 data-text={industry.name}>{industry.name}</h3>
                <p>{industry.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gs__section" id="certifications" aria-labelledby="gs-cert">
          <h2 className="gs__h2" id="gs-cert">
            Compliance
          </h2>
          <div className="gs__grid gs__grid--5">
            {complianceCards.map((card) => (
              <article key={card.id} data-split>
                <h3 data-text={card.label}>{card.label}</h3>
                <p>{card.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gs__section" id="contact" aria-labelledby="gs-contact">
          <h2 className="gs__h2" id="gs-contact">
            Contact
          </h2>
          <div className="gs__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="gs__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="gs__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="gs__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
