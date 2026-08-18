import Link from 'next/link'
import { useState, type FocusEvent } from 'react'

export default function Header() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsSolutionsOpen(false)
    }
  }

  const navLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/why', label: 'Why BlueChip' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/blog', label: 'Blogs' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-3 py-3 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src="/images/brand-mark.svg" alt="BlueChip Solution logo" className="h-9 w-9 rounded-2xl shadow-md shadow-indigo-100 sm:h-11 sm:w-11" />
          <div className="min-w-0">
            <div className="text-[10px] font-semibold tracking-[0.25em] text-slate-500 sm:text-[11px]">BlueChip</div>
            <div className="text-sm font-semibold text-slate-900 sm:text-base">Solution</div>
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
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className="hidden rounded-full bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-slate-700 sm:block sm:px-4 sm:text-sm">
            Book a Consultation
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 md:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className={`absolute block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="container flex flex-col gap-2 py-4 text-sm font-medium text-slate-700">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <button
              type="button"
              onClick={() => setIsSolutionsOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-lg text-left font-semibold text-slate-800"
            >
              Solutions
              <span>{isSolutionsOpen ? '-' : '+'}</span>
            </button>

            {isSolutionsOpen && (
              <div className="mt-2 space-y-1 transition-all duration-200">
                <Link href="/mart-retail-software" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-white hover:text-slate-900">
                  Mart / Retail Software
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 transition hover:bg-slate-100">
              {link.label}
            </Link>
          ))}

          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 rounded-xl bg-slate-900 px-3 py-3 text-center font-semibold text-white">
            Book a Consultation
          </Link>
        </nav>
      </div>
    </header>
  )
}
