import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'
import WhatsAppLeadModal from './WhatsAppLeadModal'

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
  heroBackgroundImage?: string
  features?: FeatureItem[]
  counterFeatures?: FeatureItem[]
  branchesFeatures?: FeatureItem[]
  benefits: BenefitItem[]
  modules?: ModuleItem[]
  ctaLabel: string
  ctaHref: string
  extraContent?: React.ReactNode
  afterCtaContent?: React.ReactNode
  afterClientsContent?: React.ReactNode
  counterSectionLabel?: string
  counterHeading?: string
  branchesSectionLabel?: string
  branchesHeading?: string
  benefitsHeading?: string
}

export default function SolutionPageLayout({
  eyebrow,
  title,
  subtitle,
  heroBullets,
  heroBackgroundImage,
  features,
  counterFeatures,
  branchesFeatures,
  benefits,
  modules,
  ctaLabel,
  ctaHref,
  extraContent,
  afterCtaContent,
  afterClientsContent,
  counterSectionLabel = 'At the Counter',
  counterHeading = 'Fast checkout that keeps operations smooth',
  branchesSectionLabel = 'Across Branches',
  branchesHeading = 'Visibility and control across every location',
  benefitsHeading = 'Built to make retail simpler',
}: SolutionPageLayoutProps) {
  // Determine if using workflow stages (counterFeatures + branchesFeatures) or flat features
  const hasWorkflowStages = counterFeatures && branchesFeatures
  const allFeatures = features || []
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false)

  const isContactCta = ctaHref === '/contact'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <AnnouncementBar />
      <main className="w-full overflow-x-hidden">
        <section
          className="relative flex min-h-[70vh] w-full flex-col justify-center overflow-hidden rounded-none bg-white px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32"
          style={
            heroBackgroundImage
              ? {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.38)), url(${heroBackgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-cyan-900/20 sm:text-xs sm:tracking-[0.2em]">{eyebrow}</p>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white drop-shadow-md sm:text-3xl lg:text-5xl">{title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 drop-shadow-sm sm:text-lg sm:leading-8">{subtitle}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {isContactCta ? (
                    <button
                      type="button"
                      onClick={() => setIsWhatsAppModalOpen(true)}
                      className="w-full rounded-full border border-cyan-400/50 bg-slate-900/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-slate-900/60 sm:w-auto"
                    >
                      {ctaLabel}
                    </button>
                  ) : (
                    <Link href={ctaHref} className="w-full rounded-full border border-cyan-400/50 bg-slate-900/40 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-slate-900/60 sm:w-auto">
                      {ctaLabel}
                    </Link>
                  )}
                  <Link href="/pricing" className="w-full rounded-full border border-cyan-400/50 bg-slate-900/40 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-slate-900/60 sm:w-auto">
                    View pricing
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-900/90 p-5 text-white shadow-lg backdrop-blur-sm sm:rounded-[1.75rem] sm:p-7">
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
          </div>
        </section>

        {hasWorkflowStages ? (
          <>
            <section className="flex min-h-[60vh] w-full flex-col justify-center rounded-none bg-slate-900 px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32">
              <div className="mx-auto mb-8 w-full max-w-7xl sm:mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:text-sm">{counterSectionLabel}</p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{counterHeading}</h2>
              </div>
              <div className="mx-auto grid w-full max-w-7xl gap-4 sm:gap-6 lg:grid-cols-2">
                {counterFeatures!.map((feature, index) => (
                  <div key={feature.title} className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/20 text-lg font-bold text-cyan-300">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex min-h-[60vh] w-full flex-col justify-center rounded-none bg-white px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32">
              <div className="mx-auto w-full max-w-7xl">
                <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 sm:text-sm">{branchesSectionLabel}</p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">{branchesHeading}</h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:mt-8">
                      {branchesFeatures!.slice(0, 6).map((feature, index) => (
                        <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-indigo-200 hover:bg-white">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                              {index + 1}
                            </span>
                            <span className="h-px flex-1 bg-slate-200" />
                          </div>
                          <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.35)]">
                      <img
                        src="/images/blog/accros-branches-image.png"
                        alt="Multi-branch retail operations overview"
                        className="h-[420px] w-full object-cover object-center lg:h-[560px]"
                      />
                    </div>

                    <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-slate-900/90 p-4 text-white shadow-xl backdrop-blur-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Unified control</p>
                      <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                        <span>Stock</span>
                        <span className="text-slate-300">•</span>
                        <span>Pricing</span>
                        <span className="text-slate-300">•</span>
                        <span>Sales</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-slate-900 px-8 py-20 lg:px-12 lg:py-32">
            <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3">
              {allFeatures.map((feature, index) => (
                <div key={feature.title} className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80">
                  {feature.icon && <div className="text-3xl">{feature.icon}</div>}
                  <h3 className="mt-3 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="flex min-h-screen w-full flex-col justify-center rounded-none bg-slate-900 px-8 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto mb-10 w-full max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">Why it works</p>
            <h2 className="mt-3 text-3xl font-bold text-white">{benefitsHeading}</h2>
          </div>
          <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-cyan-500/30 bg-slate-800/60 p-6 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-slate-800/80">
                {benefit.icon && <div className="text-4xl">{benefit.icon}</div>}
                <h3 className="mt-4 text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {modules && modules.length > 0 && (
          <section className="flex min-h-[60vh] w-full flex-col justify-center rounded-none bg-white px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32">
            <div className="mx-auto w-full max-w-7xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 sm:text-sm">Key modules</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Everything you need, built in</h2>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:mt-8">
                    {modules.slice(0, 8).map((module, index) => (
                      <div key={module.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:border-indigo-200 hover:bg-white hover:shadow-md">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {index + 1}
                          </span>
                          <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        {module.icon && <div className="text-2xl">{module.icon}</div>}
                        <p className="mt-3 text-sm font-semibold text-slate-900">{module.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.35)]">
                    <img
                      src="/images/blog/key-modules.jpg"
                      alt="Retail POS key modules overview"
                      className="h-[420px] w-full object-cover object-center lg:h-[560px]"
                    />
                  </div>

                  <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-slate-900/90 p-4 text-white shadow-xl backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Core retail stack</p>
                    <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                      <span>POS</span>
                      <span className="text-slate-300">•</span>
                      <span>Stock</span>
                      <span className="text-slate-300">•</span>
                      <span>Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {extraContent && (
          <div className="w-full bg-slate-900 px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-32">
            <div className="mx-auto w-full max-w-7xl">{extraContent}</div>
          </div>
        )}

        <section className="flex min-h-[50vh] w-full items-center justify-center rounded-none bg-slate-900 px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:text-sm">Ready to discuss your next step?</p>
              <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Ready to streamline your retail operations?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                A modern retail management system for marts, supermarkets, and growing multi-store businesses, built to improve retail POS efficiency, inventory control, branch reporting, and operational visibility.
              </p>
            </div>
            {isContactCta ? (
              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="w-full whitespace-nowrap rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 sm:w-auto"
              >
                {ctaLabel}
              </button>
            ) : (
              <Link href={ctaHref} className="w-full whitespace-nowrap rounded-full bg-cyan-500 px-8 py-3 text-center text-sm font-semibold text-slate-900 transition duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 sm:w-auto">
                {ctaLabel}
              </Link>
            )}
          </div>
        </section>

        {afterCtaContent && (
          <div className="w-full bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto w-full max-w-7xl">{afterCtaContent}</div>
          </div>
        )}

        {afterClientsContent && (
          <section className="flex min-h-[60vh] w-full flex-col justify-center rounded-none bg-slate-900 px-4 py-14 sm:px-8 sm:py-20 lg:min-h-screen lg:px-12 lg:py-32">
            <div className="mx-auto w-full max-w-7xl">{afterClientsContent}</div>
          </section>
        )}

        <WhatsAppLeadModal
          isOpen={isWhatsAppModalOpen}
          onClose={() => setIsWhatsAppModalOpen(false)}
        />
      </main>
      <Footer />
    </div>
  )
}
