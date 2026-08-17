const stages = [
  {
    number: '1',
    title: 'Understand',
    description: 'We start by listening to your business requirements, challenges, and operational processes. Understanding your unique needs is the foundation of everything we do.'
  },
  {
    number: '2',
    title: 'Plan',
    description: 'We determine the appropriate technology solutions, implementation timeline, and resource requirements. Our planning is based on your business needs, not unnecessary extras.'
  },
  {
    number: '3',
    title: 'Implement',
    description: 'We deploy the selected technology and integrate all required components. Our implementation process is structured, tested, and designed for minimal disruption to your operations.'
  },
  {
    number: '4',
    title: 'Optimize',
    description: 'We fine-tune workflows, ensure the technology is being used effectively, and help your team extract maximum value. Optimization is continuous, not a one-time event.'
  },
  {
    number: '5',
    title: 'Grow',
    description: 'As your business grows, we evaluate and implement additional technology solutions. Your technology infrastructure evolves with your business.'
  },
]

export default function OurApproach() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-slate-900 px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Our Proven Process</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">How We Help You Succeed</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-300">
            From understanding your needs to scaling your operations, we follow a structured methodology that ensures success.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {stages.map((stage, index) => (
            <div key={stage.title} className="relative">
              {/* Connector line for desktop */}
              {index < stages.length - 1 && (
                <div className="absolute left-1/2 top-1/4 hidden h-1 w-full -translate-x-1/2 transform bg-gradient-to-r from-cyan-500/50 to-transparent lg:block" />
              )}

              <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80">
                {/* Number Circle */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-900">
                  {stage.number}
                </div>

                <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-800/40 via-slate-800/20 to-slate-800/40 p-8 backdrop-blur-sm">
          <p className="text-center text-lg text-slate-300">
            <span className="font-semibold text-cyan-400">Why This Approach?</span> We ask questions first, recommend solutions second. This ensures we build technology that actually solves your problems instead of creating unnecessary complexity.
          </p>
        </div>
      </div>
    </section>
  )
}
