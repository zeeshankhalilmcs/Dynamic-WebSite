export default function OurMission() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center rounded-none bg-slate-900 px-8 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Our Purpose</p>
        
        <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
          Making Business Technology Simple, Practical, and Accessible
        </h2>

        <p className="mt-8 text-xl leading-8 text-slate-300">
          Our mission at BlueChip Solution is to help businesses use technology to solve real problems and improve the way they operate.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          We are committed to developing and delivering quality software, IT infrastructure, hardware, and digital solutions that are practical, easy to use, and aligned with each client's unique requirements. We believe technology should not create unnecessary complexity. Instead, it should simplify business processes, improve efficiency, reduce operational challenges, and help organizations achieve measurable business objectives.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold text-cyan-400">Reliable</p>
            <p className="mt-2 text-sm text-slate-300">Quality solutions you can depend on</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold text-cyan-400">Customer-Focused</p>
            <p className="mt-2 text-sm text-slate-300">Built around your specific needs</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold text-cyan-400">Practical</p>
            <p className="mt-2 text-sm text-slate-300">Solutions that actually work</p>
          </div>
        </div>
      </div>
    </section>
  )
}
