import { useState } from 'react'
import WhatsAppLeadModal from './WhatsAppLeadModal'

export default function CTASection() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)

  return (
    <>
      <section className="flex min-h-screen w-full items-center justify-center rounded-none bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 px-8 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Ready to Start?</p>
          
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Ready to Improve Your Business With Technology?
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-300">
            Let's discuss how BlueChip Solution can help your business operate more efficiently, serve customers better, and grow with confidence.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-900 transition duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Schedule Discovery Call
            </button>
            <a
              href="/pos"
              className="rounded-full border-2 border-cyan-500 px-8 py-4 text-lg font-semibold text-cyan-400 transition duration-300 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Explore Solutions
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-cyan-400">✓ No long-term contracts</p>
              <p className="mt-2 text-sm text-slate-300">Start with flexibility</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-cyan-400">✓ Free initial consultation</p>
              <p className="mt-2 text-sm text-slate-300">Let's understand your needs</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-cyan-400">✓ Dedicated support team</p>
              <p className="mt-2 text-sm text-slate-300">We're here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppLeadModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </>
  )
}
