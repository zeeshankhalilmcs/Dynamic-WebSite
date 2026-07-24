import crypto from 'crypto'
import { AdminSettingsRepositoryPg } from '../repositories/pg/AdminSettingsRepositoryPg'
import type { AdminSettings } from '../repositories/AdminSettingsRepository'
import { defaultPricingPageContent } from '../repositories/PricingRepository'

export class AdminSettingsService {
  private static memoryStore: AdminSettings = {}

  constructor(private readonly repo = new AdminSettingsRepositoryPg()) {}

  async getSettings(): Promise<AdminSettings> {
    try {
      const settings = await this.repo.getAll()
      if (settings && Object.keys(settings).length > 0) {
        AdminSettingsService.memoryStore = settings
      }
      return settings
    } catch {
      return { ...AdminSettingsService.memoryStore }
    }
  }

  async saveSettings(settings: AdminSettings): Promise<AdminSettings> {
    try {
      const persisted = await this.repo.save(settings)
      AdminSettingsService.memoryStore = persisted
      return persisted
    } catch {
      AdminSettingsService.memoryStore = { ...AdminSettingsService.memoryStore, ...settings }
      return { ...AdminSettingsService.memoryStore }
    }
  }

  async getAdminFallbackToken(): Promise<string | null> {
    const settings = await this.getSettings()
    return settings.admin?.fallbackToken ?? null
  }

  async ensureAdminFallbackToken(): Promise<string> {
    const settings = await this.getSettings()
    if (settings.admin?.fallbackToken) {
      return settings.admin.fallbackToken
    }

    const token = crypto.randomBytes(16).toString('hex')
    const newSettings = {
      ...settings,
      admin: {
        ...settings.admin,
        fallbackToken: token,
      },
    }
    await this.saveSettings(newSettings)
    return token
  }

  async getPricingSettings(): Promise<AdminSettings['pricing']> {
    const settings = await this.getSettings()
    return settings.pricing || {}
  }

  async savePricingSettings(pricing: AdminSettings['pricing']): Promise<AdminSettings['pricing']> {
    const settings = await this.getSettings()
    const nextSettings = {
      ...settings,
      pricing,
    }
    await this.saveSettings(nextSettings)
    return pricing || {}
  }
}
