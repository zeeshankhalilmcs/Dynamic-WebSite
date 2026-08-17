const values = [
  {
    icon: '💎',
    title: 'Simplicity',
    description: 'We believe powerful technology should still be simple and user-friendly. Our solutions are designed to make business processes easier, not add unnecessary complexity.'
  },
  {
    icon: '⭐',
    title: 'Quality',
    description: 'We focus on delivering reliable software, hardware, IT infrastructure, and digital solutions that meet practical business requirements and stand the test of time.'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'Technology continues to evolve, and so do we. We encourage creative thinking, new ideas, and innovative approaches to solving business problems.'
  },
  {
    icon: '👥',
    title: 'Customer Focus',
    description: 'Every business has different requirements. We take the time to understand our clients\' needs and develop solutions around their specific objectives.'
  },
  {
    icon: '💰',
    title: 'Cost Efficiency',
    description: 'We believe businesses should receive meaningful value from their technology investment. Our solutions balance functionality, reliability, performance, and cost.'
  },
  {
    icon: '📈',
    title: 'Continuous Improvement',
    description: 'The future belongs to organizations that keep learning and improving. We continuously evaluate new technologies to enhance the solutions we provide.'
  },
]

export default function OurValues() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-slate-900 px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Core Values</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">What We Believe In</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-300">
            Our values guide how we approach technology, work with clients, and build our company.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-cyan-500/30 bg-slate-800/60 p-7 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80"
            >
              <div className="text-4xl">{value.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-800/50 to-cyan-500/10 p-8 backdrop-blur-sm">
          <p className="text-center text-lg text-slate-300">
            <span className="font-semibold text-cyan-400">Our Promise:</span> Every decision we make, every solution we build, and every interaction we have is guided by these core values. We're committed to your success and to building a better technology future for Bahraini businesses.
          </p>
        </div>
      </div>
    </section>
  )
}
