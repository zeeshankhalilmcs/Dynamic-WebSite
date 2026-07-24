import Header from '../components/Header'
import Footer from '../components/Footer'
import BookConsultationCard from '../components/BookConsultationCard'

const reasons = [
  '19+ years of hands-on implementation experience',
  'Custom-tailored systems instead of off-the-shelf limitations',
  'End-to-end ownership from planning through rollout',
  'Security-minded delivery with long-term support in mind',
]

const pillars = [
  {
    title: 'Operational clarity',
    copy: 'We create systems that make daily operations clearer, calmer, and easier to run.',
  },
  {
    title: 'Faster decisions',
    copy: 'Clean reporting and better visibility help leaders act with confidence.',
  },
  {
    title: 'Reliable rollout',
    copy: 'Every deployment is structured to reduce disruption and create long-term stability.',
  },
]

const values = [
  {
    title: 'Who we are',
    copy: 'We are a hands-on technology partner focused on practical delivery, measured execution, and lasting business value.',
  },
  {
    title: 'Our mission',
    copy: 'We help businesses simplify complex operations with software that is dependable, thoughtful, and built around real workflows.',
  },
  {
    title: 'Our vision',
    copy: 'We aim to help ambitious organizations grow through modern systems that are both scalable and easy to trust.',
  },
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

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_25px_70px_-25px_rgba(15,23,42,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Our story</p>
            <h2 className="mt-3 text-2xl font-semibold">Built around real business needs, not generic software templates.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              We work closely with teams to understand the way work actually happens, then translate that into dependable systems that support growth without unnecessary friction.
            </p>
            <div className="mt-6 grid gap-3">
              {values.map((item) => (
                <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card border-slate-200/80 bg-white/80 p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">What this means for your business</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">A calm, credible partner for growth, modernization, and execution.</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-base font-semibold text-slate-900">Practical delivery</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">We focus on outcomes that help teams move faster without introducing unnecessary complexity.</div>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-base font-semibold text-slate-900">Long-term support</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">Our work continues beyond launch so the system stays aligned as the business evolves.</div>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-base font-semibold text-slate-900">Trusted partnership</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">We stay close to the operation, helping teams adapt with confidence and clarity.</div>
              </div>
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-slate-900 px-5 py-4 text-sm font-semibold text-white">
              Ready to build something dependable, modern, and built around your business?
            </div>
          </div>
        </section>

        <BookConsultationCard />
      </main>
      <Footer />
    </div>
  )
}
