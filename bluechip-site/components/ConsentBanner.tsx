import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const CONSENT_STORAGE_KEY = 'site_consent'
const CONSENT_VERSION = '2026-01'

type ConsentState = {
  status: 'accepted' | 'rejected'
  version: string
  timestamp: string
}

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname.startsWith('/admin')) {
      setShowBanner(false)
      setIsAccepted(null)
      return
    }

    try {
      const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY)
      if (!savedConsent) {
        setShowBanner(true)
        return
      }

      const parsed = JSON.parse(savedConsent) as ConsentState
      const isCurrentVersion = parsed?.version === CONSENT_VERSION
      const hasAccepted = parsed?.status === 'accepted' && isCurrentVersion

      setIsAccepted(hasAccepted)
      setShowBanner(!hasAccepted)
    } catch {
      setShowBanner(true)
      setIsAccepted(null)
    }
  }, [router.pathname])

  const handleAccept = () => {
    const payload: ConsentState = {
      status: 'accepted',
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
    setIsAccepted(true)
    setShowBanner(false)

    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const handleReadTerms = () => {
    router.push('/terms')
  }

  if (!showBanner || isAccepted !== null) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-[1040px] -translate-x-1/2 rounded-[18px] border border-cyan-500/30 bg-slate-900/95 shadow-[0_16px_40px_rgba(6,182,212,0.12)] backdrop-blur-sm sm:bottom-5">
      <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
        <div className="flex min-w-0 items-start gap-3 text-sm leading-6 text-slate-200 sm:text-[15px]">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-base sm:h-8 sm:w-8">
            🍪
          </span>

          <p className="min-w-0 text-left text-slate-200">
            By using this site you agree to our use of cookies and accept our{' '}
            <button
              type="button"
              onClick={handleReadTerms}
              className="font-medium text-cyan-400 underline decoration-cyan-400/60 underline-offset-2 transition hover:text-cyan-300"
            >
              Terms & Conditions
            </button>
            . We use cookies to improve your experience.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleReadTerms}
            className="rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-100 transition hover:border-slate-500 hover:text-white sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Read terms
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
