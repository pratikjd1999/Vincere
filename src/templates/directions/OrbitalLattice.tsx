import { Suspense, lazy, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { useReducedMotion } from '../../lib/motion'
import './orbital-lattice.css'

/**
 * Direction 17 — Orbital Lattice.
 * Basis: 3D Product Preview. A real-time WebGL lattice carries the hero, treated
 * strictly as progressive enhancement:
 *   - three.js is only fetched after a WebGL support probe succeeds
 *   - constrained devices (coarse pointer + low core count) keep the static composition
 *   - reduced motion renders a single frame instead of an animation loop
 *   - the CSS fallback is a complete composition, not an empty box
 */
const LatticeScene = lazy(() => import('./LatticeScene'))

function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isConstrainedDevice(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return coarse && cores <= 4
}

export default function OrbitalLattice() {
  const reduced = useReducedMotion()
  // Probed once in a lazy initialiser: the result cannot change for this page view.
  const [enable3d] = useState(() => supportsWebGl() && !isConstrainedDevice())

  return (
    <div className="ol" data-tpl="orbital-3d">
      <header className="ol__header">
        <span className="ol__mark">{company.wordmark}</span>
        <nav className="ol__nav" aria-label="Primary">
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
        <section className="ol__hero" aria-labelledby="ol-hero">
          <div className="ol__canvas" aria-hidden>
            {enable3d ? (
              <Suspense fallback={<div className="ol__static" />}>
                <LatticeScene spin={!reduced} />
              </Suspense>
            ) : (
              /* Static composition used whenever WebGL is unavailable or unwise. */
              <div className="ol__static">
                <span className="ol__ring ol__ring--1" />
                <span className="ol__ring ol__ring--2" />
                <span className="ol__ring ol__ring--3" />
                <span className="ol__core" />
              </div>
            )}
          </div>

          <div className="ol__hero-body">
            <p className="ol__eyebrow">{company.location}</p>
            <h1 id="ol-hero">{company.primaryMessage}</h1>
            <p className="ol__lede">{company.summary}</p>
            <a className="ol__cta" href="#services">
              {company.capabilityCta}
              <ArrowUpRight size={18} aria-hidden />
            </a>
            <p className="ol__note">
              {services.length} service areas · {industries.length} sectors ·{' '}
              {company.secondaryMessage}
            </p>
          </div>
        </section>

        <section className="ol__section" id="services" aria-labelledby="ol-services">
          <h2 id="ol-services">Capability nodes</h2>
          <ul className="ol__nodes">
            {services.map((service) => (
              <li key={service.id}>
                <span className="ol__node-dot" aria-hidden />
                <span className="ol__num">{service.index}</span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ol__section" id="about" aria-labelledby="ol-about">
          <h2 id="ol-about">Who we are</h2>
          <div className="ol__about">
            <p>{company.summary}</p>
            <p>
              One accountable team runs discovery, delivery and maintenance rather than passing a
              system between vendors.
            </p>
          </div>
        </section>

        <section className="ol__section" id="industries" aria-labelledby="ol-industries">
          <h2 id="ol-industries">Sectors</h2>
          <ul className="ol__grid">
            {industries.map((industry) => (
              <li key={industry.id}>
                <span className="ol__num">{industry.index}</span>
                <h3>{industry.name}</h3>
                <p>{industry.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ol__section" id="certifications" aria-labelledby="ol-cert">
          <h2 id="ol-cert">Compliance</h2>
          <ul className="ol__grid">
            {complianceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ol__section" id="contact" aria-labelledby="ol-contact">
          <h2 id="ol-contact">Contact</h2>
          <div className="ol__contact">
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <div className="ol__contact-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </div>
            <ul className="ol__social">
              {socialChannels.map((channel) => (
                <li key={channel}>
                  {channel} <span>Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="ol__footer">
        <span>{company.legalName}</span>
        <span>{company.location}</span>
      </footer>
    </div>
  )
}
