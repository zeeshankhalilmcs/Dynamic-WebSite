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
  monthlyPrice?: number
  yearlyPrice?: number
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
  heroTitle: 'Choose the Right Retail POS Plan for Your Business',
  heroSubtitle: 'From Fast-Moving teams getting started to complex Multi-Branch operations, Our Plans are structured to support real business momentum with clarity and confidence.',
  heroCtaLabel: 'Book a Consultation',
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
      highlights: ['Ideal for new Operations'],
      monthlyPrice: 9450,
      yearlyPrice: 104040,
      detailTitle: 'What you get',
      details: ['One-time Onboarding Guidance', 'Essential Reporting and Workflow visibility', 'Straightforward support for Growing teams'],
    },
    {
      id: 'momentum',
      name: 'Momentum',
      price: 'PKR 19,450',
      period: '/ mo',
      description: 'For Growing Organizations that need stronger automation, broader support, and more intelligent operations.',
      ctaLabel: 'Talk to sales',
      ctaHref: '/contact',
      featured: true,
      badge: 'Most popular',
      features: ['Everything in LaunchPad', 'AI virtual assistance', 'Branch extensibility'],
      highlights: ['Designed for Growth'],
      monthlyPrice: 19450,
      yearlyPrice: 210060,
      detailTitle: 'Built for Momentum',
      details: ['Automated follow-up and inbox support', 'Virtual assistance for common requests', 'Flexible Branch expansion and Guidance'],
    },
    {
      id: 'elite-pro',
      name: 'Elite Pro',
      price: 'PKR 29,450',
      period: '/ mo',
      description: 'A Premium Tier for Businesses that want deeper support, advanced AI workflows, and stronger Operational visibility.',
      ctaLabel: 'Request a Demo',
      ctaHref: '/contact',
      features: ['Everything in Momentum', 'Advanced AI assistance', 'Premium support', 'Expanded Reporting', 'Priority Implementation Guidance'],
      highlights: ['Best for Multi-Branch Growth'],
      monthlyPrice: 29450,
      yearlyPrice: 299760,
      detailTitle: 'Why Teams Upgrade',
      details: ['Deeper automation and faster response handling', 'Enhanced Reporting and Implementation attention', 'Premium support for Demanding Daily Operations'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored for Multi-Branch, Complex, or High-volume Organizations that need strategic support and custom delivery.',
      ctaLabel: 'Contact our Team',
      ctaHref: '/contact',
      features: ['Custom scope', 'Dedicated Rollout support', 'Tailored Integrations', 'Security and Governance planning', 'Custom Account Strategy'],
      highlights: ['Best for large-scale operations'],
      detailTitle: 'Enterprise Support',
      details: ['Strategic Rollout and Transformation planning', 'Custom Integration and Governance Design', 'Dedicated support for complex Multi-Site Operations'],
    },
  ],
  comparisonTitle: 'A plan for every Stage of Growth',
  comparisonFeatures: [
    { name: 'Core setup', values: ['Included', 'Included', 'Included', 'Custom'] },
    { name: 'AI assistance', values: ['-', 'Basic', 'Advanced', 'Custom'] },
    { name: 'Branch Support', values: ['Single', 'Expandable', 'Expandable', 'Multi-branch'] },
    { name: 'Support Model', values: ['Standard', 'Expanded', 'Priority', 'Dedicated'] },
    { name: 'Dedicated Account Manager', values: ['-', '-', 'Included', 'Custom'] },
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
