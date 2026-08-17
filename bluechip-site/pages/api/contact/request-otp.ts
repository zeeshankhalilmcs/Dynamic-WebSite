import type { NextApiRequest, NextApiResponse } from 'next'
import { VerificationService } from '../../../server/services/VerificationService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' })
  }

  try {
    const service = new VerificationService()
    await service.requestOtp(email)

    return res.status(200).json({
      success: true,
      message: 'If the address is valid, a verification code has been sent.'
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send verification code.'

    if (message.includes('Too many OTP requests') || message.includes('Please wait before requesting')) {
      return res.status(429).json({ error: message })
    }

    if (message.includes('Invalid email')) {
      return res.status(400).json({ error: message })
    }

    console.error('OTP_REQUEST_ERROR', { email, message })
    return res.status(500).json({ error: 'Unable to send verification code. Please try again later.' })
  }
}
