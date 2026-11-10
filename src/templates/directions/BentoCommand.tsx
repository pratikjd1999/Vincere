import { useRef } from 'react'
import { ArrowUpRight, Building2, Cloud, Cpu, Layers, LifeBuoy, Monitor, Shield, Smartphone, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './bento-command.css'

/**
 * Direction 02 — Bento Command.
 * Basis: Bento Box Grid. Capability claims different tile footprints so the board
 * itself communicates weight and relationship.
 */
const serviceIcons: Record<string, LucideIcon> = {
  websites: Monitor,
  'web-applications': Layers,
  'mobile-applications': Smartphone,
  'government-tender-solutions': FileText,
  'ui-ux-design': Building2,
  'cloud-solutions': Cloud,
  'ai-automation': Cpu,
  cybersecurity: Shield,
  'maintenance-support': LifeBuoy,
}

/** Tile spans, chosen so the board reads as composed rather than uniform. */
const spans = ['bn--wide', 'bn--tall', '', '', 'bn--wide', '', 'bn--tall', '', ''] as const

export default function BentoCommand() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-tile]', {
      opacity: 0,
      y: 28,
      scale: 0.97,
      duration: 0.55,
      ease: 'power2.out',
      stagger: { each: 0.04, from: 'start' },
      scrollTrigger: { trigger: '[data-board]', start: 'top 82%' },
    })
    gsap.from('[data-hero-tile]', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', stagger: 0.08 })
  })

  return (
    <div className="bn" ref={root} data-tpl="bento-command">
      <header className="bn__header">
        <span className="bn__mark">{company.wordmark}</span>
        <nav className="bn__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="bn__main">
        <section className="bn__hero" aria-labelledby="bn-hero">
          <div className="bn__hero-copy" data-hero-tile>
            <p className="bn__eyebrow">{company.location}</p>
            <h1 className="bn__title" id="bn-hero">
              {company.primaryMessage}
            </h1>
            <p className="bn__lede">{company.summary}</p>
            <a className="bn__cta" href="#services">
              {company.capabilityCta}
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
          <div className="bn__hero-panel" data-hero-tile aria-hidden>
            <span className="bn__hero-glyph">{company.secondaryMessage}</span>
          </div>
        </section>

        <section id="services" aria-labelledby="bn-services" className="bn__block">
          <div className="bn__block-head">
            <h2 id="bn-services">Capability board</h2>
            <p>Nine service areas, one accountable delivery team.</p>
          </div>
          <ul className="bn__board" data-board>
            {services.map((service, i) => {
              const Icon = serviceIcons[service.id] ?? Layers
              return (
                <li className={`bn__tile ${spans[i]}`} key={service.id} data-tile>
                  <span className="bn__tile-icon">
                    <Icon size={22} aria-hidden />
                  </span>
                  <span className="bn__tile-num">{service.index}</span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </li>
              )
            })}
          </ul>
        </section>

        <section id="about" aria-labelledby="bn-about" className="bn__block">
          <div className="bn__block-head">
            <h2 id="bn-about">Who we are</h2>
          </div>
          <div className="bn__about">
            <p>{company.summary}</p>
            <p>
              Work is delivered from discovery through maintenance, with the same team accountable at
              every stage.
            </p>
          </div>
        </section>

        <section id="industries" aria-labelledby="bn-industries" className="bn__block">
          <div className="bn__block-head">
            <h2 id="bn-industries">Industries</h2>
          </div>
          <ul className="bn__industries">
            {industries.map((industry) => (
              <li key={industry.id} data-tile>
                <span className="bn__tile-num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="certifications" aria-labelledby="bn-cert" className="bn__block">
          <div className="bn__block-head">
            <h2 id="bn-cert">Certifications &amp; compliance</h2>
            <p>Records are held and shared through the appropriate channel.</p>
          </div>
          <ul className="bn__compliance">
            {complianceCards.map((card) => (
              <li key={card.id} data-tile>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="bn-contact" className="bn__block">
          <div className="bn__block-head">
            <h2 id="bn-contact">Contact</h2>
          </div>
          <div className="bn__contact">
            <div className="bn__contact-tile">
              <h3>Office</h3>
              <address>
                {contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
            <div className="bn__contact-tile">
              <h3>Direct</h3>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <div className="bn__contact-tile">
              <h3>Channels</h3>
              <ul className="bn__social">
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

      <footer className="bn__footer">
        <span>{company.legalName}</span>
        <span>{company.secondaryMessage}</span>
      </footer>
    </div>
  )
}
