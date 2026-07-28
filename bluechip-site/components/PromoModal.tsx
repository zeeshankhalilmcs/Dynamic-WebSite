import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type PromoSettings = {
  enabled: boolean
  title: string
  subtitle: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  imagePath: string
  displayPages: string[]
  persistHours: number
}

const defaultPromoSettings: PromoSettings = {
  enabled: true,
  title: 'Digital Invoicing Software Solutions for Corporate & Non-Corporate Businesses',
  subtitle: 'Create & post to FBR, professional invoices in seconds. Localized for Pakistan and compatible with tax posting requirements.',
  primaryCtaLabel: 'Contact for demo',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: 'See pricing',
  secondaryCtaHref: '/pricing',
  imagePath: '/images/hero-main.png',
  displayPages: ['homepage'],
  persistHours: 24,
}

const PAGE_DISPLAY_MAP: Record<string, string[]> = {
  homepage: ['/'],
  pos: ['/pos'],
  reviews: ['/reviews'],
  why: ['/why'],
  blog: ['/blog'],
  'blog-detail': ['/blog/[slug]'],
}

function getDismissedTimestamp() {
  const dismissed = localStorage.getItem('promoModalDismissedAt')
  if (!dismissed) return null
  const ts = Number(dismissed)
  return Number.isNaN(ts) ? null : ts
}

function shouldShowOnPage(settings: PromoSettings, pathname: string) {
  const normalizedPath = pathname === '/' ? '/' : pathname
  return settings.displayPages.some((page) => {
    if (page === 'blog') {
      return normalizedPath === '/blog'
    }
    if (page === 'blog-detail') {
      return normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog'
    }
    return PAGE_DISPLAY_MAP[page]?.includes(normalizedPath)
  })
}

export default function PromoModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<PromoSettings>(defaultPromoSettings)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (!res.ok) throw new Error('Failed to load settings')
        const data = await res.json()
        setSettings({ ...defaultPromoSettings, ...(data?.promo || {}) })
      } catch {
        setSettings(defaultPromoSettings)
      } finally {
        setLoaded(true)
      }
    }

    loadSettings()
  }, [])

  useEffect(() => {
    if (!loaded) return
    if (!settings.enabled) return
    if (!shouldShowOnPage(settings, router.pathname)) return

    const dismissedAt = getDismissedTimestamp()
    const maxAge = settings.persistHours * 60 * 60 * 1000
    if (dismissedAt && Date.now() - dismissedAt < maxAge) return

    const timer = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(timer)
  }, [loaded, settings, router.pathname])

  function close(remember = true) {
    setOpen(false)
    if (remember) {
      localStorage.setItem('promoModalDismissedAt', String(Date.now()))
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => close(true)} />
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl">
        <button onClick={() => close(true)} className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-slate-600 shadow hover:bg-slate-50">
          ✕
        </button>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">DI</div>
              <div className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">Digital Invoicing</div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">{settings.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{settings.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={settings.primaryCtaHref} className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">{settings.primaryCtaLabel}</a>
              <a href={settings.secondaryCtaHref} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">{settings.secondaryCtaLabel}</a>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden bg-slate-100">
            <img src={settings.imagePath} alt="Promo" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
