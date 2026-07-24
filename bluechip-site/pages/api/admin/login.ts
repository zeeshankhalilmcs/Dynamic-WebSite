import type { NextApiRequest, NextApiResponse } from 'next'
import { createAdminJwt } from '../../../server/services/AdminAuth'
import { AdminUserService } from '../../../server/services/AdminUserService'
import { AdminSettingsService } from '../../../server/services/AdminSettingsService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, username, password } = req.body || {}

  try {
    if (typeof username === 'string' && username.trim() && typeof password === 'string' && password.trim()) {
      const userService = new AdminUserService()
      await userService.ensureSeedSuperAdmin()
      const user = await userService.validateCredentials(username, password)
      if (!user) {
        return res.status(401).json({ error: 'Invalid admin credentials' })
      }

      const jwt = await createAdminJwt(`${user.id}:${user.role}`)
      return res.status(200).json({ token: jwt, user: { username: user.username, email: user.email, role: user.role } })
    }

    if (!token || typeof token !== 'string' || !token.trim()) {
      return res.status(400).json({ error: 'Admin credentials or token is required' })
    }

    const settingsService = new AdminSettingsService()
    const expectedToken = await settingsService.getAdminFallbackToken()
    if (!expectedToken || token !== expectedToken) {
      return res.status(401).json({ error: 'Invalid admin token' })
    }

    const jwt = await createAdminJwt(token)
    return res.status(200).json({ token: jwt })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Unable to issue admin token' })
  }
}
