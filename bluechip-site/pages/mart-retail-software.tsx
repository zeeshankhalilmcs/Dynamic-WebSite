import SolutionPageLayout from '../components/SolutionPageLayout'

const counterFeatures = [
  {
    title: 'Fast and reliable checkout',
    description: 'Speed up transactions with quick billing, reduce queue friction, and keep operations smooth under peak pressure.',
  },
  {
    title: 'Inventory discipline in real time',
    description: 'Track stock updates at checkout, flag low inventory, and keep shelves and back-room operations aligned.',
  },
]

const branchesFeatures = [
  {
    title: 'Multi-branch visibility',
    description: 'Monitor pricing, stock movement, performance, and team activity across all locations from one connected system.',
  },
  {
    title: 'Executive dashboards & reporting',
    description: 'Turn daily sales and stock data into actionable insights for store managers, owners, and leadership teams.',
  },
]

const benefits = [
  {
    icon: '⚡',
    title: 'Reduce friction at checkout',
    description: 'Speed up transactions and keep queues moving with streamlined, dependable retail operations.',
  },
  {
    icon: '📦',
    title: 'Control inventory with confidence',
    description: 'Track movement, shrinkage, and replenishment across locations with complete clarity.',
  },
  {
    icon: '📈',
    title: 'Scale without losing control',
    description: 'Grow across locations while maintaining consistent reporting, standards, and customer service.',
  },
]

const modules = [
  { name: 'POS & Billing', icon: '🧾' },
  { name: 'Stock Management', icon: '📦' },
  { name: 'Branch Reports', icon: '📊' },
  { name: 'Customer Promotions', icon: '🎯' },
]

export default function MartRetailSoftwarePage() {
  return (
    <SolutionPageLayout
      eyebrow="Built for Retail"
      title="Every store, one system"
      subtitle="From checkout to insights. A modern retail platform for marts, supermarkets, pharmacies, and growing multi-store businesses that keep operations smooth and control tight."
      heroBullets={[
        'Fast billing that keeps queues moving',
        'Real-time stock visibility across all branches',
        'Clear dashboards for managers and owners',
      ]}
      counterFeatures={counterFeatures}
      branchesFeatures={branchesFeatures}
      benefits={benefits}
      modules={modules}
      ctaLabel="Discuss your retail needs"
      ctaHref="/contact"
    />
  )
}
