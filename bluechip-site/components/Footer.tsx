import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50/80 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="text-lg font-semibold text-slate-900">BlueChip Solution</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Business software and Retail POS solutions that help Businesses streamline Operations, Manage Sales and Grow efficiently.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Solutions</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>ERP & Workflow Automation</li>
            <li>Retail Franchises, Restaurant & Pharmacy POS</li>
            <li>Hospital Management Solution</li>
            <li>Infrastructure & Security</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>hello@bluechipsolution</li>
            <li>Available for Consultation Worldwide</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 grid gap-4 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 md:grid-cols-2 md:items-center md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:flex-wrap">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
            <Link href="/privacy" className="font-medium text-slate-600 transition hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-medium text-slate-600 transition hover:text-slate-900">
              Terms & Conditions
            </Link>
          </div>
          <div>© {new Date().getFullYear()} BlueChip Solution — All rights reserved.</div>
        </div>
        {/* <div className="text-center md:text-right">
          Built with Care &amp; ❤️ by{' '}
          <a
            href="https://rankedonline.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-600 transition hover:text-slate-900"
          >
            Ranked Co.
          </a>
        </div> */}
      </div>
    </footer>
  )
}
