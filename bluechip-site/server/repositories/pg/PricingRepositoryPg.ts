import type { IPricingRepository, PricingPageContent } from '../PricingRepository'
import { defaultPricingPageContent } from '../PricingRepository'

export class PricingRepositoryPg implements IPricingRepository {
  private static readonly tableName = 'pricing_page_content'

  private async getPool() {
    const { pool } = await import('../../db/pool')
    return pool
  }

  async getPageContent(): Promise<PricingPageContent> {
    const pool = await this.getPool()
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pricing_page_content (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb NOT NULL,
        updated_at timestamptz DEFAULT now()
      )
    `)

    const res = await pool.query('SELECT value FROM pricing_page_content WHERE key = $1', ['pricing'])
    if (res.rows.length === 0) {
      return { ...defaultPricingPageContent, plans: defaultPricingPageContent.plans.map((plan) => ({ ...plan, features: [...plan.features] })) }
    }

    return res.rows[0].value as PricingPageContent
  }

  async savePageContent(content: PricingPageContent): Promise<PricingPageContent> {
    const pool = await this.getPool()
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pricing_page_content (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb NOT NULL,
        updated_at timestamptz DEFAULT now()
      )
    `)

    await pool.query(
      `INSERT INTO pricing_page_content (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      ['pricing', content]
    )

    return this.getPageContent()
  }
}
