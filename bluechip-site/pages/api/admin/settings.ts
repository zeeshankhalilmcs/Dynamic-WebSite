import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdminAuth } from '../../../server/services/AdminAuth'
import { AdminSettingsService } from '../../../server/services/AdminSettingsService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authError = await requireAdminAuth(req)
  if (authError) {
    return res.status(401).json({ error: authError })
  }

  const service = new AdminSettingsService()

  if (req.method === 'GET') {
    const settings = await service.getSettings()
    return res.status(200).json(settings)
  }

  if (req.method === 'PUT') {
    const settings = await service.saveSettings(req.body || {})
    return res.status(200).json(settings)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
