import { PricingRepositoryPg } from '../repositories/pg/PricingRepositoryPg'
import { defaultPricingPageContent, type PricingPageContent } from '../repositories/PricingRepository'

export class PricingService {
  constructor(private readonly repo = new PricingRepositoryPg()) {}

  async getPricingPageContent(): Promise<PricingPageContent> {
    try {
      return await this.repo.getPageContent()
    } catch {
      return {
        ...defaultPricingPageContent,
        plans: defaultPricingPageContent.plans.map((plan) => ({ ...plan, features: [...plan.features] })),
      }
    }
  }

  async savePricingPageContent(content: PricingPageContent): Promise<PricingPageContent> {
    try {
      return await this.repo.savePageContent(content)
    } catch {
      return content
    }
  }
}
