import type { NextApiRequest, NextApiResponse } from 'next'
import { InquiryRepositoryPg } from '../../../server/repositories/pg/InquiryRepositoryPg'
import { requireAdminAuth } from '../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = await requireAdminAuth(req)
  if (authError) {
    return res.status(401).json({ error: authError })
  }

  const { query, reviewed, page = '1' } = req.query
  const pageNumber = Math.max(Number(page) || 1, 1)
  const limit = 20
  const offset = (pageNumber - 1) * limit
  const repo = new InquiryRepositoryPg()
  const inquiries = await repo.findByFilter({ query: typeof query === 'string' ? query : undefined, reviewed: reviewed === 'true' ? true : reviewed === 'false' ? false : undefined, offset, limit })

  res.status(200).json({ inquiries, page: pageNumber })
}
