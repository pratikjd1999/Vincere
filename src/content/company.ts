/**
 * Single source of truth for approved, publishable company content.
 *
 * Every string here is traceable to `docs/product-requirements.md`. Nothing in this
 * file may describe a project, client, award, metric, testimonial, or certificate.
 * Service and industry copy describes *capability offered*, never work delivered.
 */

export const company = {
  legalName: 'Vincere Corp Private Limited',
  wordmark: 'VINCERE CORP',
  location: 'Pune, Maharashtra',
  primaryMessage: 'Modern digital solutions',
  secondaryMessage: 'Build the future digitally',
  capabilityCta: 'Check what we can do',
  summary:
    'Vincere Corp Private Limited is an IT company based in Pune, Maharashtra, undertaking government tenders and private technology and software projects.',
} as const

export type Service = {
  readonly id: string
  readonly name: string
  readonly summary: string
  /** Two-digit index used by the numbered/editorial layouts. */
  readonly index: string
  /**
   * Descriptive grouping of the approved service list — a classification of what is
   * already listed above, not an additional claim about the company.
   */
  readonly category: 'Build' | 'Design' | 'Platform' | 'Delivery' | 'Assurance' | 'Support'
}

export const services: readonly Service[] = [
  {
    id: 'websites',
    name: 'Websites',
    summary: 'Responsive, accessible corporate and informational websites built to load fast and rank well.',
    index: '01',
    category: 'Build',
  },
  {
    id: 'web-applications',
    name: 'Web applications',
    summary: 'Browser-based systems and portals with structured data, roles, and reporting.',
    index: '02',
    category: 'Build',
  },
  {
    id: 'mobile-applications',
    name: 'Mobile applications',
    summary: 'Android and iOS applications designed for reliability on everyday devices and networks.',
    index: '03',
    category: 'Build',
  },
  {
    id: 'government-tender-solutions',
    name: 'Government tender solutions',
    summary: 'Software delivery aligned to public-sector procurement, documentation, and compliance processes.',
    index: '04',
    category: 'Delivery',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX design',
    summary: 'Interface and experience design grounded in accessibility standards and usability testing.',
    index: '05',
    category: 'Design',
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud solutions',
    summary: 'Cloud architecture, migration, and deployment automation for scalable, observable systems.',
    index: '06',
    category: 'Platform',
  },
  {
    id: 'ai-automation',
    name: 'AI automation',
    summary: 'Workflow automation and applied AI integrated into existing operational processes.',
    index: '07',
    category: 'Platform',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    summary: 'Security review, hardening, and monitoring practices applied across the delivery lifecycle.',
    index: '08',
    category: 'Assurance',
  },
  {
    id: 'maintenance-support',
    name: 'Maintenance and support',
    summary: 'Ongoing updates, monitoring, and support arrangements after a system goes live.',
    index: '09',
    category: 'Support',
  },
] as const

export type Industry = {
  readonly id: string
  readonly name: string
  readonly summary: string
  readonly index: string
}

export const industries: readonly Industry[] = [
  {
    id: 'government',
    name: 'Government & Public Sector',
    summary: 'Citizen-facing services and departmental systems delivered under public procurement requirements.',
    index: '01',
  },
  {
    id: 'smb',
    name: 'Small and Medium Businesses',
    summary: 'Practical digital foundations for organisations modernising their operations.',
    index: '02',
  },
  {
    id: 'startups',
    name: 'Startups',
    summary: 'Early product builds that stay maintainable as requirements change.',
    index: '03',
  },
  {
    id: 'education',
    name: 'Education',
    summary: 'Learning and administrative platforms for institutions and training providers.',
    index: '04',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    summary: 'Systems built with care for data sensitivity, accessibility, and continuity.',
    index: '05',
  },
] as const

/**
 * Deliberately neutral compliance placeholders.
 *
 * These must never name, imply, or visually suggest a certificate, registration, or
 * approval. Labels stay generic until `docs/product-requirements.md` approves specifics.
 */
export type ComplianceCard = {
  readonly id: string
  readonly label: string
  readonly note: string
}

export const complianceCards: readonly ComplianceCard[] = [
  { id: 'c1', label: 'Company registration', note: 'Credential details available on request' },
  { id: 'c2', label: 'Tax and statutory records', note: 'Credential details available on request' },
  { id: 'c3', label: 'Procurement documentation', note: 'Credential details available on request' },
  { id: 'c4', label: 'Quality and process records', note: 'Credential details available on request' },
  { id: 'c5', label: 'Information security practices', note: 'Credential details available on request' },
] as const

export const contact = {
  addressLines: ['103, Adiamville, Gaikwad Nagar', 'Punawale, Pune', 'Maharashtra 411033, India'],
  addressInline: '103, Adiamville, Gaikwad Nagar, Punawale, Pune, Maharashtra 411033, India',
  email: 'pratik.vincere@gmail.com',
  phone: '+91 82752 57475',
  phoneHref: '+918275257475',
} as const

/** Profile URLs are pending approval, so these are labels only — never links. */
export const socialChannels = ['LinkedIn', 'X', 'Instagram', 'YouTube'] as const

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const
