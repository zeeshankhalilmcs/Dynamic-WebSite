import SolutionPageLayout from '../components/SolutionPageLayout'

const features = [
  {
    title: 'Own the experience under your own brand',
    description: 'Launch digital products that feel like your own solution with custom branding, polished UI, and product-ready workflows.',
  },
  {
    title: 'Flexible software delivery',
    description: 'Build SaaS platforms, web applications, mobile tools, admin portals, and API-driven products with a clear delivery process.',
  },
  {
    title: 'Built for scale',
    description: 'Create systems that are secure, maintainable, and ready to grow as your product, team, and customer base expand.',
  },
  {
    title: 'A practical technology partner',
    description: 'Work with a team that handles planning, design, development, testing, deployment, and product support behind the scenes.',
  },
]

const benefits = [
  {
    title: 'Launch faster',
    description: 'Move from idea to market with a proven development approach instead of building every layer from scratch.',
  },
  {
    title: 'Keep full brand control',
    description: 'Deliver the final product under your company identity, customer experience, and market positioning.',
  },
  {
    title: 'Reduce delivery complexity',
    description: 'Avoid the overhead of building a large internal team while still receiving a polished, high-quality product.',
  },
]

export default function WhiteLabelBrandSoftwarePage() {
  return (
    <SolutionPageLayout
      eyebrow="White label technology"
      title="White Label Brand Software"
      subtitle="Create branded software products with a polished delivery process that helps your business launch faster and stay focused on growth."
      heroBullets={[
        'Custom SaaS, web, mobile, and admin portal development',
        'Branded experience under your own identity and product direction',
        'Flexible support for MVPs, full products, and product enhancement',
      ]}
      features={features}
      benefits={benefits}
      ctaLabel="Start a white-label project"
      ctaHref="/contact"
    />
  )
}
