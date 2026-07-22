import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminUserService } from '../../../server/services/AdminUserService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const service = new AdminUserService()
    const user = await service.ensureSeedSuperAdmin()
    return res.status(200).json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Unable to seed super admin' })
  }
}
