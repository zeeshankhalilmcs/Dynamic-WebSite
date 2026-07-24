export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50/80 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="text-lg font-semibold text-slate-900">BlueChip Solution</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Delivering intelligent business systems with the reliability, clarity, and support modern teams expect.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Solutions</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>ERP & workflow automation</li>
            <li>Retail, restaurant & pharmacy POS</li>
            <li>Infrastructure & security</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>hello@bluechipsolution.net</li>
            <li>Available for consultation worldwide</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        <div className="mb-3 md:mb-0">
          <a href="/privacy" className="font-medium text-slate-600 transition hover:text-slate-900">
            Privacy Policy
          </a>
        </div>
        <div>© {new Date().getFullYear()} BlueChip Solution — All rights reserved.</div>
      </div>
    </footer>
  )
}
