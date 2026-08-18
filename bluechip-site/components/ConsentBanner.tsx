import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem('analytics-consent')
    if (savedConsent) {
      setIsAccepted(JSON.parse(savedConsent))
    } else {
      // Show banner if no consent saved and not admin page
      if (!router.pathname.startsWith('/admin')) {
        setShowBanner(true)
      }
    }
  }, [router.pathname])

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', JSON.stringify(true))
    setIsAccepted(true)
    setShowBanner(false)
    
    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const handleReject = () => {
    localStorage.setItem('analytics-consent', JSON.stringify(false))
    setIsAccepted(false)
    setShowBanner(false)
    
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
  }

  if (!showBanner || isAccepted !== null) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-cyan-500/30 p-4 sm:p-6 z-50 shadow-lg">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Analytics & Tracking</h3>
            <p className="text-sm text-slate-300 leading-6">
              We use analytics to understand how you use our site and improve your experience. This includes 
              tracking your device, location, and form submissions. 
              <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 ml-1">
                Learn more about our privacy practices
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:border-slate-500 hover:text-white transition"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition"
            >
              Accept
            </button>
          </div>
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
