export default function OurVision() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-white px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Our Future</p>
            
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Building the Future Through Technology and Innovation
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our vision is to become a trusted technology partner for businesses by continuously developing innovative, practical, and future-ready technology solutions.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              We believe that successful technology companies must continuously adapt. As technology evolves, businesses need solutions that can evolve with them. BlueChip Solution aims to stay ahead of technological changes by exploring innovative ideas, improving our services, and developing solutions that help businesses overcome new challenges.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              We envision a future where businesses can use technology to work more efficiently, automate repetitive processes, make better business decisions, improve customer experiences, strengthen security, expand their operations, and adapt to emerging technologies with confidence.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">🚀</span>
                <p className="text-slate-700"><span className="font-semibold">Continuous Innovation:</span> Exploring new technologies and approaches</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">🌱</span>
                <p className="text-slate-700"><span className="font-semibold">Business Growth:</span> Supporting your expansion and success</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">👥</span>
                <p className="text-slate-700"><span className="font-semibold">Talent Development:</span> Creating opportunities for skilled professionals</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg">🌍</span>
                <p className="text-slate-700"><span className="font-semibold">Industry Leadership:</span> Setting standards for technology excellence</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-slate-50 p-8 shadow-sm">
            <div className="text-center">
              <div className="text-5xl">🎯</div>
              <p className="mt-6 text-xl font-semibold text-slate-900">Vision in Action</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                We're committed to helping businesses achieve their goals through technology that empowers teams, delights customers, and drives growth.
              </p>
            </div>

            <div className="mt-8 space-y-4 border-t border-indigo-200 pt-6">
              <div className="rounded-lg bg-white p-4">
                <p className="font-semibold text-indigo-600">By 2028</p>
                <p className="mt-1 text-sm text-slate-600">Expand to support 200+ businesses globally</p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="font-semibold text-indigo-600">By 2030</p>
                <p className="mt-1 text-sm text-slate-600">Become the leading technology partner in the region</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
