import SolutionPageLayout from '../components/SolutionPageLayout'
import Clients from '../components/Clients'

const faqItems = [
  {
    question: 'What is Retail POS software?',
    answer:
      'Retail POS software is a business management system that helps stores process sales, track stock, manage pricing, and monitor daily store operations from one platform.',
  },
  {
    question: 'What are the benefits of POS software for Marts and supermarkets?',
    answer:
      'It helps reduce checkout delays, improve stock visibility, support faster invoicing, strengthen cash control, and give Managers clearer performance reports across the Whole Retail Operation.',
  },
  {
    question: 'Which POS software is best for grocery and retail businesses?',
    answer:
      'The best solution is one that supports fast sales processing, inventory accuracy, branch monitoring, customer loyalty, and easy reporting for daily operations and growth planning.',
  },
  {
    question: 'Can this system manage inventory across multiple locations?',
    answer:
      'Yes. Multi-store retail businesses can track stock movement, transfer inventory between branches, and compare branch-level performance from one centralized retail dashboard.',
  },
  {
    question: 'Does it support billing, stock control, and sales reporting in one system?',
    answer:
      'Yes. A complete retail POS setup brings billing, product management, stock tracking, and reporting together so store teams can operate more efficiently.',
  },
  {
    question: 'Is this suitable for growing retail businesses?',
    answer:
      'Absolutely. The system is designed for marts, supermarkets, and expanding retail networks that need better control, faster checkout, and clearer visibility across stores.',
  },
]

const counterFeatures = [
  {
    title: 'Cash Drawer Management',
    description: 'A modern POS software system makes cash drawer management easier by tracking float amounts, monitoring cash movements, and helping staff maintain accurate cash balance and daily reconciliation at the retail counter.',
  },
  {
    title: 'Receipt Printing',
    description: 'Print clear sales receipts, invoice copies, and transaction records instantly for customers and staff, supporting faster service, better recordkeeping, and smoother retail checkout workflows.',
  },
  {
    title: 'Sales Reports',
    description: 'Generate detailed sales reports for hour-by-hour performance, category trends, payment summaries, and cashier activity, allowing retailers to identify growth opportunities and improve operational decisions.',
  },
  {
    title: 'Counter Closing',
    description: 'Close the retail counter efficiently with end-of-day settlement, cash count validation, and reconciliation tools that simplify store closing procedures and reduce manual reporting errors.',
  },
  {
    title: 'Hold and Recall Transactions',
    description: 'Hold an active sale temporarily and recall it later without losing customer progress, supporting flexible service during peak hours and more efficient retail POS workflows.',
  },
  {
    title: 'Barcode Scanning',
    description: 'Use fast barcode scanning to speed up item entry, reduce manual errors, and improve checkout accuracy across supermarkets, marts, and stores with high transaction volumes.',
  },
  {
    title: 'Product Lookup',
    description: 'Find products quickly by barcode, SKU, name, or category so staff can complete sales faster, answer customer questions, and reduce time spent searching during checkout.',
  },
  {
    title: 'Returns and Refunds',
    description: 'Handle returns and refunds with accurate item tracking, reason codes, and secure approval controls that help retail teams protect margins while delivering a better customer experience.',
  },
  {
    title: 'Cashier Controls',
    description: 'Control cashier permissions, manage discounts, approve overrides, and monitor transaction activity to improve accountability and keep checkout operations consistent across your retail team.',
  },
  {
    title: 'POS Security',
    description: 'Protect retail transactions with secure POS security controls, role-based access, audit trails, and transaction monitoring that minimize fraud and support compliance in busy store environments.',
  },
]

const branchesFeatures = [
  {
    title: 'Stock Transfer Management',
    description: 'Manage stock transfers between branches and stores with faster approval workflows, inventory balancing, and real-time visibility that helps reduce delays and avoid stock shortages across your retail network.',
  },
  {
    title: 'Branch Inventory Visibility',
    description: 'Track inventory levels by branch in real time, monitor product availability, and improve store-level stock planning with a centralized retail inventory management system built for multi-location operations.',
  },
  {
    title: 'Central Pricing Control',
    description: 'Maintain consistent pricing across all branches with centralized price control, product rules, and promotional updates that support margin protection and brand-wide pricing accuracy.',
  },
  {
    title: 'Sales Comparison by Branch',
    description: 'Compare sales performance across stores and regions to identify top-performing locations, slow periods, and trends that help managers improve strategy, staffing, and store-level performance.',
  },
  {
    title: 'Stock Reconciliation',
    description: 'Reconcile stock movements, inventory adjustments, and branch-level counts with automated tracking tools that reduce mismatch risks and improve accuracy across your retail operations.',
  },
  {
    title: 'Purchase Order Tracking',
    description: 'Monitor purchase orders, supplier fulfillment, and receiving status centrally so branches can reorder accurately, avoid overstocking, and keep essential inventory flowing without disruption.',
  },
  {
    title: 'Warehouse Movement Monitoring',
    description: 'Track warehouse stock movement, incoming goods, and distribution activity with greater visibility, helping head office and logistics teams manage supply flow more effectively.',
  },
  {
    title: 'Multi-Branch Reporting',
    description: 'Generate Multi-Branch reports for sales, warehouse activity, inventory movement, and branch performance to support data-driven decisions across your full retail network.',
  },
  {
    title: 'Head Office Dashboards',
    description: 'Give leadership clear head office dashboards for store performance, stock health, pricing, and branch activity so decision-makers can act quickly with reliable retail intelligence.',
  },
  {
    title: 'Branch Performance Analytics',
    description: 'Measure Branch-Level productivity and performance with analytics for sales trends, stock health, and operational efficiency, helping retail teams improve execution across every location.',
  },
]

