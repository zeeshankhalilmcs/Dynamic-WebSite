import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

export default function Contact(){
  return (
    <div>
      <Header />
      <main className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Let’s talk</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Start a conversation with our team.</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Share what you need and we’ll help shape a practical roadmap for your workflow, systems, and growth goals.
            </p>
            <div className="mt-8 rounded-[1.5rem] overflow-hidden border border-slate-200">
              <img src="/images/stock/contact.jpg" alt="Business inquiry contact" className="h-64 w-full object-cover" />
            </div>
            <div className="mt-8 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">Response time: usually within one business day</div>
              <div className="rounded-2xl bg-slate-50 p-4">Best for: new projects, upgrades, and operational reviews</div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
