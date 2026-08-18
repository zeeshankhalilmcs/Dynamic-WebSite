import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  ssr: false,
})

export default function Contact(){
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:rounded-[2rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 sm:text-sm">Let’s talk</p>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Start a conversation with our team.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Share what you need and we’ll help shape a practical roadmap for your workflow, systems, and growth goals.
            </p>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <img src="/images/blog/team-meeting-image.png" alt="Business inquiry contact" className="h-52 w-full object-cover scale-110 sm:h-64" />
            </div>
            <div className="mt-8 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">Response time: usually within one business day</div>
              <div className="rounded-2xl bg-slate-50 p-4">Best for: new projects, upgrades, and operational reviews</div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:rounded-[2rem]">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function getServerSideProps() {
  return { props: {} }
}
