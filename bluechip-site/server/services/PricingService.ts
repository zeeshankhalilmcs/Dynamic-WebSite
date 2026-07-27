import { PricingRepositoryPg } from '../repositories/pg/PricingRepositoryPg'
import { defaultPricingPageContent, type PricingPageContent, type PricingPlan } from '../repositories/PricingRepository'

export class PricingService {
  private normalizePricingContent(content: PricingPageContent): PricingPageContent {
    const fallbackPlans = defaultPricingPageContent.plans
    const normalizedPlans = (content.plans ?? []).map((plan) => {
      const fallbackPlan = fallbackPlans.find((item) => item.id === plan.id)
      return {
        ...fallbackPlan,
        ...plan,
        features: Array.isArray(plan.features) ? [...plan.features] : [...(fallbackPlan?.features ?? [])],
        highlights: Array.isArray(plan.highlights) ? [...plan.highlights] : fallbackPlan?.highlights ? [...fallbackPlan.highlights] : undefined,
        details: Array.isArray(plan.details) ? [...plan.details] : fallbackPlan?.details ? [...fallbackPlan.details] : undefined,
        monthlyPrice: typeof plan.monthlyPrice === 'number' ? plan.monthlyPrice : fallbackPlan?.monthlyPrice,
        yearlyPrice: typeof plan.yearlyPrice === 'number' ? plan.yearlyPrice : fallbackPlan?.yearlyPrice,
      } as PricingPlan
    })

    return {
      ...defaultPricingPageContent,
      ...content,
      plans: normalizedPlans,
    }
  }
  constructor(private readonly repo = new PricingRepositoryPg()) {}

  async getPricingPageContent(): Promise<PricingPageContent> {
    try {
      const content = await this.repo.getPageContent()
      return this.normalizePricingContent(content)
    } catch {
      return {
        ...defaultPricingPageContent,
        plans: defaultPricingPageContent.plans.map((plan) => ({ ...plan, features: [...plan.features] })),
      }
    }
  }

  async savePricingPageContent(content: PricingPageContent): Promise<PricingPageContent> {
    try {
      return this.normalizePricingContent(await this.repo.savePageContent(content))
    } catch {
      return this.normalizePricingContent(content)
    }
  }
}
