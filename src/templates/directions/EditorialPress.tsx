import { useRef } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap } from '../../lib/motion'
import './editorial-press.css'

/**
 * Direction 08 — Editorial Press.
 * Basis: Editorial Grid / Magazine. Masthead, drop cap, column rules and figure
 * captions. Reads as a considered publication rather than a sales page.
 */
export default function EditorialPress() {
  const root = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    gsap.from('[data-lede]', { opacity: 0, y: 22, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
    gsap.utils.toArray<HTMLElement>('[data-article]').forEach((article) => {
      gsap.from(article, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: article, start: 'top 90%' },
      })
    })
    gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((rule) => {
      gsap.from(rule, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: rule, start: 'top 92%' },
      })
    })
  })

  return (
    <div className="ed" ref={root} data-tpl="editorial-press">
      <header className="ed__masthead">
        <p className="ed__dateline">{company.location} · Established practice</p>
        <a className="ed__title-mark" href="#main">
          {company.wordmark}
        </a>
        <nav className="ed__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="ed__main">
        <article className="ed__feature" aria-labelledby="ed-hero">
          <p className="ed__kicker" data-lede>
            The practice
          </p>
          <h1 className="ed__headline" id="ed-hero" data-lede>
            {company.primaryMessage}
          </h1>
          <p className="ed__standfirst" data-lede>
            {company.secondaryMessage}
          </p>
          <hr className="ed__rule" data-draw />
          <div className="ed__columns">
            <p className="ed__dropcap">{company.summary}</p>
            <p>
              The practice is organised around nine service areas and five sectors. One accountable
              team carries a project from discovery through to maintenance, so the people who design
              a system remain the people who support it.
            </p>
            <p>
              Work is scoped to be maintainable after handover: documented, tested and built on a
              stack the client can continue to staff.
            </p>
          </div>
          <a className="ed__cta" href="#services">
            {company.capabilityCta} →
          </a>
        </article>

        <hr className="ed__rule" data-draw />

        <section className="ed__section" id="services" aria-labelledby="ed-services">
          <h2 className="ed__section-title" id="ed-services">
            Services
          </h2>
          <div className="ed__index">
            {services.map((service) => (
              <article key={service.id} data-article>
                <p className="ed__folio">{service.index}</p>
                <h3>{service.name}</h3>
                <p className="ed__body">{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <hr className="ed__rule" data-draw />

        <section className="ed__section ed__section--two" id="industries" aria-labelledby="ed-industries">
          <h2 className="ed__section-title" id="ed-industries">
            Industries
          </h2>
          <div className="ed__list">
            {industries.map((industry) => (
              <article key={industry.id} data-article>
                <h3>
                  <span className="ed__folio">{industry.index}</span> {industry.name}
                </h3>
                <p className="ed__body">{industry.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <hr className="ed__rule" data-draw />

        <section className="ed__section" id="certifications" aria-labelledby="ed-cert">
          <h2 className="ed__section-title" id="ed-cert">
            Certifications &amp; compliance
          </h2>
          <figure className="ed__figure">
            <div className="ed__plate">
              {complianceCards.map((card) => (
                <div key={card.id} data-article>
                  <h3>{card.label}</h3>
                  <p>{card.note}</p>
                </div>
              ))}
            </div>
            <figcaption>
              Records are held privately and shared through the appropriate channel on request.
            </figcaption>
          </figure>
        </section>

        <hr className="ed__rule" data-draw />

        <section className="ed__section ed__section--two" id="about" aria-labelledby="ed-about">
          <h2 className="ed__section-title" id="ed-about">
            Who we are
          </h2>
          <div className="ed__columns" data-article>
            <p>{company.summary}</p>
            <p>
              The team works to published accessibility and performance standards rather than to a
              private definition of quality.
            </p>
          </div>
        </section>

        <hr className="ed__rule" data-draw />

        <section className="ed__section ed__section--two" id="contact" aria-labelledby="ed-contact">
          <h2 className="ed__section-title" id="ed-contact">
            Contact
          </h2>
          <div className="ed__contact" data-article>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </p>
            <ul className="ed__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="ed__colophon">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
