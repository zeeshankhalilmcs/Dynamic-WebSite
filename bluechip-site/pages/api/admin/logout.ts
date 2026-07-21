import type { NextApiRequest, NextApiResponse } from 'next'
import { revokeAdminSession } from '../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

  if (token) {
    await revokeAdminSession(token)
  }

  return res.status(200).json({ success: true })
}
