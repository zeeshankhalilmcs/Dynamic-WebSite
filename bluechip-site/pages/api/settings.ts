import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminSettingsService } from '../../server/services/AdminSettingsService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const service = new AdminSettingsService()
  const settings = await service.getSettings()

  const publicSettings = {
    recaptcha: {
      enabled: Boolean(settings.recaptcha?.enabled),
      siteKey: settings.recaptcha?.siteKey || '',
    },
    verification: {
      enabled: Boolean(settings.verification?.enabled),
      otpEnabled: Boolean(settings.verification?.otpEnabled),
      otpTtlMinutes: settings.verification?.otpTtlMinutes || 10,
      otpMaxAttempts: settings.verification?.otpMaxAttempts || 5,
    },
  }

  return res.status(200).json(publicSettings)
}
