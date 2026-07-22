import { AdminSettingsRepositoryPg } from '../repositories/pg/AdminSettingsRepositoryPg'
import type { AdminSettings } from '../repositories/AdminSettingsRepository'

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
}
