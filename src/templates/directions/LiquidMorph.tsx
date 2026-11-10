import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './liquid-morph.css'

/**
 * Direction 16 — Liquid Form.
 * Basis: Liquid Glass. A morphing SVG mass behind the hero and fluid section
 * dividers. The morph is a GSAP tween between two path shapes, so with reduced
 * motion the first shape simply renders static.
 */
const BLOB_A =
  'M431 92q49 60 32 128t-72 116q-55 48-130 62t-129-30q-54-44-70-113T51 196q17-67 74-104t130-30q73 7 122 30z'
const BLOB_B =
  'M447 121q37 71 8 136t-92 108q-63 43-136 40t-121-52q-48-49-52-119T88 121q41-53 116-63t134 20q59 30 109 43z'

export default function LiquidMorph() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.to('[data-blob]', {
      attr: { d: BLOB_B },
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to('[data-hue]', { filter: 'hue-rotate(40deg)', duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true })
    gsap.from('[data-flow]', { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', stagger: 0.09 })
    gsap.utils.toArray<HTMLElement>('[data-wave]').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      })
    })
  })

  return (
    <div className="lm" ref={root} data-tpl="liquid-morph">
      <header className="lm__header">
        <span className="lm__mark">{company.wordmark}</span>
        <nav className="lm__nav" aria-label="Primary">
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
        <section className="lm__hero" aria-labelledby="lm-hero">
          <div className="lm__blob-wrap" data-hue aria-hidden>
            <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" role="presentation">
              <defs>
                <linearGradient id="lm-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--g1)" />
                  <stop offset="55%" stopColor="var(--g2)" />
                  <stop offset="100%" stopColor="var(--g3)" />
                </linearGradient>
              </defs>
              <path d={BLOB_A} fill="url(#lm-grad)" data-blob />
            </svg>
          </div>

          <div className="lm__hero-body">
            <p className="lm__eyebrow" data-flow>
              {company.location}
            </p>
            <h1 id="lm-hero" data-flow>
              {company.primaryMessage}
            </h1>
            <p className="lm__lede" data-flow>
              {company.summary}
            </p>
            <a className="lm__cta" href="#services" data-flow>
              {company.capabilityCta}
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
        </section>

        <section className="lm__section" id="services" aria-labelledby="lm-services">
          <h2 id="lm-services">Capabilities</h2>
          <ul className="lm__cards">
            {services.map((service) => (
              <li key={service.id} data-wave>
                <span className="lm__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lm__ribbon" aria-label="Brand statement">
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="lm__section" id="about" aria-labelledby="lm-about">
          <h2 id="lm-about">Who we are</h2>
          <div className="lm__about" data-wave>
            <p>{company.summary}</p>
            <p>
              A single accountable team stays with a system through discovery, delivery and
              maintenance.
            </p>
          </div>
        </section>

        <section className="lm__section" id="industries" aria-labelledby="lm-industries">
          <h2 id="lm-industries">Industries</h2>
          <ul className="lm__cards lm__cards--tight">
            {industries.map((industry) => (
              <li key={industry.id} data-wave>
                <span className="lm__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lm__section" id="certifications" aria-labelledby="lm-cert">
          <h2 id="lm-cert">Certifications &amp; compliance</h2>
          <ul className="lm__cards lm__cards--tight">
            {complianceCards.map((card) => (
              <li key={card.id} data-wave>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lm__section" id="contact" aria-labelledby="lm-contact">
          <h2 id="lm-contact">Contact</h2>
          <div className="lm__contact" data-wave>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="lm__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="lm__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="lm__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
