import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { useCountUp, useInView } from '../../lib/motion'
import './exec-metrics.css'

/**
 * Direction 13 — Delivery Console.
 * Basis: Executive Dashboard. Capability is presented as a console: counters, a
 * coverage matrix and a status register.
 *
 * Important: every number here counts the approved content itself (nine service
 * areas, five sectors, five record categories). No performance metric, project
 * count, client figure or result is represented, because none has been approved.
 */
function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const display = useCountUp(value, inView)

  return (
    <div className="em__kpi" ref={ref}>
      <span className="em__kpi-value">{String(display).padStart(2, '0')}</span>
      <span className="em__kpi-label">{label}</span>
    </div>
  )
}

export default function ExecMetrics() {
  return (
    <div className="em" data-tpl="exec-metrics">
      <header className="em__header">
        <div className="em__brand">
          <span className="em__mark">{company.wordmark}</span>
          <span className="em__env">Capability console</span>
        </div>
        <nav className="em__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="em__main">
        <section className="em__hero" aria-labelledby="em-hero">
          <div className="em__hero-copy">
            <p className="em__eyebrow">{company.location}</p>
            <h1 id="em-hero">{company.primaryMessage}</h1>
            <p className="em__lede">{company.summary}</p>
            <a className="em__cta" href="#services">
              {company.capabilityCta}
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
          <div className="em__kpis">
            <Counter value={services.length} label="Service areas" />
            <Counter value={industries.length} label="Sectors served" />
            <Counter value={complianceCards.length} label="Record categories" />
          </div>
        </section>

        <section className="em__panel" id="services" aria-labelledby="em-services">
          <div className="em__panel-head">
            <h2 id="em-services">Service register</h2>
            <span className="em__badge">{services.length} areas</span>
          </div>
          <table className="em__table">
            <caption className="visually-hidden">Service areas and their descriptions</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Service area</th>
                <th scope="col">Scope</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="em__mono">{service.index}</td>
                  <th scope="row">{service.name}</th>
                  <td>{service.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="em__panel" id="industries" aria-labelledby="em-matrix">
          <div className="em__panel-head">
            <h2 id="em-matrix">Sector coverage</h2>
            <span className="em__badge">{industries.length} sectors</span>
          </div>
          <p className="em__panel-note">
            All nine service areas are offered to each sector listed below.
          </p>
          <ul className="em__sectors">
            {industries.map((industry) => (
              <li key={industry.id}>
                <div className="em__sector-head">
                  <span className="em__mono">SEC-{industry.index}</span>
                  <h3>{industry.name}</h3>
                </div>
                <p>{industry.summary}</p>
                <div className="em__bar" aria-hidden>
                  {services.map((service) => (
                    <span key={service.id} />
                  ))}
                </div>
                <span className="em__bar-label">{services.length} of {services.length} service areas</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="em__panel" id="about" aria-labelledby="em-about">
          <div className="em__panel-head">
            <h2 id="em-about">Operating model</h2>
          </div>
          <div className="em__prose">
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance, so context is preserved
              across the whole lifecycle. {company.secondaryMessage}.
            </p>
          </div>
        </section>

        <section className="em__panel" id="certifications" aria-labelledby="em-cert">
          <div className="em__panel-head">
            <h2 id="em-cert">Compliance status</h2>
            <span className="em__badge">On request</span>
          </div>
          <ul className="em__status">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <span className="em__dot" aria-hidden />
                <div>
                  <h3>{card.label}</h3>
                  <p>{card.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="em__panel" id="contact" aria-labelledby="em-contact">
          <div className="em__panel-head">
            <h2 id="em-contact">Contact channel</h2>
          </div>
          <div className="em__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="em__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="em__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="em__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
