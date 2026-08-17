import Link from 'next/link'
import { useState, type FocusEvent } from 'react'

export default function Header() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsSolutionsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/brand-mark.svg" alt="BlueChip Solution logo" className="h-11 w-11 rounded-2xl shadow-md shadow-indigo-100" />
          <div>
            <div className="text-[11px] font-semibold tracking-[0.3em] text-slate-500">BlueChip</div>
            <div className="text-base font-semibold text-slate-900">Solution</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <div
            className="relative"
            onFocus={() => setIsSolutionsOpen(true)}
            onBlur={handleBlur}
          >
            <button
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              type="button"
              aria-expanded={isSolutionsOpen}
              onClick={() => setIsSolutionsOpen((open) => !open)}
            >
              Solutions
              <span className="text-base">+</span>
            </button>
            <div className={`absolute left-0 top-full mt-3 min-w-[220px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl ${isSolutionsOpen ? 'block' : 'hidden'}`}>
              <Link href="/mart-retail-software" className="mt-1 block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">Mart / Retail Software</Link>
              {/* <Link href="/hospital-management-software" className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">Hospital Management Software</Link> */}
              {/* <Link href="/white-label-brand-software" className="mt-1 block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">White Label Brand Software</Link> */}
            </div>
          </div>
          <Link href="/pricing" className="transition hover:text-slate-900">Pricing</Link>
          <Link href="/why" className="transition hover:text-slate-900">Why BlueChip</Link>
          <Link href="/reviews" className="transition hover:text-slate-900">Reviews</Link>
          <Link href="/blog" className="transition hover:text-slate-900">Blogs</Link>
        </nav>

        <Link href="/contact" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Book a Consultation
        </Link>
      </div>
    </header>
  )
}
