import { AdminSettingsRepositoryPg } from '../repositories/pg/AdminSettingsRepositoryPg'
import type { AdminSettings } from '../repositories/AdminSettingsRepository'

export class AdminSettingsService {
  constructor(private readonly repo = new AdminSettingsRepositoryPg()) {}

  async getSettings(): Promise<AdminSettings> {
    return this.repo.getAll()
  }

  async saveSettings(settings: AdminSettings): Promise<AdminSettings> {
    return this.repo.save(settings)
  }
}
