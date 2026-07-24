import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PricingSection from '../components/PricingSection'
import type { PricingPageContent } from '../server/repositories/PricingRepository'
import { defaultPricingPageContent } from '../server/repositories/PricingRepository'

export default function PricingPage() {
  const [content, setContent] = useState<PricingPageContent>(defaultPricingPageContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadPricingContent() {
      try {
        const response = await fetch('/api/pricing')
        if (!response.ok) {
          throw new Error('Failed to load pricing content')
        }

        const json = await response.json()
        if (isMounted) {
          setContent(json)
        }
      } catch {
        if (isMounted) {
          setContent(defaultPricingPageContent)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPricingContent()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <Header />
      <main>
        {loading ? (
          <div className="container py-16 lg:py-24">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Loading your plan options…</h1>
            </div>
          </div>
        ) : (
          <PricingSection content={content} />
        )}
      </main>
      <Footer />
    </div>
  )
}
