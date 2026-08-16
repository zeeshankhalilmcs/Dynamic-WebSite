import Link from 'next/link'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'

type FeatureItem = {
  title: string
  description: string
  icon?: string
}

type BenefitItem = {
  icon?: string
  title: string
  description: string
}

type ModuleItem = {
  name: string
  icon?: string
}

type SolutionPageLayoutProps = {
  eyebrow: string
  title: string
  subtitle: string
  heroBullets: string[]
  features?: FeatureItem[]
  counterFeatures?: FeatureItem[]
  branchesFeatures?: FeatureItem[]
  benefits: BenefitItem[]
  modules?: ModuleItem[]
  ctaLabel: string
  ctaHref: string
  extraContent?: React.ReactNode
}

export default function SolutionPageLayout({
  eyebrow,
  title,
  subtitle,
  heroBullets,
  features,
  counterFeatures,
  branchesFeatures,
  benefits,
  modules,
  ctaLabel,
  ctaHref,
  extraContent,
}: SolutionPageLayoutProps) {
  // Determine if using workflow stages (counterFeatures + branchesFeatures) or flat features
  const hasWorkflowStages = counterFeatures && branchesFeatures
  const allFeatures = features || []
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <AnnouncementBar />
      <main className="container py-16 lg:py-24">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">{eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={ctaHref} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  {ctaLabel}
                </Link>
                <Link href="/pricing" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  View pricing
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-slate-900 p-7 text-white shadow-lg">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Why teams choose it</div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {heroBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Features Section - Support both workflow stages and flat layout */}
        {hasWorkflowStages ? (
          <>
            {/* Workflow Stage 1: Counter */}
            <section className="mt-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">At the Counter</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Fast checkout that keeps operations smooth</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {counterFeatures!.map((feature, index) => (
                  <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Workflow Stage 2: Branches */}
            <section className="mt-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Across Branches</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Visibility and control across every location</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {branchesFeatures!.map((feature, index) => (
                  <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
                        {index + 3}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Fallback: Regular features grid */
          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            {allFeatures.map((feature, index) => (
              <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Benefits Section - Individual Cards */}
        <section className="mt-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Why it works</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Built to make retail simpler</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                {benefit.icon && <div className="text-3xl">{benefit.icon}</div>}
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modules Section - 4-column grid with icons */}
        {modules && modules.length > 0 && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Key modules</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Everything you need, built in</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <div key={module.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:bg-slate-100">
                  {module.icon && <div className="text-2xl">{module.icon}</div>}
                  <p className="mt-2 text-sm font-semibold text-slate-900">{module.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {extraContent}

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Ready to discuss your next step?</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Let’s shape a solution around your team’s workflow and growth goals.</h2>
            </div>
            <Link href={ctaHref} className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              {ctaLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
