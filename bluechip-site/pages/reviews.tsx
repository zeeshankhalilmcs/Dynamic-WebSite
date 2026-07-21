import Header from '../components/Header'
import Footer from '../components/Footer'

const testimonials = [
  {
    quote: 'The rollout was smooth, the team was responsive, and the new POS workflow helped us reduce delays immediately.',
    name: 'Operations Director',
    company: 'Metro Mart',
  },
  {
    quote: 'We needed a more reliable setup for our branches and the solution felt custom-built rather than generic.',
    name: 'Finance Lead',
    company: 'Bistro 88',
  },
  {
    quote: 'The system gave us better visibility across each location and made daily reconciliation far easier.',
    name: 'Branch Manager',
    company: 'City Fuel',
  },
  {
    quote: 'What stood out most was the follow-through after launch and the way the team supported our staff.',
    name: 'Supply Chain Head',
    company: 'Care Pharmacy',
  },
]

const highlights = ['Seamless branch coordination', 'Clear reporting at every level', 'Reliable support after launch']

export default function Reviews() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#f3f4f6_100%)]">
      <Header />
      <main className="container py-16 lg:py-24">
        <section className="glass-card overflow-hidden border-slate-200/80 bg-white/80 p-0">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Reviews & case studies</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                Executive-level feedback from teams that needed stronger control and smoother daily operations.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                From retail and hospitality to pharmacy and fuel, our work has helped clients simplify control, improve uptime, and create a better experience for staff and customers alike.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6">
                <div className="flex items-center gap-2 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="mt-4 text-lg font-medium text-slate-800">Rated highly for reliability, responsiveness, and long-term support.</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-3">
              <img src="/images/stock/contact.jpg" alt="Professional support environment" className="h-full min-h-[360px] w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
              <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
              <div className="mt-6 text-sm font-semibold text-slate-900">{item.name}</div>
              <div className="text-sm text-slate-500">{item.company}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
