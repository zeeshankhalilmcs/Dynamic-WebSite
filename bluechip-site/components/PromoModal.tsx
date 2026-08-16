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
  forceShowOnHomepage?: boolean
  dismissDays?: number
  persistHours: number
}

type PromoModalProps = {
  previewSettings?: Partial<PromoSettings>
  previewOpen?: boolean
  previewMode?: boolean
  onClose?: () => void
}

const defaultPromoSettings: PromoSettings = {
  enabled: true,
  title: 'Digital Invoicing Software Solutions for Corporate & Non-Corporate Businesses',
  subtitle: 'Create & post to FBR, professional invoices in seconds. Localized for Pakistan and compatible with tax posting requirements.',
  primaryCtaLabel: 'Contact for Demo',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: 'See Pricing',
  secondaryCtaHref: '/pricing',
  imagePath: '/images/stock/hero.png',
  displayPages: ['homepage'],
  forceShowOnHomepage: false,
  dismissDays: 0,
  // persistHours of 0 means "do not remember dismissal" -> show every time by default
  persistHours: 0,
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

export default function PromoModal({ previewSettings, previewOpen, previewMode, onClose }: PromoModalProps = {}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<PromoSettings>(defaultPromoSettings)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (previewSettings) {
      setSettings({ ...defaultPromoSettings, ...previewSettings })
      setLoaded(true)
      return
    }

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
  }, [previewSettings])

  useEffect(() => {
    if (!loaded) return
    if (previewMode && previewOpen) {
      setOpen(true)
      return
    }

    // debug: log the resolved promo settings (especially image path)
        console.log('Promo settings loaded:', settings)
        if (!settings.enabled) {
          console.log('Promo disabled via settings')
          return
        }

        const onPage = shouldShowOnPage(settings, router.pathname)
        console.log('Promo shouldShowOnPage?', onPage, 'router.pathname=', router.pathname)
        if (!onPage) return

        // If we're on the homepage and the promo is targeted at homepage,
        // always show it (ignore any previously set dismissal). This makes
        // the promo appear whenever the homepage loads as requested.
        const forceShowOnHomepage = settings.forceShowOnHomepage === true && router.pathname === '/' && Array.isArray(settings.displayPages) && settings.displayPages.includes('homepage')
        if (forceShowOnHomepage) {
          console.log('Promo forced on homepage by admin: ignoring dismissal and showing modal')
        } else {
          const dismissedAt = getDismissedTimestamp()
          // If persistHours is 0 (default), we don't persist dismissal and always show the promo
          const maxAge = typeof settings.persistHours === 'number' && settings.persistHours > 0 ? settings.persistHours * 60 * 60 * 1000 : null
          const age = dismissedAt ? Date.now() - dismissedAt : null
          console.log('Promo dismissedAt:', dismissedAt, 'age ms:', age, 'maxAge ms:', maxAge)
          if (maxAge !== null && dismissedAt && age !== null && age < maxAge) {
            console.log('Promo suppressed because dismissed recently')
            return
          }
        }

        const timer = window.setTimeout(() => setOpen(true), 700)
        return () => window.clearTimeout(timer)
  }, [loaded, settings, router.pathname, previewMode, previewOpen])

  function close(remember = true) {
    setOpen(false)
    if (previewMode) {
      remember = false
    }
    if (remember) {
      localStorage.setItem('promoModalDismissedAt', String(Date.now()))
    }
    if (previewMode && onClose) {
      onClose()
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
