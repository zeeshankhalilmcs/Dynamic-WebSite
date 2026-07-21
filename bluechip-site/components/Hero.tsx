export default function Hero(){
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.35),_transparent_40%),linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#312e81_100%)] py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_45%,transparent_100%)] opacity-50" />
      <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">
            Trusted by growth-focused businesses
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Technology that feels like an extension of your business.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300 sm:text-xl">
            We design resilient POS, ERP, and infrastructure systems that help teams move faster, serve customers better, and scale confidently.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100">Request a consultation</a>
            <a href="/pos" className="rounded-full border border-white/25 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10">Explore our solutions</a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">19+ yrs</div>
              <div className="mt-1 text-sm text-slate-300">practical expertise</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">40+</div>
              <div className="mt-1 text-sm text-slate-300">vertical solutions</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">24/7</div>
              <div className="mt-1 text-sm text-slate-300">support readiness</div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <img src="/images/stock/hero.jpg" alt="Business technology hero" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold text-slate-200">Custom ERP & POS</div>
              <div className="mt-1 text-sm text-slate-300">Tailored workflows for retail, hospitality, and service businesses.</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-sm font-semibold text-slate-200">Secure infrastructure</div>
              <div className="mt-1 text-sm text-slate-300">Stable networks, backups, and protection built for continuity.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
