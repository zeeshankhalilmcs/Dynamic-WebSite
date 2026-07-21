import { pool } from '../../db/pool'

export type InquiryStats = {
  total: number
  unreviewed: number
  bot_count: number
}

export type GeoStat = {
  country: string | null
  count: number
}

export type TrendStat = {
  period: string
  count: number
}

export async function getInquiryStats() {
  const res = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE reviewed = false) AS unreviewed,
      COUNT(*) FILTER (WHERE is_bot = true) AS bot_count
    FROM inquiries
  `)
  return res.rows[0] as InquiryStats
}

export async function getGeoStats() {
  const res = await pool.query(`
    SELECT country, COUNT(*) AS count
    FROM inquiries
    WHERE country IS NOT NULL
    GROUP BY country
    ORDER BY count DESC
    LIMIT 10
  `)
  return res.rows as GeoStat[]
}

export async function getTrendStats() {
  const res = await pool.query(`
    SELECT to_char(created_at, 'YYYY-MM-DD') AS period, COUNT(*) AS count
    FROM inquiries
    GROUP BY period
    ORDER BY period DESC
    LIMIT 14
  `)
  return res.rows as TrendStat[]
}
