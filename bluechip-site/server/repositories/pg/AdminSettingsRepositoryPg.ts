import { pool } from '../../db/pool'
import type { AdminSettings, IAdminSettingsRepository } from '../AdminSettingsRepository'

export class AdminSettingsRepositoryPg implements IAdminSettingsRepository {
  async getAll(): Promise<AdminSettings> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb NOT NULL,
        updated_at timestamptz DEFAULT now()
      )
    `)

    const res = await pool.query('SELECT key, value FROM admin_settings')
    const settings: AdminSettings = {}

    for (const row of res.rows as Array<{ key: string; value: unknown }>) {
      ;(settings as Record<string, unknown>)[row.key] = row.value
    }

    return settings
  }

  async save(settings: AdminSettings): Promise<AdminSettings> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb NOT NULL,
        updated_at timestamptz DEFAULT now()
      )
    `)

    const entries = Object.entries(settings)
    for (const [key, value] of entries) {
      await pool.query(
        `INSERT INTO admin_settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, value]
      )
    }

    return this.getAll()
  }
}
