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

  const repo = new InquiryRepositoryPg()
  const stats = await repo.getStats()
  const geo = await repo.getGeoStats()
  const trend = await repo.getTrendStats()

  res.status(200).json({ stats, geo, trend })
}
