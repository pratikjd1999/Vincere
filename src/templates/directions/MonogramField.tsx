import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './monogram-field.css'

/**
 * Direction 21 — Monogram Field.
 * The most graphically dense direction: a monumental V letterform anchors the hero,
 * layered over an animated lattice, an aurora wash and a grain plate, and returns as
 * a full-bleed footer watermark.
 *
 * The V is a decorative typographic device drawn in the page's own typeface — not a
 * logo. `VINCERE CORP` remains the text wordmark, per docs/product-requirements.md.
 */
function MonogramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="presentation" aria-hidden focusable="false">
      <defs>
        <linearGradient id="mf-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--mf-g1)" />
          <stop offset="50%" stopColor="var(--mf-g2)" />
          <stop offset="100%" stopColor="var(--mf-g3)" />
        </linearGradient>
      </defs>
      {/* Nested V strokes, each inset, producing a layered chevron field. */}
      <path d="M22 26 L100 178 L178 26" fill="none" stroke="url(#mf-stroke)" strokeWidth="15" strokeLinecap="square" />
      <path d="M52 26 L100 122 L148 26" fill="none" stroke="url(#mf-stroke)" strokeWidth="7" opacity="0.62" />
      <path d="M78 26 L100 70 L122 26" fill="none" stroke="url(#mf-stroke)" strokeWidth="3" opacity="0.4" />
    </svg>
  )
}

export default function MonogramField() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-rise]', { opacity: 0, y: 34, duration: 0.9, ease: 'power3.out', stagger: 0.08 })

    // The monogram slowly scales and drifts as the hero scrolls away.
    gsap.to('[data-monogram]', {
      scale: 1.35,
      yPercent: 14,
      rotate: -4,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.8 },
    })

    gsap.utils.toArray<HTMLElement>('[data-band]').forEach((band, index) => {
      gsap.to(band, {
        yPercent: index % 2 === 0 ? -8 : -14,
        ease: 'none',
        scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-card]').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 32,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 88%' },
      })
    })

    gsap.from('[data-watermark]', {
      opacity: 0,
      scale: 0.86,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-footer]', start: 'top 92%' },
    })
  })

  return (
    <div className="mf" ref={root} data-tpl="monogram-field">
      {/* Layer 1: aurora wash. Layer 2: chevron lattice. Layer 3: grain. */}
      <div className="mf__wash" aria-hidden />
      <div className="mf__lattice" aria-hidden />
      <div className="mf__grain" aria-hidden />

      <header className="mf__header">
        <span className="mf__mark">{company.wordmark}</span>
        <nav className="mf__nav" aria-label="Primary">
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
        <section className="mf__hero" data-hero aria-labelledby="mf-hero">
          <div className="mf__monogram" data-monogram aria-hidden>
            <MonogramGlyph className="mf__glyph" />
          </div>

          <div className="mf__hero-body">
            <p className="mf__eyebrow" data-rise>
              {company.location}
            </p>
            <h1 id="mf-hero" data-rise>
              {company.primaryMessage}
            </h1>
            <p className="mf__lede" data-rise>
              {company.summary}
            </p>
            <div className="mf__actions" data-rise>
              <a className="mf__cta" href="#services">
                {company.capabilityCta}
                <ArrowUpRight size={18} aria-hidden />
              </a>
              <a className="mf__ghost" href="#contact">
                Contact
              </a>
            </div>
            <p className="mf__whisper" data-rise>
              {company.secondaryMessage}
            </p>
          </div>
        </section>

        <section className="mf__section" id="services" aria-labelledby="mf-services">
          <div className="mf__band" data-band aria-hidden />
          <h2 id="mf-services">Capabilities</h2>
          <ul className="mf__cards">
            {services.map((service) => (
              <li key={service.id} data-card>
                <span className="mf__chev" aria-hidden />
                <span className="mf__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mf__feature" aria-label="Brand statement">
          <MonogramGlyph className="mf__feature-glyph" />
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="mf__section" id="about" aria-labelledby="mf-about">
          <h2 id="mf-about">Who we are</h2>
          <div className="mf__about" data-card>
            <p>{company.summary}</p>
            <p>
              One accountable team carries a system through discovery, delivery and maintenance, so
              the people who design it remain the people who support it.
            </p>
          </div>
        </section>

        <section className="mf__section" id="industries" aria-labelledby="mf-industries">
          <div className="mf__band mf__band--alt" data-band aria-hidden />
          <h2 id="mf-industries">Industries</h2>
          <ul className="mf__cards mf__cards--tight">
            {industries.map((industry) => (
              <li key={industry.id} data-card>
                <span className="mf__chev" aria-hidden />
                <span className="mf__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mf__section" id="certifications" aria-labelledby="mf-cert">
          <h2 id="mf-cert">Certifications &amp; compliance</h2>
          <ul className="mf__cards mf__cards--tight">
            {complianceCards.map((card) => (
              <li key={card.id} data-card>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mf__section" id="contact" aria-labelledby="mf-contact">
          <h2 id="mf-contact">Contact</h2>
          <div className="mf__contact" data-card>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="mf__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="mf__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mf__footer" data-footer>
        {/* Full-bleed monogram watermark. */}
        <div className="mf__watermark" data-watermark aria-hidden>
          <MonogramGlyph className="mf__watermark-glyph" />
        </div>
        <div className="mf__footer-row">
          <span>{company.legalName}</span>
          <span>{company.primaryMessage}</span>
          <span>{company.location}</span>
        </div>
      </footer>
    </div>
  )
}
