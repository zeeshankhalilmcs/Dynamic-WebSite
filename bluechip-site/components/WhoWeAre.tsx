export default function WhoWeAre() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-white px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">About BlueChip Solution</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">A Consultancy-Led Technology Partner for Ambitious Operations</h2>
            
            <p className="mt-6 text-lg leading-8 text-slate-600">
              BlueChip Solution is a software development, IT solutions, hardware, and digital marketing company. We help businesses improve their operations through practical technology and innovative digital solutions.
            </p>
            
            <p className="mt-4 text-lg leading-8 text-slate-600">
              From turning business ideas into software solutions to implementing reliable IT infrastructure and digital marketing strategies, we provide technology services designed around the real needs of your business. Our approach combines modern technology, experienced professionals, creative thinking, and cost-effective solutions to help you operate more efficiently and grow with confidence.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you need business management software, POS systems, pharmacy software, construction software, retail solutions, networking infrastructure, CCTV systems, or digital marketing services—BlueChip Solution is committed to delivering solutions that are practical, scalable, and aligned with your business goals.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">✓</div>
                <div>
                  <p className="font-semibold text-slate-900">100+ Businesses Trust Us</p>
                  <p className="text-sm text-slate-600">Proven track record across retail, pharmacy, restaurants, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">✓</div>
                <div>
                  <p className="font-semibold text-slate-900">2+ Decades of Expertise</p>
                  <p className="text-sm text-slate-600">Continuous innovation and practical business technology solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">✓</div>
                <div>
                  <p className="font-semibold text-slate-900">Software, Hardware & IT All In One</p>
                  <p className="text-sm text-slate-600">One technology partner for all your business needs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[360px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:h-[430px] lg:h-[560px] lg:min-h-[560px]">
            <img
              src="/images/blog/about-section-image.jpg"
              alt="BlueChip Solution - Technology Partnership"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
