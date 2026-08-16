import SolutionPageLayout from '../components/SolutionPageLayout'

const features = [
  {
    title: 'Fast and reliable retail operations',
    description: 'Support quick checkout, inventory control, and branch-level visibility so daily retail operations stay smooth under pressure.',
  },
  {
    title: 'Multi-branch management',
    description: 'Monitor pricing, stock movement, performance, and team activity across branches from one connected operating system.',
  },
  {
    title: 'Promotions and customer engagement',
    description: 'Create promotions, manage loyalty, and improve repeat buying behavior with a more connected sales experience.',
  },
  {
    title: 'Executive reporting',
    description: 'Turn daily sales and stock data into practical insight for store managers, owners, and leadership teams.',
  },
  {
    title: 'Inventory discipline',
    description: 'Keep replenishment, stock accuracy, and movement tracking consistent so shelves and back-room operations stay aligned.',
  },
  {
    title: 'Flexible retail workflows',
    description: 'Support supermarkets, pharmacies, convenience marts, and hybrid retail environments with adaptable workflows and controls.',
  },
]

const benefits = [
  {
    title: 'Reduce friction at checkout',
    description: 'Speed up transactions and keep queues moving with a more structured and dependable retail flow.',
  },
  {
    title: 'Stay in control of stock',
    description: 'Track inventory movement, shrinkage, and replenishment with greater confidence and clarity.',
  },
  {
    title: 'Grow without losing consistency',
    description: 'Scale operations across locations while preserving a stronger standard of reporting and customer service.',
  },
]

const modules = [
  'Billing and POS workflow',
  'Inventory and stock planning',
  'Branch performance reporting',
  'Promotions and customer engagement',
]

export default function MartRetailSoftwarePage() {
  return (
    <SolutionPageLayout
      eyebrow="Retail technology"
      title="Mart / Retail Software"
      subtitle="A modern retail platform for marts, supermarkets, pharmacies, and growing multi-store businesses that need stable operations and stronger control."
      heroBullets={[
        'Fast billing, stock control, and branch coordination',
        'Clear dashboards for sales, profit, and inventory movement',
        'Flexible workflows for retail growth and customer retention',
      ]}
      features={features}
      benefits={benefits}
      ctaLabel="Discuss your retail needs"
      ctaHref="/contact"
      extraContent={
        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Retail focus areas</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Made for businesses that need dependable retail operations every day.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">From single-location marts to multi-branch retail networks, the platform supports faster transactions, better control, and clearer reporting.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  )
}
