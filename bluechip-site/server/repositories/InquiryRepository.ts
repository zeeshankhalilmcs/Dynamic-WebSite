export type Inquiry = {
  id?: string
  name: string
  first_name?: string | null
  last_name?: string | null
  company?: string | null
  phone?: string | null
  email: string
  industry?: string | null
  inquiry_type: string
  message?: string | null
  ip?: string | null
  user_agent?: string | null
  user_ip?: string | null
  country?: string | null
  region?: string | null
  city?: string | null
  is_bot?: boolean | null
  is_validated?: boolean | null
  validated_at?: string | null
  reviewed?: boolean | null
  reviewed_at?: string | null
  created_at?: string
}

export interface IInquiryRepository {
  create(inquiry: Inquiry): Promise<{ id: string; created_at: string }>
  findById(id: string): Promise<Inquiry | null>
  findAll(): Promise<Inquiry[]>
  findByFilter(filter: { query?: string; reviewed?: boolean; offset?: number; limit?: number }): Promise<Inquiry[]>
  markReviewed(id: string): Promise<void>
  getStats(): Promise<{ total: number; unreviewed: number; bot_count: number }>
  getGeoStats(): Promise<Array<{ country: string | null; count: number }>>
  getTrendStats(): Promise<Array<{ period: string; count: number }>>
}
