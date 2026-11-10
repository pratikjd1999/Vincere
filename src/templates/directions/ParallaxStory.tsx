import { useRef } from 'react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, useReducedMotion } from '../../lib/motion'
import './parallax-story.css'

/**
 * Direction 11 — Scroll Narrative.
 * Basis: Parallax Storytelling. One pinned section scrubs a horizontal track of the
 * nine capabilities. With reduced motion the track becomes an ordinary scrollable row.
 */
export default function ParallaxStory() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGsap(root, () => {
    const track = root.current?.querySelector<HTMLElement>('[data-track]')
    const pinSection = root.current?.querySelector<HTMLElement>('[data-pin]')
    if (track && pinSection) {
      const distance = () => track.scrollWidth - track.clientWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }

    gsap.from('[data-chapter]', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
    })

    gsap.utils.toArray<HTMLElement>('[data-depth-bg]').forEach((layer, i) => {
      gsap.to(layer, {
        yPercent: -12 * (i + 1),
        ease: 'none',
        scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <div className="ps" ref={root} data-tpl="parallax-story">
      <header className="ps__header">
        <span className="ps__mark">{company.wordmark}</span>
        <nav className="ps__nav" aria-label="Primary">
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
        <section className="ps__opening" aria-labelledby="ps-hero">
          <span className="ps__bg ps__bg--1" data-depth-bg aria-hidden />
          <span className="ps__bg ps__bg--2" data-depth-bg aria-hidden />
          <p className="ps__chapter-label" data-chapter>
            Chapter 01
          </p>
          <h1 id="ps-hero" data-chapter>
            {company.primaryMessage}
          </h1>
          <p className="ps__lede" data-chapter>
            {company.summary}
          </p>
          <a className="ps__cta" href="#services" data-chapter>
            {company.capabilityCta}
          </a>
          <p className="ps__scroll-hint" data-chapter aria-hidden>
            Scroll
          </p>
        </section>

        <section className="ps__pin" data-pin id="services" aria-labelledby="ps-services">
          <div className="ps__pin-head">
            <p className="ps__chapter-label">Chapter 02</p>
            <h2 id="ps-services">Nine capabilities</h2>
          </div>
          <div className={`ps__track-wrap${reduced ? ' ps__track-wrap--scroll' : ''}`}>
            <ol className="ps__track" data-track>
              {services.map((service) => (
                <li key={service.id}>
                  <span className="ps__num">{service.index}</span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ps__chapter" id="about" aria-labelledby="ps-about">
          <span className="ps__bg ps__bg--3" data-depth-bg aria-hidden />
          <p className="ps__chapter-label">Chapter 03</p>
          <h2 id="ps-about">Who we are</h2>
          <p className="ps__body">{company.summary}</p>
          <p className="ps__body">
            One accountable team runs discovery, delivery and maintenance — the people who design a
            system stay with it.
          </p>
          <p className="ps__pull">{company.secondaryMessage}</p>
        </section>

        <section className="ps__chapter" id="industries" aria-labelledby="ps-industries">
          <p className="ps__chapter-label">Chapter 04</p>
          <h2 id="ps-industries">Five sectors</h2>
          <ul className="ps__sectors">
            {industries.map((industry) => (
              <li key={industry.id}>
                <span className="ps__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ps__chapter" id="certifications" aria-labelledby="ps-cert">
          <p className="ps__chapter-label">Chapter 05</p>
          <h2 id="ps-cert">Compliance</h2>
          <ul className="ps__registry">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ps__chapter ps__chapter--end" id="contact" aria-labelledby="ps-contact">
          <p className="ps__chapter-label">Chapter 06</p>
          <h2 id="ps-contact">Contact</h2>
          <div className="ps__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="ps__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="ps__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="ps__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
