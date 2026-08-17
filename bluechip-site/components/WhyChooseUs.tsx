const reasons = [
  {
    title: 'One Partner For All Your Needs',
    description: 'Software, hardware, networking, security, and digital marketing—work with one trusted technology partner instead of managing multiple vendors.'
  },
  {
    title: 'Industry-Focused Solutions',
    description: 'Our solutions are built for specific industries, not generic one-size-fits-all software. We understand your workflow because we specialize in your business type.'
  },
  {
    title: 'Practical Technology, Not Complexity',
    description: 'We believe powerful technology should be simple and user-friendly. Our solutions are designed to make business processes easier, not harder.'
  },
  {
    title: 'Cost-Effective Implementation',
    description: 'We focus on solutions that deliver meaningful value while respecting your budget. Technology investment should make financial sense.'
  },
  {
    title: 'Long-Term Partnership Approach',
    description: 'Our goal is not simply to deliver a product—we aim to build long-term relationships as your technology requirements evolve and grow.'
  },
  {
    title: 'Local Bahrain Expertise',
    description: 'We understand the Bahraini business landscape, local needs, and market dynamics. We are here to support your success.'
  },
]

export default function WhyChooseUs() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-white px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Competitive Advantages</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Why Businesses Choose BlueChip Solution</h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {reasons.slice(0, 6).map((reason, index) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-cyan-300 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.35)]">
              <img
                src="/images/blog/competatice-advantages-image.png"
                alt="BlueChip Solution competitive advantages"
                className="h-[420px] w-full object-cover object-center lg:h-[560px]"
              />
            </div>

            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-slate-900/90 p-4 text-white shadow-xl backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Trusted impact</p>
              <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                <span>Support</span>
                <span className="text-slate-300">•</span>
                <span>Strategy</span>
                <span className="text-slate-300">•</span>
                <span>Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
