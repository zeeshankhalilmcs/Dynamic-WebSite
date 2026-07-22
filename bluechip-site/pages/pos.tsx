import Header from '../components/Header'
import Footer from '../components/Footer'

const features = [
  'Multi-branch retail POS with centralized controls',
  'Restaurant kitchen sync and order flow visibility',
  'Fuel station pump control and billing integration',
  'Barcode, printer, and hardware device compatibility',
]

const clients = ['Metro Mart', 'Bistro 88', 'City Fuel', 'Care Pharmacy']

const stats = [
  { label: 'Live transactions', value: '24/7' },
  { label: 'Average rollout', value: '2 weeks' },
  { label: 'Support response', value: '< 15 min' },
]

const dashboardCards = [
  {
    title: 'Finance metrics',
    copy: 'Capture margin health, expenses, and cash-flow movement with clean, executive-friendly views.',
  },
  {
    title: 'Product summary',
    copy: 'Monitor top-selling products, inventory levels, and category performance in real time.',
  },
  {
    title: 'Profit report',
    copy: 'Review daily and weekly profitability with focused reporting that highlights growth areas.',
  },
  {
    title: 'Customer summary',
    copy: 'Understand repeat buyers, loyalty value, and customer behavior across every branch.',
  },
  {
    title: 'Gross profit',
    copy: 'See gross margin performance at a glance and spot opportunities for better pricing decisions.',
  },
  {
    title: 'Today sales',
    copy: 'Stay updated on live sales activity, average ticket size, and checkout momentum.',
  },
  {
    title: 'Monthly revenue',
    copy: 'Compare recurring revenue performance month over month with clear trend visuals.',
  },
  {
    title: 'Yearly revenue',
    copy: 'Track long-range business growth with strategic summaries built for leadership review.',
  },
]

const dashboardModules = [
  {
    title: 'Finance metrics',
    description: 'Capture margin health, expenses, and cash-flow movement with clean, executive-friendly views.',
    value: '$182k',
    metric: 'Margin 24%',
    chart: [18, 28, 22, 36, 30, 40],
    accent: 'from-violet-500 to-indigo-500',
    type: 'finance',
  },
  {
    title: 'Product summary',
    description: 'Monitor top-selling products, inventory levels, and category performance in real time.',
    value: '128 SKUs',
    metric: 'Top item: Coffee',
    chart: [12, 20, 18, 24, 30, 22],
    accent: 'from-emerald-500 to-teal-500',
    type: 'product',
  },
  {
    title: 'Profit report',
    description: 'Review daily and weekly profitability with focused reporting that highlights growth areas.',
    value: '+14.8%',
    metric: 'Weekly gain',
    chart: [22, 28, 34, 30, 38, 44],
    accent: 'from-amber-500 to-orange-500',
    type: 'profit',
  },
  {
    title: 'Customer summary',
    description: 'Understand repeat buyers, loyalty value, and customer behavior across every branch.',
    value: '1.4k',
    metric: 'Returning users',
    chart: [16, 22, 28, 26, 34, 30],
    accent: 'from-sky-500 to-cyan-500',
    type: 'customer',
  },
  {
    title: 'Gross profit',
    description: 'See gross margin performance at a glance and spot opportunities for better pricing decisions.',
    value: '68.2%',
    metric: 'Gross margin',
    chart: [24, 30, 26, 32, 36, 34],
    accent: 'from-fuchsia-500 to-pink-500',
    type: 'gross',
  },
  {
    title: 'Today sales',
    description: 'Stay updated on live sales activity, average ticket size, and checkout momentum.',
    value: '$24,890',
    metric: 'Avg ticket $38',
    chart: [14, 18, 22, 28, 32, 30],
    accent: 'from-rose-500 to-red-500',
    type: 'sales',
  },
  {
    title: 'Monthly revenue',
    description: 'Compare recurring revenue performance month over month with clear trend visuals.',
    value: '$182k',
    metric: 'MoM +9.2%',
    chart: [20, 26, 22, 28, 34, 38],
    accent: 'from-slate-700 to-slate-900',
    type: 'monthly',
  },
  {
    title: 'Yearly revenue',
    description: 'Track long-range business growth with strategic summaries built for leadership review.',
    value: '$2.1M',
    metric: 'YoY +21%',
    chart: [32, 36, 40, 38, 42, 48],
    accent: 'from-indigo-600 to-violet-600',
    type: 'yearly',
  },
]

const strategyItems = [
  'Built for high-volume checkout with calm, consistent performance.',
  'Designed for retail, hospitality, and service operators who need precision.',
  'Backed by launch planning, training, and ongoing improvement support.',
  'Modular integrations that scale smoothly as new locations and services are added.',
  'Secure, real-time visibility that keeps leadership aligned across every shift.',
]

