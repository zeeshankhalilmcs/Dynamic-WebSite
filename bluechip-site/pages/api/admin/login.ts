import type { NextApiRequest, NextApiResponse } from 'next'
import { createAdminJwt } from '../../../server/services/AdminAuth'

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_EXPORT_TOKEN || process.env.ADMIN_UI_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body || {}
  if (!token || typeof token !== 'string' || !token.trim()) {
    return res.status(400).json({ error: 'Admin token is required' })
  }

  if (!ADMIN_SECRET) {
    return res.status(500).json({ error: 'Admin JWT secret is not configured' })
  }

  const expectedToken = process.env.ADMIN_EXPORT_TOKEN || process.env.ADMIN_UI_TOKEN
  if (!expectedToken || token !== expectedToken) {
    return res.status(401).json({ error: 'Invalid admin token' })
  }

  try {
    const jwt = await createAdminJwt(token)
    return res.status(200).json({ token: jwt })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Unable to issue admin token' })
  }
}
