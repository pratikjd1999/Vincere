import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import './mono-brutal.css'

/**
 * Direction 12 — Monochrome Register.
 * Basis: Minimalist Monochrome. Pure black and white, zero radius, no shadows,
 * inverted section bands. State changes are instant by design — there is no
 * scroll animation here at all, so this direction is identical with reduced motion.
 */
export default function MonoBrutal() {
  return (
    <div className="mb" data-tpl="mono-brutal">
      <header className="mb__header">
        <span className="mb__mark">{company.wordmark}</span>
        <nav className="mb__nav" aria-label="Primary">
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
        <section className="mb__hero" aria-labelledby="mb-hero">
          <h1 id="mb-hero">{company.primaryMessage}</h1>
          <div className="mb__hero-meta">
            <p>{company.summary}</p>
            <a className="mb__cta" href="#services">
              {company.capabilityCta}
            </a>
          </div>
        </section>

        <section className="mb__band" aria-label="Brand statement">
          <p>{company.secondaryMessage}</p>
        </section>

        <section className="mb__section" id="services" aria-labelledby="mb-services">
          <h2 id="mb-services">Services — Register</h2>
          <table className="mb__table">
            <caption className="visually-hidden">Service areas offered by Vincere Corp</caption>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Service area</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.index}</td>
                  <th scope="row">{service.name}</th>
                  <td>{service.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb__section mb__section--invert" id="industries" aria-labelledby="mb-industries">
          <h2 id="mb-industries">Industries — Register</h2>
          <table className="mb__table">
            <caption className="visually-hidden">Sectors served by Vincere Corp</caption>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Sector</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry) => (
                <tr key={industry.id}>
                  <td>{industry.index}</td>
                  <th scope="row">{industry.name}</th>
                  <td>{industry.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb__section" id="about" aria-labelledby="mb-about">
          <h2 id="mb-about">Who we are</h2>
          <div className="mb__prose">
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance. Documentation and tests
              ship with the system, not after it.
            </p>
          </div>
        </section>

        <section className="mb__section" id="certifications" aria-labelledby="mb-cert">
          <h2 id="mb-cert">Certifications &amp; compliance</h2>
          <ul className="mb__records">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb__section mb__section--invert" id="contact" aria-labelledby="mb-contact">
          <h2 id="mb-contact">Contact</h2>
          <div className="mb__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="mb__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="mb__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} — <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mb__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
