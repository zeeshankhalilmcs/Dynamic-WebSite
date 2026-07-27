export type PricingPlan = {
  id: string
  name: string
  price: string
  period: string
  description: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  badge?: string
  features: string[]
  highlights?: string[]
  details?: string[]
  detailTitle?: string
}

export type PricingFaq = {
  question: string
  answer: string
}

export type PricingPageContent = {
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroCtaHref: string
  plans: PricingPlan[]
  comparisonTitle: string
  comparisonFeatures: Array<{ name: string; values: string[] }>
  faqTitle: string
  faqs: PricingFaq[]
}

export const defaultPricingPageContent: PricingPageContent = {
  heroTitle: 'Choose the plan that fits your growth stage',
  heroSubtitle: 'From fast-moving teams getting started to complex multi-branch operations, our plans are structured to support real business momentum with clarity and confidence.',
  heroCtaLabel: 'Book a consultation',
  heroCtaHref: '/contact',
  plans: [
    {
      id: 'launchpad',
      name: 'LaunchPad',
      price: 'PKR 9,450',
      period: '/ mo',
      description: 'A practical starting point for teams that need dependable digital workflows without unnecessary complexity.',
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      features: ['Core workflow setup', 'Standard support', 'Operational reporting'],
      highlights: ['Best for early-stage growth'],
      detailTitle: 'What you get',
      details: ['One-time onboarding guidance', 'Essential reporting and workflow visibility', 'Straightforward support for growing teams'],
    },
    {
      id: 'momentum',
      name: 'Momentum',
      price: 'PKR 19,450',
      period: '/ mo',
      description: 'For growing organizations that need stronger automation, broader support, and more intelligent operations.',
      ctaLabel: 'Talk to sales',
      ctaHref: '/contact',
      featured: true,
      badge: 'Most popular',
      features: ['Everything in LaunchPad', 'AI virtual assistance', 'Branch extensibility'],
      highlights: ['Ideal for scaling teams'],
      detailTitle: 'Built for momentum',
      details: ['Automated follow-up and inbox support', 'Virtual assistance for common requests', 'Flexible branch expansion and guidance'],
    },
    {
      id: 'elite-pro',
      name: 'Elite Pro',
      price: 'PKR 29,450',
      period: '/ mo',
      description: 'A premium tier for businesses that want deeper support, advanced AI workflows, and stronger operational visibility.',
      ctaLabel: 'Request a demo',
      ctaHref: '/contact',
      features: ['Everything in Momentum', 'Advanced AI assistance', 'Premium onboarding support', 'Expanded reporting', 'Priority implementation guidance'],
      highlights: ['Built for high-performance operations'],
      detailTitle: 'Why teams upgrade',
      details: ['Deeper automation and faster response handling', 'Enhanced reporting and implementation attention', 'Premium support for demanding daily operations'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored for multi-branch, complex, or high-volume organizations that need strategic support and custom delivery.',
      ctaLabel: 'Contact our team',
      ctaHref: '/contact',
      features: ['Custom scope', 'Dedicated rollout support', 'Tailored integrations', 'Security and governance planning', 'Custom account strategy'],
      highlights: ['Best for large-scale operations'],
      detailTitle: 'Enterprise support',
      details: ['Strategic rollout and transformation planning', 'Custom integration and governance design', 'Dedicated support for complex multi-site operations'],
    },
  ],
  comparisonTitle: 'A plan for every stage of growth',
  comparisonFeatures: [
    { name: 'Core setup', values: ['Included', 'Included', 'Included', 'Custom'] },
    { name: 'AI assistance', values: ['Basic', 'Advanced', 'Advanced', 'Custom'] },
    { name: 'Branch support', values: ['Single', 'Expandable', 'Expandable', 'Multi-branch'] },
    { name: 'Support model', values: ['Standard', 'Expanded', 'Priority', 'Dedicated'] },
  ],
  faqTitle: 'Common questions',
  faqs: [
    {
      question: 'Can I upgrade later?',
      answer: 'Yes. We can help you move to a higher tier as your operations expand and your process requirements become more advanced.',
    },
    {
      question: 'Is implementation support included?',
      answer: 'Each plan includes a baseline implementation approach, and higher tiers receive more hands-on rollout guidance.',
    },
    {
      question: 'Do you tailor the solution for multi-branch teams?',
      answer: 'Yes. Enterprise engagements are shaped around your branch structure, reporting needs, and operational complexity.',
    },
  ],
}

export interface IPricingRepository {
  getPageContent(): Promise<PricingPageContent>
  savePageContent(content: PricingPageContent): Promise<PricingPageContent>
}