const strategyMetrics = [
  { label: 'Branch readiness', value: '98.4%' },
  { label: 'Transaction flow', value: '24/7' },
  { label: 'Support response', value: '< 15 min' },
  { label: 'Queue throughput', value: '126 / min' },
  { label: 'Card payment success', value: '99.2%' },
  { label: 'Inventory sync', value: '97.8%' },
  { label: 'Shift coverage', value: '94.6%' },
  { label: 'Average order time', value: '12 sec' },
]

const retailBenefits = [
  {
    title: 'Accelerated checkout',
    copy: 'Shorten payment time and keep lines moving with faster, intuitive billing at every counter.',
    icon: '01',
  },
  {
    title: 'Inventory in sync',
    copy: 'Keep stock levels aligned across departments, shelves, and warehouse movement in real time.',
    icon: '02',
  },
  {
    title: 'Loyalty that connects',
    copy: 'Turn repeat purchases into personalized service with loyalty, CRM, and targeted offers.',
    icon: '03',
  },
  {
    title: 'Finance ready',
    copy: 'Give leadership clean visibility into margin, expenses, and growth without manual work.',
    icon: '04',
  },
]

const retailSegments = [
  {
    title: 'Supermarkets & grocery',
    copy: 'Support high-volume lanes, promotions, and daily replenishment without losing control.',
  },
  {
    title: 'Fashion & department stores',
    copy: 'Balance multiple counters, returns, and seasonal campaigns with a calm operating flow.',
  },
  {
    title: 'Electronics & specialty retail',
    copy: 'Blend fast sales, warranty handling, and service-led offers in one consistent experience.',
  },
  {
    title: 'Multi-branch operations',
    copy: 'Align inventory, pricing, performance, and store-level reporting from a single view.',
  },
]

const executivePoints = [
  ['Reduced queue time', 'Shorter payment flow and better counter discipline for peak periods.'],
  ['Clearer oversight', 'Leadership gets real-time visibility across performance, sales, and readiness.'],
  ['Smarter service', 'Staff can focus on experience while the system handles the heavy operational work.'],
]

