import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './depth-layers.css'

/**
 * Direction 09 — Depth Stack.
 * Basis: Dimensional Layering. Four elevation planes moving at different speeds,
 * so capability reads as physical stacking rather than a flat list.
 */
export default function DepthLayers() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.utils.toArray<HTMLElement>('[data-plane]').forEach((plane) => {
      const depth = Number(plane.dataset.plane ?? '1')
      gsap.to(plane, {
        yPercent: -6 * depth,
        ease: 'none',
        scrollTrigger: { trigger: plane, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    })

    gsap.from('[data-lift]', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '[data-stack]', start: 'top 84%' },
    })
  })

  return (
    <div className="dl" ref={root} data-tpl="depth-layers">
      <header className="dl__header">
        <span className="dl__mark">{company.wordmark}</span>
        <nav className="dl__nav" aria-label="Primary">
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
        <section className="dl__hero" aria-labelledby="dl-hero">
          <div className="dl__planes" aria-hidden>
            <span className="dl__plane dl__plane--1" data-plane="1" />
            <span className="dl__plane dl__plane--2" data-plane="2" />
            <span className="dl__plane dl__plane--3" data-plane="3" />
          </div>
          <div className="dl__hero-card dl__elev-4">
            <p className="dl__eyebrow">{company.location}</p>
            <h1 id="dl-hero">{company.primaryMessage}</h1>
            <p className="dl__lede">{company.summary}</p>
            <a className="dl__cta" href="#services">
              {company.capabilityCta}
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>
          <p className="dl__hero-note dl__elev-2">{company.secondaryMessage}</p>
        </section>

        <section className="dl__section" id="services" aria-labelledby="dl-services">
          <h2 id="dl-services">Capabilities</h2>
          <ul className="dl__stack" data-stack>
            {services.map((service, index) => (
              <li key={service.id} className={`dl__elev-${(index % 3) + 2}`} data-lift>
                <span className="dl__num">{service.index}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="dl__section dl__section--about" id="about" aria-labelledby="dl-about">
          <div className="dl__about dl__elev-3" data-lift>
            <h2 id="dl-about">Who we are</h2>
            <p>{company.summary}</p>
            <p>
              Discovery, delivery and maintenance sit with one accountable team rather than moving
              between separate vendors.
            </p>
          </div>
        </section>

        <section className="dl__section" id="industries" aria-labelledby="dl-industries">
          <h2 id="dl-industries">Industries</h2>
          <ul className="dl__cards">
            {industries.map((industry, index) => (
              <li key={industry.id} className={`dl__elev-${(index % 3) + 2}`} data-lift>
                <span className="dl__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="dl__section" id="certifications" aria-labelledby="dl-cert">
          <h2 id="dl-cert">Certifications &amp; compliance</h2>
          <ul className="dl__cards">
            {complianceCards.map((card) => (
              <li key={card.id} className="dl__elev-2" data-lift>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="dl__section" id="contact" aria-labelledby="dl-contact">
          <h2 id="dl-contact">Contact</h2>
          <div className="dl__contact dl__elev-4" data-lift>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="dl__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="dl__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="dl__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
