import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50/80 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="text-lg font-semibold text-slate-900">Bluechip Technologies</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Delivering intelligent business systems with the reliability, clarity, and support modern teams expect.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Solutions</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/pos" className="text-slate-600 transition hover:text-slate-900 font-medium">POS System</Link></li>
            <li><Link href="/restaurant" className="text-slate-600 transition hover:text-slate-900 font-medium">Restaurant Solution</Link></li>
            <li><a href="#" className="text-slate-600 transition hover:text-slate-900 font-medium">Infrastructure & Security</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>hello@bluechiptech.com</li>
            <li>+92 300 0000000</li>
            <li>Available for consultation worldwide</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
        <div>© {new Date().getFullYear()} Bluechip Technologies — All rights reserved.</div>
        <a href="/privacy" className="font-medium text-slate-600 transition hover:text-slate-900">
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}
