import { IInquiryRepository, Inquiry } from '../InquiryRepository'
import { pool } from '../../db/pool'

export class InquiryRepositoryPg implements IInquiryRepository {
  async create(inquiry: Inquiry){
    const sql = `INSERT INTO inquiries (name, first_name, last_name, company, phone, email, industry, inquiry_type, message, ip, user_agent, user_ip, country, region, city, is_bot, is_validated, reviewed) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id, created_at`
    const values = [
      inquiry.name,
      inquiry.first_name ?? null,
      inquiry.last_name ?? null,
      inquiry.company,
      inquiry.phone,
      inquiry.email,
      inquiry.industry,
      inquiry.inquiry_type,
      inquiry.message,
      inquiry.ip,
      inquiry.user_agent,
      inquiry.user_ip,
      inquiry.country,
      inquiry.region,
      inquiry.city,
      inquiry.is_bot ?? false,
      inquiry.is_validated ?? false,
      false,
    ]
    const res = await pool.query(sql, values)
    return res.rows[0]
  }

  async findById(id: string){
    const res = await pool.query('SELECT * FROM inquiries WHERE id = $1', [id])
    return res.rows[0] ?? null
  }

  async findAll(){
    const res = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC')
    return res.rows
  }

  async findByFilter(filter: { query?: string; reviewed?: boolean; offset?: number; limit?: number }){
    const conditions: string[] = []
    const values: any[] = []
    let idx = 1

    if(filter.query){
      conditions.push(`(name ILIKE $${idx} OR email ILIKE $${idx} OR company ILIKE $${idx} OR message ILIKE $${idx})`)
      values.push(`%${filter.query}%`)
      idx++
    }
    if(typeof filter.reviewed === 'boolean'){
      conditions.push(`reviewed = $${idx}`)
      values.push(filter.reviewed)
      idx++
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const limit = filter.limit ?? 20
    const offset = filter.offset ?? 0
    const sql = `SELECT * FROM inquiries ${where} ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`
    values.push(limit, offset)

    const res = await pool.query(sql, values)
    return res.rows
  }

  async markReviewed(id: string){
    await pool.query('UPDATE inquiries SET reviewed = true, reviewed_at = now() WHERE id = $1', [id])
  }

  async getStats(){
    const res = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE reviewed = false) AS unreviewed,
        COUNT(*) FILTER (WHERE is_bot = true) AS bot_count
      FROM inquiries
    `)
    return res.rows[0]
  }

  async getGeoStats(){
    const res = await pool.query(`
      SELECT country, COUNT(*) AS count
      FROM inquiries
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY count DESC
      LIMIT 10
    `)
    return res.rows
  }

  async getTrendStats(){
    const res = await pool.query(`
      SELECT to_char(created_at, 'YYYY-MM-DD') AS period, COUNT(*) AS count
      FROM inquiries
      GROUP BY period
      ORDER BY period DESC
      LIMIT 14
    `)
    return res.rows
  }
}
