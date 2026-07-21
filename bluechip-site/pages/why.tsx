import Header from '../components/Header'
import Footer from '../components/Footer'

const reasons = [
  '19+ years of hands-on implementation experience',
  'Custom-tailored systems instead of off-the-shelf limitations',
  'End-to-end ownership from planning through rollout',
  'Security-minded delivery with long-term support in mind',
]

const pillars = [
  'Operational clarity at every level',
  'Faster decision-making with clean reporting',
  'Reliable deployment with minimal disruption',
]

const steps = ['Discover the real workflows', 'Translate them into a smarter system', 'Launch with confidence and support']

export default function Why() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f3f4f6_100%)]">
      <Header />
      <main className="container py-16 lg:py-24">
        <section className="glass-card overflow-hidden border-slate-200/80 bg-white/80 p-0">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Why clients choose us</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                A pragmatic technology partner for businesses that need dependable growth.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                We bring strategic thinking, implementation discipline, and long-term support together so your team gets systems that are practical, scalable, and easy to trust.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6">
                <ul className="space-y-3 text-sm text-slate-700">
                  {reasons.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-3">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[1.5rem]">
                <img src="/images/stock/hero.jpg" alt="A professional team planning technology solutions" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.25rem] border border-white/20 bg-white/10 p-6 text-white backdrop-blur">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Delivery approach</div>
                  <div className="mt-4 space-y-3">
                    {steps.map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">0{index + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 text-sm font-medium text-slate-700 shadow-sm">
              {pillar}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
