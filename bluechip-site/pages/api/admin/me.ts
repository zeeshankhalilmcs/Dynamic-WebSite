import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdminAuth } from '../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = await requireAdminAuth(req)
  if (authError) {
    return res.status(401).json({ error: authError })
  }

  return res.status(200).json({ authenticated: true })
}
