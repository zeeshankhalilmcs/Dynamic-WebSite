import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const capabilities = [
  {
    title: 'Custom software delivery',
    description: 'ERP, POS, and operations platforms designed around your team’s real workflows.',
  },
  {
    title: 'Digital experience',
    description: 'Web and mobile systems with strong performance, modern UX, and simple administration.',
  },
  {
    title: 'Reliable infrastructure',
    description: 'Networking, security, and support processes built to keep daily operations stable.',
  },
]

export default function Home(){
  return (
    <div>
      <Header />
      <Hero />
      <main className="container py-16 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">What we do best</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">A consultancy-led technology partner for ambitious operations.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We combine strategy, product thinking, and implementation expertise to build systems that are dependable from day one and scalable as your business grows.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Industry reach</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-white/10 p-3">Retail, hospitality, healthcare, manufacturing</div>
              <div className="rounded-2xl bg-white/10 p-3">Fuel stations, weighbridge, telecom, education</div>
              <div className="rounded-2xl bg-white/10 p-3">Hotel, restaurant, superstore, pharmacy, hospital operations</div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <div key={item.title} className="animate-fade-up rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm" style={{ animationDelay: `${index * 120}ms` }}>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 p-8 text-white shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Performance that scales</p>
              <h3 className="mt-3 text-3xl font-bold">Built to support growth from first launch to multi-site operations.</h3>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Our team helps businesses move from fragmented tools to systems that are faster, clearer, and easier to manage.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="mt-1 text-sm text-slate-300">Operational reliability focus</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold">100%</div>
                <div className="mt-1 text-sm text-slate-300">Client-led implementations</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur sm:col-span-2">
                <div className="text-3xl font-bold">24/7</div>
                <div className="mt-1 text-sm text-slate-300">Support readiness for critical business continuity</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
