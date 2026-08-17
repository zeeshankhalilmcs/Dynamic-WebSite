const industries = [
  {
    icon: '🏪',
    name: 'Retail & Supermarkets',
    description: 'POS systems, inventory management, multi-store operations, and customer loyalty solutions for retail businesses'
  },
  {
    icon: '💊',
    name: 'Pharmacy Management',
    description: 'Pharmacy operations software, prescription management, inventory control, and sales tracking for pharmacies'
  },
  {
    icon: '🍽️',
    name: 'Restaurants & Cafes',
    description: 'POS systems, order management, kitchen display systems, and delivery coordination for food businesses'
  },
  {
    icon: '🏗️',
    name: 'Construction',
    description: 'Project coordination, resource management, cost tracking, and operational management for construction companies'
  },
  {
    icon: '👕',
    name: 'Garments & Tailoring',
    description: 'Inventory management, tailoring workflows, order tracking, and customer management for garment businesses'
  },
  {
    icon: '🏨',
    name: 'Hospitality',
    description: 'Booking systems, guest management, operations coordination, and revenue management for hotels and resorts'
  },
]

export default function IndustriesServed() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-white px-8 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Industries</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Software Built For Your Business Type</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            We specialize in industry-focused solutions for businesses across diverse sectors. Our software is designed around the specific workflows and challenges of your industry.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
            >
              <div className="text-4xl">{industry.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{industry.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{industry.description}</p>
              <a
                href="#"
                className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700"
              >
                Learn More
                <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
