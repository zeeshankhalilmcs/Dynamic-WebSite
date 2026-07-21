import type { NextApiRequest, NextApiResponse } from 'next'
import { VerificationService } from '../../../server/services/VerificationService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const service = new VerificationService()
  const result = await service.requestOtp(email)
  return res.status(200).json({ success: true, otp: result.otp })
}
