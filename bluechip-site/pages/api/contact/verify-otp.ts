import type { NextApiRequest, NextApiResponse } from 'next'
import { VerificationService } from '../../../server/services/VerificationService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, otp } = req.body || {}
  if (!email || typeof email !== 'string' || !email.trim() || !otp || typeof otp !== 'string') {
    return res.status(400).json({ error: 'Email and OTP are required' })
  }

  const service = new VerificationService()
  const verified = await service.verifyOtp(email, otp)
  return res.status(verified ? 200 : 401).json({ success: verified })
}
