import Link from 'next/link'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'

type FeatureItem = {
  title: string
  description: string
}

type SolutionPageLayoutProps = {
  eyebrow: string
  title: string
  subtitle: string
  heroBullets: string[]
  features: FeatureItem[]
  benefits: FeatureItem[]
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
  benefits,
  ctaLabel,
  ctaHref,
  extraContent,
}: SolutionPageLayoutProps) {
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

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm" style={{ animationDelay: `${index * 100}ms` }}>
              <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 p-8 text-white shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Built for growth</p>
              <h2 className="mt-3 text-3xl font-bold">A polished digital platform from day one.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                The solution is designed to feel professional, dependable, and easy to manage for teams that need clarity and momentum.
              </p>
            </div>
            <div className="grid gap-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
