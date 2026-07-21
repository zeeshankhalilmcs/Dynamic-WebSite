import type { NextApiRequest, NextApiResponse } from 'next'
import { InquiryRepositoryPg } from '../../../server/repositories/pg/InquiryRepositoryPg'
import { requireAdminAuth } from '../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = await requireAdminAuth(req)
  if (authError) {
    return res.status(401).json({ error: authError })
  }

  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: 'Missing inquiry id' })
  }

  const repo = new InquiryRepositoryPg()
  await repo.markReviewed(id)
  res.status(200).json({ success: true })
}
