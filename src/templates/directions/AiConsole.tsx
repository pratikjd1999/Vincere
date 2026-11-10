import { CornerDownLeft, Sparkles } from 'lucide-react'
import { company, complianceCards, contact, industries, navLinks, services, socialChannels } from '../../content/company'
import { useReducedMotion, useTypedText } from '../../lib/motion'
import './ai-console.css'

/**
 * Direction 10 — Assistant Console.
 * Basis: AI-Native UI. The homepage is framed as a brief being answered: a prompt,
 * a typing indicator, then a streamed response that resolves into context cards.
 *
 * The "stream" is a scripted presentation of approved copy, not a model call, and the
 * full text is always present for assistive tech via an aria-live-free static node.
 */
const RESPONSE = `${company.summary} The practice covers nine service areas across five sectors, with one accountable team from discovery through maintenance.`

export default function AiConsole() {
  const reduced = useReducedMotion()
  // ~36 characters per second, frame-rate independent.
  const shown = useTypedText(RESPONSE, !reduced, 28)
  const done = shown.length >= RESPONSE.length

  return (
    <div className="ac" data-tpl="ai-console">
      <header className="ac__header">
        <span className="ac__mark">{company.wordmark}</span>
        <nav className="ac__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="ac__main">
        <section className="ac__thread" aria-labelledby="ac-hero">
          <h1 className="visually-hidden" id="ac-hero">
            {company.primaryMessage}
          </h1>

          <div className="ac__prompt">
            <span className="ac__role">Brief</span>
            <p>What can Vincere Corp deliver?</p>
          </div>

          <div className="ac__answer">
            <span className="ac__avatar" aria-hidden>
              <Sparkles size={16} />
            </span>
            <div className="ac__answer-body">
              <p className="ac__headline">{company.primaryMessage}</p>
              {/* Screen readers get the complete text; the visual node streams it. */}
              <p className="visually-hidden">{RESPONSE}</p>
              <p className="ac__stream" aria-hidden>
                {shown}
                {!done ? <span className="ac__caret" /> : null}
              </p>
              {!done && shown.length === 0 ? (
                <span className="ac__typing" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              ) : null}
            </div>
          </div>

          <div className="ac__chips" id="services">
            <p className="ac__chips-label">Capabilities in scope</p>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <span className="ac__chip-num">{service.index}</span>
                  <h2>{service.name}</h2>
                  <p>{service.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ac__prompt">
            <span className="ac__role">Follow-up</span>
            <p>Which sectors do you work with?</p>
          </div>

          <div className="ac__answer" id="industries">
            <span className="ac__avatar" aria-hidden>
              <Sparkles size={16} />
            </span>
            <div className="ac__answer-body">
              <ul className="ac__context">
                {industries.map((industry) => (
                  <li key={industry.id}>
                    <h2>{industry.name}</h2>
                    <p>{industry.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ac__prompt" id="certifications">
            <span className="ac__role">Follow-up</span>
            <p>What compliance records exist?</p>
          </div>

          <div className="ac__answer">
            <span className="ac__avatar" aria-hidden>
              <Sparkles size={16} />
            </span>
            <div className="ac__answer-body">
              <ul className="ac__context ac__context--compact">
                {complianceCards.map((card) => (
                  <li key={card.id}>
                    <h2>{card.label}</h2>
                    <p>{card.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ac__answer" id="about">
            <span className="ac__avatar" aria-hidden>
              <Sparkles size={16} />
            </span>
            <div className="ac__answer-body">
              <h2 className="ac__sub">Who we are</h2>
              <p className="ac__para">{company.summary}</p>
              <p className="ac__para">{company.secondaryMessage}</p>
            </div>
          </div>

          <div className="ac__answer" id="contact">
            <span className="ac__avatar" aria-hidden>
              <Sparkles size={16} />
            </span>
            <div className="ac__answer-body">
              <h2 className="ac__sub">Contact</h2>
              <address>
                {contact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className="ac__links">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </p>
              <ul className="ac__social">
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

      {/* Composer is presentational: there is no backend, so it never pretends to submit. */}
      <div className="ac__composer">
        <div className="ac__composer-inner">
          <p className="ac__composer-text">
            <a href="#services">{company.capabilityCta}</a>
          </p>
          <span className="ac__composer-hint" aria-hidden>
            <CornerDownLeft size={14} />
          </span>
        </div>
        <p className="ac__composer-note">
          This prototype has no backend — messaging is not enabled. Use the email or phone above.
        </p>
      </div>
    </div>
  )
}
