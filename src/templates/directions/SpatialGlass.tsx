import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { gsap, useGsap, usePointerParallax } from '../../lib/motion'
import './spatial-glass.css'

/**
 * Direction 07 — Spatial Panels.
 * Basis: Spatial UI (VisionOS). Frosted panels suspended at different depths that
 * respond to the pointer. Parallax is skipped on coarse pointers and reduced motion.
 */
export default function SpatialGlass() {
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  usePointerParallax(stage)

  useGsap(root, () => {
    gsap.from('[data-depth]', { opacity: 0, y: 34, scale: 0.97, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
    gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel) => {
      gsap.from(panel, {
        opacity: 0,
        y: 26,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: panel, start: 'top 88%' },
      })
    })
  })

  return (
    <div className="sp" ref={root} data-tpl="spatial-glass">
      <div className="sp__backdrop" aria-hidden />

      <header className="sp__header">
        <span className="sp__mark">{company.wordmark}</span>
        <nav className="sp__nav" aria-label="Primary">
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
        <section className="sp__stage" ref={stage} aria-labelledby="sp-hero">
          <div className="sp__layer sp__layer--back" data-depth aria-hidden />
          <div className="sp__layer sp__layer--mid" data-depth aria-hidden />
          <div className="sp__glass sp__glass--hero" data-depth>
            <p className="sp__eyebrow">{company.location}</p>
            <h1 id="sp-hero">{company.primaryMessage}</h1>
            <p className="sp__lede">{company.summary}</p>
            <a className="sp__cta" href="#services">
              {company.capabilityCta}
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
          <div className="sp__glass sp__glass--chip" data-depth>
            <span>{company.secondaryMessage}</span>
          </div>
        </section>

        <section className="sp__section" id="services" aria-labelledby="sp-services">
          <h2 id="sp-services">Capabilities</h2>
          <ul className="sp__panels">
            {services.map((service) => (
              <li className="sp__glass" key={service.id} data-panel>
                <span className="sp__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="sp__section" id="about" aria-labelledby="sp-about">
          <h2 id="sp-about">Who we are</h2>
          <div className="sp__glass sp__glass--wide" data-panel>
            <p>{company.summary}</p>
            <p>
              One team stays with a system from discovery through maintenance, so context is never
              lost at a hand-off.
            </p>
          </div>
        </section>

        <section className="sp__section" id="industries" aria-labelledby="sp-industries">
          <h2 id="sp-industries">Industries</h2>
          <ul className="sp__panels sp__panels--tight">
            {industries.map((industry) => (
              <li className="sp__glass" key={industry.id} data-panel>
                <span className="sp__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="sp__section" id="certifications" aria-labelledby="sp-cert">
          <h2 id="sp-cert">Certifications &amp; compliance</h2>
          <ul className="sp__panels sp__panels--tight">
            {complianceCards.map((card) => (
              <li className="sp__glass" key={card.id} data-panel>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="sp__section" id="contact" aria-labelledby="sp-contact">
          <h2 id="sp-contact">Contact</h2>
          <div className="sp__glass sp__glass--wide sp__contact" data-panel>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="sp__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="sp__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="sp__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
