import Header from '../components/Header'
import Footer from '../components/Footer'

const restaurantFeatures = [
  'Multi-table management with real-time order tracking',
  'Kitchen display system with automated order routing',
  'Menu management with item modifiers and pricing control',
  'Split billing, combine orders, and delivery management',
]

const restaurantStats = [
  { label: 'Order accuracy', value: '99.8%' },
  { label: 'Average setup', value: '2 weeks' },
  { label: 'Support response', value: '< 15 min' },
]

const coreCapabilities = [
  {
    title: 'Order & Menu Management',
    copy: 'Streamline order taking with customizable menus, item modifiers, and real-time pricing control. Support dine-in, takeout, and delivery in one unified system.',
  },
  {
    title: 'Kitchen Display System',
    copy: 'Automate kitchen operations with intelligent order routing, priority flagging, and real-time order status visibility across all stations.',
  },
  {
    title: 'Table & Floor Management',
    copy: 'Design custom floor layouts, manage table reservations, track customer flow, and optimize seating for peak efficiency.',
  },
  {
    title: 'Billing & Payment',
    copy: 'Process split bills, combine multiple orders, handle digital payments, and generate itemized receipts with complete transaction history.',
  },
]

const keyFunctions = [
  'Multi-location support with centralized inventory',
  'Mobile ordering for tablets and handheld devices',
  'Delivery management with driver assignment & tracking',
  'Customer loyalty programs and repeat buyer analytics',
  'Staff management with role-based access controls',
  'Financial integration and accounting reconciliation',
  'Real-time analytics and business intelligence dashboards',
  'Integration with popular payment gateways',
]

const successMetrics = [
  { label: 'Reduced Order Time', value: '40%' },
  { label: 'Kitchen Efficiency', value: '+35%' },
  { label: 'Revenue Growth', value: '+28%' },
]

function DashboardIllustration({ type }: { type: string }) {
  const common = 'rounded-xl p-4 bg-gradient-to-br shadow-lg'

  if (type === 'orders') {
    return (
      <div className={`${common} from-amber-500 to-orange-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="20" y="20" width="180" height="50" rx="8" fill="rgba(255,255,255,0.2)" />
          <circle cx="40" cy="35" r="6" fill="white" fillOpacity="0.8" />
          <rect x="52" y="30" width="50" height="10" rx="4" fill="white" fillOpacity="0.7" />
          <circle cx="40" cy="55" r="6" fill="white" fillOpacity="0.6" />
          <rect x="52" y="50" width="50" height="10" rx="4" fill="white" fillOpacity="0.5" />
          <circle cx="40" cy="75" r="6" fill="white" fillOpacity="0.4" />
          <rect x="52" y="70" width="50" height="10" rx="4" fill="white" fillOpacity="0.3" />
        </svg>
      </div>
    )
  }

  if (type === 'kitchen') {
    return (
      <div className={`${common} from-rose-500 to-red-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="30" y="22" width="160" height="46" rx="8" fill="rgba(255,255,255,0.18)" />
          <rect x="50" y="35" width="30" height="20" rx="4" fill="white" fillOpacity="0.8" />
          <rect x="95" y="35" width="30" height="20" rx="4" fill="white" fillOpacity="0.7" />
          <rect x="140" y="35" width="30" height="20" rx="4" fill="white" fillOpacity="0.6" />
        </svg>
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className={`${common} from-emerald-500 to-teal-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <circle cx="55" cy="45" r="20" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
          <circle cx="110" cy="45" r="20" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
          <circle cx="165" cy="45" r="20" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
          <circle cx="55" cy="45" r="8" fill="white" fillOpacity="0.8" />
          <circle cx="110" cy="45" r="8" fill="white" fillOpacity="0.8" />
          <circle cx="165" cy="45" r="8" fill="white" fillOpacity="0.8" />
        </svg>
      </div>
    )
  }

  if (type === 'billing') {
    return (
      <div className={`${common} from-violet-500 to-indigo-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="35" y="20" width="150" height="50" rx="6" fill="rgba(255,255,255,0.18)" />
          <line x1="45" y1="32" x2="175" y2="32" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
          <line x1="45" y1="44" x2="175" y2="44" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
          <line x1="45" y1="56" x2="175" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
          <line x1="45" y1="68" x2="140" y2="68" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`${common} from-indigo-600 to-violet-700`}>
      <svg viewBox="0 0 220 90" className="h-full w-full">
        <rect x="24" y="24" width="172" height="42" rx="14" fill="rgba(255,255,255,0.16)" />
        <rect x="40" y="38" width="36" height="10" rx="5" fill="white" fillOpacity="0.78" />
        <rect x="92" y="38" width="74" height="10" rx="5" fill="white" fillOpacity="0.6" />
      </svg>
    </div>
  )
}

export default function Restaurant() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 to-slate-100/50 py-20 lg:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                Restaurant Management Excellence
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Restaurant Management Reimagined
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
                Empower your restaurant with intelligent POS technology that streamlines operations, reduces order times, and drives revenue growth—from takeout to fine dining.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact" className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg">
                  Schedule a Demo
                </a>
                <a href="/pos" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50">
                  Explore All Solutions
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {restaurantStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Overview */}
        <section className="border-b border-slate-200/80 py-16 lg:py-20">
          <div className="container">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Why Choose Our Solution</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Cloud-Based Restaurant Platform</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Designed for modern restaurants that demand efficiency, accuracy, and growth. Our cloud-based POS system is accessible from any device—tablets, smartphones, or terminals—making it flexible for your operations.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="text-2xl font-black text-amber-500">✓</div>
                <h3 className="text-lg font-semibold text-slate-900">Real-Time Operations</h3>
                <p className="text-slate-600">See order flow, table status, and kitchen progress in real-time across all devices and locations.</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-black text-amber-500">✓</div>
                <h3 className="text-lg font-semibold text-slate-900">Flexible Ordering</h3>
                <p className="text-slate-600">Support dine-in, takeout, delivery, and drive-through with unified order management and delivery tracking.</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-black text-amber-500">✓</div>
                <h3 className="text-lg font-semibold text-slate-900">Data-Driven Growth</h3>
                <p className="text-slate-600">Access comprehensive analytics to understand customer behavior, optimize menu pricing, and maximize revenue.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 to-slate-100/50 py-16 lg:py-20">
          <div className="container">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Core Features</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Powerful Capabilities Built for Restaurants</h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {coreCapabilities.map((capability, index) => (
                <div key={capability.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <DashboardIllustration type={['orders', 'kitchen', 'table', 'billing'][index]} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{capability.title}</h3>
                    <p className="mt-2 text-slate-600">{capability.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Functions */}
        <section className="border-b border-slate-200/80 py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Key Functions</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Everything You Need to Run a Successful Restaurant</h2>
              <p className="mt-4 text-lg text-slate-600">
                From staff management to financial integration, our solution covers every operational aspect of your restaurant.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {keyFunctions.map((func) => (
                <div key={func} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm font-semibold text-amber-600">✓</span>
                  </div>
                  <p className="text-slate-700">{func}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-900 to-slate-950 py-16 text-white lg:py-20">
          <div className="container">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Proven Results</p>
            <h2 className="mt-3 text-3xl font-semibold">Measurable Impact on Your Business</h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {successMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-5xl font-black text-amber-400">{metric.value}</div>
                  <p className="mt-2 text-slate-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 to-slate-100/50 py-16 lg:py-20">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Ready to Transform Your Restaurant?</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Join hundreds of restaurants already using our POS system to streamline operations and boost profitability.
            </p>
            <a href="/contact" className="mt-8 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg">
              Book a Consultation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
