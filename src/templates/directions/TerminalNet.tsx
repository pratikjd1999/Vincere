import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { useReducedMotion, useTypedText } from '../../lib/motion'
import './terminal-net.css'

/**
 * Direction 14 — Terminal Brief.
 * Basis: Terminal CLI. A command-line briefing with typewriter output and a blinking
 * cursor. Light theme renders a paper-terminal variant rather than dropping the idea.
 */
const COMMAND = `vincere --brief --location "${company.location}"`

export default function TerminalNet() {
  const reduced = useReducedMotion()
  const typed = useTypedText(COMMAND, !reduced, 45)

  return (
    <div className="tn" data-tpl="terminal-net">
      <div className="tn__scanlines" aria-hidden />

      <header className="tn__header">
        <span className="tn__mark">{company.wordmark}</span>
        <nav className="tn__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>./{link.label.toLowerCase()}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="tn__main">
        <section className="tn__block" aria-labelledby="tn-hero">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span>{' '}
            <span className="visually-hidden">{COMMAND}</span>
            <span aria-hidden>{typed}</span>
            <span className="tn__cursor" aria-hidden />
          </p>

          <pre className="tn__ascii" aria-hidden>
{`
 ██  ██  ██  ██  ██  ██  ██
 ▀▀  ▀▀  ▀▀  ▀▀  ▀▀  ▀▀  ▀▀
`}
          </pre>

          <h1 className="tn__title" id="tn-hero">
            {company.primaryMessage}
          </h1>
          <p className="tn__out">{company.summary}</p>
          <p className="tn__out tn__out--dim">// {company.secondaryMessage}</p>
          <a className="tn__cta" href="#services">
            &gt; {company.capabilityCta}
          </a>
        </section>

        <section className="tn__block" id="services" aria-labelledby="tn-services">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span> ls ./services
          </p>
          <h2 className="visually-hidden" id="tn-services">
            Services
          </h2>
          <ul className="tn__ls">
            {services.map((service) => (
              <li key={service.id}>
                <span className="tn__idx">{service.index}</span>
                <span className="tn__name">{service.name}</span>
                <span className="tn__desc">{service.summary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tn__block" id="industries" aria-labelledby="tn-industries">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span> ls ./sectors
          </p>
          <h2 className="visually-hidden" id="tn-industries">
            Industries
          </h2>
          <ul className="tn__ls">
            {industries.map((industry) => (
              <li key={industry.id}>
                <span className="tn__idx">{industry.index}</span>
                <span className="tn__name">{industry.name}</span>
                <span className="tn__desc">{industry.summary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tn__block" id="about" aria-labelledby="tn-about">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span> cat ./about.txt
          </p>
          <h2 className="visually-hidden" id="tn-about">
            Who we are
          </h2>
          <p className="tn__out">{company.summary}</p>
          <p className="tn__out">
            One accountable team runs discovery, delivery and maintenance. Documentation and tests
            ship with the system.
          </p>
        </section>

        <section className="tn__block" id="certifications" aria-labelledby="tn-cert">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span> status --compliance
          </p>
          <h2 className="visually-hidden" id="tn-cert">
            Certifications and compliance
          </h2>
          <ul className="tn__status">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <span className="tn__ok">[ ON REQUEST ]</span>
                <span className="tn__name">{card.label}</span>
                <span className="tn__desc">{card.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tn__block" id="contact" aria-labelledby="tn-contact">
          <p className="tn__line">
            <span className="tn__prompt">visitor@vincere:~$</span> cat ./contact.txt
          </p>
          <h2 className="visually-hidden" id="tn-contact">
            Contact
          </h2>
          <address className="tn__addr">
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <p className="tn__out">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p className="tn__out">
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          </p>
          <ul className="tn__social">
            {socialChannels.map((channel) => (
              <li key={channel}>
                {channel.toLowerCase()} <span>[coming soon]</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="tn__line tn__line--end">
          <span className="tn__prompt">visitor@vincere:~$</span>
          <span className="tn__cursor" aria-hidden />
        </p>
      </main>

      <footer className="tn__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
