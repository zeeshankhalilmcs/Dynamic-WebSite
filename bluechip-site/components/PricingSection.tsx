import Link from 'next/link'
import { useState } from 'react'
import WhatsAppLeadModal from './WhatsAppLeadModal'

type PricingPlan = {
  id: string
  name: string
  price: string
  period: string
  description: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  badge?: string
  features: string[]
  highlights?: string[]
  details?: string[]
  detailTitle?: string
  monthlyPrice?: number
  yearlyPrice?: number
}

type PricingFaq = {
  question: string
  answer: string
}

type PricingPageContent = {
  heroTitle: string
  heroSubtitle: string
  heroCtaLabel: string
  heroCtaHref: string
  plans: PricingPlan[]
  comparisonTitle: string
  comparisonFeatures: Array<{ name: string; values: string[] }>
  faqTitle: string
  faqs: PricingFaq[]
}

type PricingSectionProps = {
  content: PricingPageContent
}

export default function PricingSection({ content }: PricingSectionProps) {
  const plans = content.plans ?? []
  const [billingMode, setBillingMode] = useState<'monthly' | 'yearly'>('yearly')
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; billingMode: 'monthly' | 'yearly' } | null>(null)

  const formatCurrency = (value: number) => `PKR ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(value)}`

  const getPlanPricing = (plan: PricingPlan) => {
    const monthlyAmount = typeof plan.monthlyPrice === 'number'
      ? plan.monthlyPrice
      : Number(String(plan.price).replace(/[^0-9.-]/g, '')) || null

    const yearlyDiscountedAmount = typeof plan.yearlyPrice === 'number'
      ? plan.yearlyPrice
      : monthlyAmount !== null
        ? Math.round(monthlyAmount * 12 * 0.8)
        : null

    const yearlyFullAmount = monthlyAmount !== null ? monthlyAmount * 12 : null
    const isCustomPlan = plan.price.toLowerCase() === 'custom' || monthlyAmount === null

    return { monthlyAmount, yearlyDiscountedAmount, yearlyFullAmount, isCustomPlan }
  }

  const openPlanWhatsApp = (plan: PricingPlan) => {
    setSelectedPlan({ name: plan.name, billingMode })
    setIsWhatsAppModalOpen(true)
  }

  return (
    <section id="pricing" className="scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{content.heroTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{content.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={content.heroCtaHref} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              {content.heroCtaLabel}
            </Link>
            <a href="mailto:hello@bluechipsolution.net" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              Talk to our team
            </a>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingMode('yearly')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${billingMode === 'yearly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Yearly
            </button>
            <button
              type="button"
              onClick={() => setBillingMode('monthly')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${billingMode === 'monthly' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plans.map((plan) => {
            const { monthlyAmount, yearlyDiscountedAmount, yearlyFullAmount, isCustomPlan } = getPlanPricing(plan)
            const displayPrice = billingMode === 'monthly'
              ? (monthlyAmount !== null ? formatCurrency(monthlyAmount) : plan.price)
              : (yearlyDiscountedAmount !== null ? formatCurrency(yearlyDiscountedAmount) : plan.price)
            const showYearlySavings = billingMode === 'yearly' && yearlyDiscountedAmount !== null && yearlyFullAmount !== null && yearlyDiscountedAmount < yearlyFullAmount

            return (
            <div key={plan.id} className={`flex h-full min-h-[28rem] flex-col justify-between rounded-[2rem] border p-7 shadow-sm ${plan.featured ? 'border-indigo-200 bg-gradient-to-b from-indigo-50 to-white shadow-indigo-100' : 'border-slate-200 bg-white'}`}>
              <div className="space-y-6">
                <div className="space-y-4">
                  {plan.badge ? (
                    <div>
                      <span className="rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                        {plan.badge}
                      </span>
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1.5 whitespace-nowrap">
                  <span className="text-4xl font-bold leading-tight text-slate-900">{displayPrice}</span>
                  {showYearlySavings && !isCustomPlan && (
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-slate-400 line-through">{formatCurrency(yearlyFullAmount as number)}</span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Save 20%</span>
                    </div>
                  )}
                </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-sm text-slate-700">
                    <span className="mt-0.5 text-indigo-600">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {plan.details && plan.details.length > 0 && (
                <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                  <div className="text-sm font-semibold text-slate-900">{plan.detailTitle || 'Plan details'}</div>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                    {plan.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-1 text-indigo-600">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.highlights && plan.highlights.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {plan.highlights.map((item) => (
                    <span key={item} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

              <button
                type="button"
                onClick={() => openPlanWhatsApp(plan)}
                className={`mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition ${plan.featured ? 'bg-slate-900 text-white hover:bg-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                {plan.ctaLabel}
              </button>
            </div>
            )
          })}
        </div>

        <WhatsAppLeadModal
          isOpen={isWhatsAppModalOpen}
          onClose={() => {
            setIsWhatsAppModalOpen(false)
            setSelectedPlan(null)
          }}
          planName={selectedPlan?.name}
          billingMode={selectedPlan?.billingMode}
        />

        <div className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Compare plans</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{content.comparisonTitle}</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">Each plan is designed around a different growth stage, ranging from simpler day-to-day operations to strategic multi-branch delivery.</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="grid grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] bg-slate-50 text-sm font-semibold text-slate-700">
              <div className="px-4 py-4">Capability</div>
              {content.plans.map((plan) => (
                <div key={`${plan.id}-header`} className="px-4 py-4 text-center">{plan.name}</div>
              ))}
            </div>
            {content.comparisonFeatures.map((feature) => (
              <div key={feature.name} className="grid grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] border-t border-slate-200 text-sm text-slate-600">
                <div className="px-4 py-4 font-medium text-slate-700">{feature.name}</div>
                {feature.values.map((value, index) => (
                  <div key={`${feature.name}-${index}`} className="px-4 py-4 text-center">{value}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Why teams choose us</p>
            <h3 className="mt-3 text-2xl font-semibold">A practical path from rollout to ongoing support.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">We help align the software with real operations, so teams can move quickly without sacrificing reliability or clarity.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">Implementation guidance</div>
              <div className="rounded-2xl bg-white/10 p-4">Operational continuity</div>
              <div className="rounded-2xl bg-white/10 p-4">Scalable support</div>
              <div className="rounded-2xl bg-white/10 p-4">Clear communication</div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">{content.faqTitle}</p>
            <div className="mt-6 space-y-4">
              {content.faqs.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">{item.question}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
