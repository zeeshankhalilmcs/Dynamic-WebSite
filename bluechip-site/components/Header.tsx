import Link from 'next/link'

export default function Header() {
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
          <Link href="/pos" className="transition hover:text-slate-900">POS</Link>
          <Link href="/pricing" className="transition hover:text-slate-900">Pricing</Link>
          <Link href="/why" className="transition hover:text-slate-900">Why BlueChip</Link>
          <Link href="/reviews" className="transition hover:text-slate-900">Reviews</Link>
          <Link href="/blog" className="transition hover:text-slate-900">Blog</Link>
        </nav>

        <Link href="/contact" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Book a Consultation
        </Link>
      </div>
    </header>
  )
}