const benefits = [
  {
    icon: '🧾',
    title: 'POS & Billing',
    description: 'Simplify checkout, payment processing, pricing updates, and transaction accuracy with a POS billing system designed for busy retail counters and faster customer service.',
  },
  {
    icon: '📦',
    title: 'Inventory Management',
    description: 'Keep stock levels accurate across products, shelves, and branches with real-time inventory tracking, stock updates, and better visibility into product movement.',
  },
  {
    icon: '🔄',
    title: 'Stock Transfers',
    description: 'Move inventory smoothly between stores and warehouses with controlled stock transfer workflows that reduce shortages, improve allocation, and support branch operations.',
  },
  {
    icon: '🧾',
    title: 'Purchase Order Tracking',
    description: 'Track supplier orders, deliveries, and replenishment activity in one workflow so retail teams can reorder efficiently and avoid stock-outs or surplus ordering.',
  },
  {
    icon: '📊',
    title: 'Branch Reporting',
    description: 'Monitor sales, stock movement, and store performance across locations with branch reporting tools that provide actionable insight for daily retail decisions.',
  },
  {
    icon: '🧠',
    title: 'Head Office Dashboards',
    description: 'Give leadership one view of branch performance, stock health, pricing accuracy, and sales trends through centralized dashboards built for retail decision-making.',
  },
  {
    icon: '🎯',
    title: 'Customer Loyalty',
    description: 'Improve customer retention with loyalty rewards, customer tracking, and targeted promotions that help retailers build long-term value and repeat purchases.',
  },
  {
    icon: '💰',
    title: 'Finance & Accounting',
    description: 'Connect retail sales, inventory movement, and accounting data in one system for cleaner financial reporting, stronger cash control, and better operational visibility.',
  },
]

const modules = [
  { name: 'Retail POS Billing', icon: '🧾', description: 'Streamline retail checkout, payment processing, and transaction accuracy with a fast POS billing workflow designed for busy counters.' },
  { name: 'Inventory Control', icon: '📦', description: 'Keep stock balanced across shelves, stores, and warehouses with real-time inventory control and product movement tracking.' },
  { name: 'Stock Transfer Management', icon: '🔄', description: 'Move stock between locations with controlled transfer workflows that reduce shortages and improve branch supply planning.' },
  { name: 'Purchase Order Management', icon: '🧾', description: 'Track supplier orders, incoming stock, and replenishment schedules to reduce overstocking and protect stock availability.' },
  { name: 'Branch Sales Reporting', icon: '📊', description: 'Measure sales performance by branch and region with reporting that highlights trends, store activity, and operational opportunities.' },
  { name: 'Multi-Store Dashboard', icon: '🧠', description: 'Give leadership one central view of sales, pricing, inventory, and branch performance across the full retail network.' },
  { name: 'Customer Loyalty Management', icon: '🎯', description: 'Improve retention with loyalty rewards, customer engagement, and targeted campaigns that increase repeat purchases.' },
  { name: 'Retail Finance & Accounting', icon: '💰', description: 'Connect retail transactions and stock data to accounting workflows for stronger cash visibility and cleaner financial reporting.' },
]

export default function MartRetailSoftwarePage() {
  return (
    <SolutionPageLayout
      eyebrow="Retail Software"
      title="Retail POS Software for Marts, Supermarkets, and Growing Retail Businesses"
      subtitle="A complete Retail Management System built for supermarkets, marts, pharmacies, and multi-store businesses that need faster checkout, accurate stock control, and clearer branch-level reporting."
      brightHeroSubtitle
      heroBackgroundImage="/images/blog/retail-page-hero-image.png"
      heroBullets={[
        'Fast retail POS software designed for busy checkout counters',
        'Real-time inventory management across stores, shelves, and warehouses',
        'Branch reporting, customer loyalty, and sales visibility in one platform',
      ]}
      counterFeatures={counterFeatures}
      branchesFeatures={branchesFeatures}
      counterSectionLabel="At the Counter"
      counterHeading="Retail POS Software for Faster Checkout and Smarter Sales Management"
      branchesSectionLabel="Across Branches"
      preserveBranchesSectionLabelCase
      branchesHeading="Multi-Store Retail Management for Complete Visibility and Centralized Control"
      benefitsHeading="Retail Management Software Built for Speed, Control, and Scalable Growth"
      benefits={benefits}
      modules={modules}
      ctaLabel="Discuss your retail needs"
      ctaHref="/contact"
      contentSizedCta
      afterCtaContent={<Clients />}
      afterClientsContent={
        <div className="mb-10">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">FAQ</p>
          <h2 className="mt-3 text-center text-3xl font-bold text-white">Frequently asked questions</h2>

          <div className="mt-10 space-y-4">
            {faqItems.map((item, index) => (
              <details key={item.question} className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left sm:px-6">
                  <div className="text-base font-semibold text-white sm:text-lg">{index + 1}. {item.question}</div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 text-lg font-semibold text-cyan-300 group-open:hidden">+</span>
                  <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 text-lg font-semibold text-cyan-300 group-open:flex">−</span>
                </summary>
                <div className="border-t border-slate-700 px-5 py-4 text-sm leading-7 text-slate-300 sm:px-6">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      }
    />
  )
}

export function getServerSideProps() {
  return { props: {} }
}