function DashboardIllustration({ type }: { type: string }) {
  const common = 'h-24 w-full rounded-2xl bg-gradient-to-br p-3'

  if (type === 'finance') {
    return (
      <div className={`${common} from-violet-500 to-indigo-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="8" y="12" width="204" height="66" rx="12" fill="rgba(255,255,255,0.16)" />
          <rect x="24" y="28" width="64" height="12" rx="6" fill="white" fillOpacity="0.85" />
          <rect x="24" y="48" width="100" height="10" rx="5" fill="white" fillOpacity="0.65" />
          <path d="M156 30 L176 46 L190 35 L204 22" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    )
  }

  if (type === 'product') {
    return (
      <div className={`${common} from-emerald-500 to-teal-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="18" y="18" width="64" height="54" rx="12" fill="rgba(255,255,255,0.18)" />
          <rect x="92" y="18" width="108" height="54" rx="12" fill="rgba(255,255,255,0.12)" />
          <rect x="32" y="34" width="36" height="8" rx="4" fill="white" fillOpacity="0.8" />
          <rect x="108" y="32" width="56" height="10" rx="5" fill="white" fillOpacity="0.75" />
          <rect x="108" y="48" width="78" height="8" rx="4" fill="white" fillOpacity="0.55" />
        </svg>
      </div>
    )
  }

  if (type === 'profit') {
    return (
      <div className={`${common} from-amber-500 to-orange-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <path d="M20 60 C50 40, 70 48, 98 32 C126 16, 148 24, 176 36 C190 42, 198 44, 200 34" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="98" cy="32" r="6" fill="white" />
          <circle cx="176" cy="36" r="6" fill="white" />
        </svg>
      </div>
    )
  }

  if (type === 'customer') {
    return (
      <div className={`${common} from-sky-500 to-cyan-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <circle cx="64" cy="38" r="22" fill="rgba(255,255,255,0.22)" />
          <rect x="96" y="24" width="98" height="16" rx="8" fill="white" fillOpacity="0.8" />
          <rect x="96" y="46" width="72" height="10" rx="5" fill="white" fillOpacity="0.62" />
          <rect x="96" y="62" width="86" height="10" rx="5" fill="white" fillOpacity="0.42" />
        </svg>
      </div>
    )
  }

  if (type === 'gross') {
    return (
      <div className={`${common} from-fuchsia-500 to-pink-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="22" y="22" width="176" height="48" rx="14" fill="rgba(255,255,255,0.18)" />
          <path d="M42 54 H84" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <path d="M118 54 H160" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <path d="M176 54 H188" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (type === 'sales') {
    return (
      <div className={`${common} from-rose-500 to-red-600`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <rect x="20" y="24" width="180" height="42" rx="14" fill="rgba(255,255,255,0.18)" />
          <rect x="36" y="40" width="34" height="16" rx="8" fill="white" fillOpacity="0.85" />
          <rect x="88" y="36" width="44" height="20" rx="10" fill="white" fillOpacity="0.7" />
          <rect x="146" y="32" width="38" height="24" rx="10" fill="white" fillOpacity="0.55" />
        </svg>
      </div>
    )
  }

  if (type === 'monthly') {
    return (
      <div className={`${common} from-slate-700 to-slate-900`}>
        <svg viewBox="0 0 220 90" className="h-full w-full">
          <path d="M24 56 L54 44 L82 52 L118 28 L152 38 L188 22" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="54" cy="44" r="5" fill="white" />
          <circle cx="118" cy="28" r="5" fill="white" />
          <circle cx="188" cy="22" r="5" fill="white" />
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

export default function POS() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.18),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#f3f4f6_100%)]">
      <Header />
      <main className="container py-16 lg:py-24">
        <section className="glass-card overflow-hidden border-slate-200/80 bg-white/85 p-0">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Retail POS platform</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                Turn every checkout into a faster, smarter retail moment.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                From supermarkets and grocery chains to fashion and specialty stores, our POS experience keeps counters moving, inventory aligned, and leadership informed in real time.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#features" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Explore platform
                </a>
                <a href="#segments" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  See retail formats
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm font-medium text-slate-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-slate-900 p-3">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
                <img
                  src="/images/stock/beautiful-family-standing-cash-counter.jpg"
                  alt="Family standing by the cash counter while completing a POS payment"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/20" />

                <div className="absolute left-4 top-4 max-w-[260px] rounded-[1rem] border border-white/15 bg-slate-950/65 p-3 text-white backdrop-blur-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">Retail checkout live</div>
                  <div className="mt-2 text-xl font-semibold">Fast billing, strong service, better satisfaction</div>
                </div>

                <div className="absolute right-4 top-4 rounded-[1rem] border border-emerald-400/40 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
                  4.9 customer satisfaction
                </div>

                <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1rem] border border-white/15 bg-slate-950/70 p-3 text-white backdrop-blur-sm">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Average ticket</div>
                    <div className="mt-2 text-lg font-semibold">$38</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/15 bg-slate-950/70 p-3 text-white backdrop-blur-sm">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Payment speed</div>
                    <div className="mt-2 text-lg font-semibold">12s</div>
                  </div>
                  <div className="rounded-[1rem] border border-white/15 bg-slate-950/70 p-3 text-white backdrop-blur-sm">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Queue relief</div>
                    <div className="mt-2 text-lg font-semibold">76%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-4" id="features">
          {retailBenefits.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-card border-slate-200/80 bg-white/80 p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Why retail teams choose us</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">A calm operating layer for counters, staff, and store leadership.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The experience is designed to feel polished for customers and practical for teams, giving every store the confidence to run faster, smoother, and more predictably.
            </p>
            <div className="mt-6 space-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50/80 px-4 py-3">
                  <span className="text-sm font-medium text-slate-600">{stat.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_25px_70px_-25px_rgba(15,23,42,0.4)]">
            <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur flex flex-col justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Operational strategy</div>
                <div className="mt-4 text-lg font-semibold text-white">A tighter executive view for daily business control.</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Designed to give leaders fast visibility on performance, staffing readiness, and business momentum.
                </p>
              </div>

              <div className="grid gap-3">
                {strategyMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.25rem] bg-white/10 p-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{metric.label}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.16)] lg:p-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Retail modules</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Everything from checkout to insight, in one refined workflow.</h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              Built for stores, branches, and daily operations
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {dashboardModules.slice(0, 4).map((card) => (
              <div key={card.title} className="min-h-[220px] rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)]">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-indigo-600">Live signal</div>
                    <div className="mt-4 text-2xl font-semibold text-slate-900">{card.title}</div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>
                  </div>
                  <div className="w-full lg:max-w-[220px] lg:justify-self-end">
                    <DashboardIllustration type={card.type} />
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Figure</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">{card.value}</div>
                  </div>
                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Signal</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">{card.metric}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" id="segments">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_25px_70px_-25px_rgba(15,23,42,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Built for every retail format</p>
            <h2 className="mt-3 text-2xl font-semibold">From supermarket checkout lanes to multi-branch operations.</h2>
            <div className="mt-6 grid gap-3">
              {retailSegments.map((segment) => (
                <div key={segment.title} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                  <div className="text-base font-semibold text-white">{segment.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{segment.copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card border-slate-200/80 bg-white/80 p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Executive confidence</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Trusted across the full retail journey.</h2>
            <div className="mt-6 space-y-4">
              {executivePoints.map(([title, copy]) => (
                <div key={title} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                  <div className="text-base font-semibold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{copy}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-slate-900 px-5 py-4 text-sm font-semibold text-white">
              Ready to modernize the checkout experience from the first scan to the final payment?
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/50 to-slate-100/50 py-16 lg:py-20">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Ready to transform your retail operations?</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">Let's discuss how our POS solution can streamline your business, boost efficiency, and drive growth.</p>
            <a href="/contact" className="mt-8 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600">Book a Consultation</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
