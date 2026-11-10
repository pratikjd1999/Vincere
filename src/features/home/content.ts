/**
 * Home-page copy that is not part of the shared approved company content.
 *
 * DRAFT COPY — awaiting approval. It describes how the company works and answers
 * common questions using only facts already approved in `docs/product-requirements.md`.
 * It contains no project, client, metric, award, certificate or timeline claim.
 */

export type ProcessStep = {
  readonly id: string
  readonly index: string
  readonly name: string
  readonly summary: string
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'discover',
    index: '01',
    name: 'Discover',
    summary:
      'We start with your requirements, users and constraints, including any procurement and documentation rules that apply.',
  },
  {
    id: 'design',
    index: '02',
    name: 'Design',
    summary: 'Interfaces and system structure are planned around accessibility, usability and long-term maintainability.',
  },
  {
    id: 'build',
    index: '03',
    name: 'Build',
    summary: 'Websites, applications and platforms are developed and tested against the agreed requirements.',
  },
  {
    id: 'secure',
    index: '04',
    name: 'Secure and launch',
    summary: 'Security review and hardening are applied before release, then the system is deployed to its live environment.',
  },
  {
    id: 'support',
    index: '05',
    name: 'Maintain and support',
    summary: 'Updates, monitoring and support continue after go-live so the system stays dependable.',
  },
] as const

export type FaqItem = {
  readonly id: string
  readonly question: string
  readonly answer: string
}

export const faqs: readonly FaqItem[] = [
  {
    id: 'what',
    question: 'What does Vincere Corp do?',
    answer:
      'Vincere Corp Private Limited is an IT company based in Pune, Maharashtra. We undertake government tenders and private technology and software projects.',
  },
  {
    id: 'government',
    question: 'Do you work on government tenders?',
    answer:
      'Yes. Government tender solutions are one of our service areas, covering software delivery aligned to public-sector procurement, documentation and compliance processes.',
  },
  {
    id: 'services',
    question: 'Which services do you offer?',
    answer:
      'Websites, web applications, mobile applications, government tender solutions, UI/UX design, cloud solutions, AI automation, cybersecurity, and maintenance and support.',
  },
  {
    id: 'start',
    question: 'How do I start a project with you?',
    answer:
      'Email or call us with a short description of what you need. The contact details are in the Contact section below.',
  },
  {
    id: 'credentials',
    question: 'Can I see your certifications and registrations?',
    answer:
      'Credential details are available on request. Please get in touch and we will share what is appropriate for your procurement or due-diligence process.',
  },
] as const
