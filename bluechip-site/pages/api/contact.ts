import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { InquiryRepositoryPg } from '../../server/repositories/pg/InquiryRepositoryPg'
import { ContactService } from '../../server/services/ContactService'
import { evaluateBotSignals, getClientIp } from '../../server/services/BotProtectionService'
import { getGeoLocation } from '../../server/services/GeoService'
import { AdminSettingsService } from '../../server/services/AdminSettingsService'
import { VerificationService } from '../../server/services/VerificationService'

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  inquiryType: z.string().min(1),
  message: z.string().min(5),
  otp: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  submittedAt: z.union([z.number(), z.string()]).optional().nullable(),
})

const rateWindow = 60 * 60 * 1000
const maxPerWindow = 10
const ipMap: Map<string, { count: number; reset: number }> = new Map()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = getClientIp(req)
  const now = Date.now()
  const entry = ipMap.get(ip) || { count: 0, reset: now + rateWindow }
  if(now > entry.reset){
    entry.count = 0
    entry.reset = now + rateWindow
  }
  if(entry.count >= maxPerWindow){
    res.setHeader('Retry-After', String(Math.ceil((entry.reset - now) / 1000)))
    return res.status(429).json({ error: 'Too many requests' })
  }
  entry.count += 1
  ipMap.set(ip, entry)

  try{
    const body = schema.parse(req.body)
    const botSignals = evaluateBotSignals(req, body as Record<string, unknown>)
    if(botSignals.isBot){
      return res.status(403).json({ success: false, error: 'Request rejected', reason: botSignals.reason })
    }

    const settingsService = new AdminSettingsService()
    const settings = await settingsService.getSettings()
    const verificationEnabled = Boolean(settings.verification?.enabled)
    const otpEnabled = Boolean(settings.verification?.otpEnabled)

    let isValidated = false
    if (verificationEnabled && otpEnabled) {
      const verificationService = new VerificationService()
      const verified = await verificationService.verifyOtp(body.email, body.otp || '')
      if (!verified) {
        return res.status(401).json({ error: 'Verification failed' })
      }
      isValidated = true
    }

    const geo = getGeoLocation(ip)
    const repo = new InquiryRepositoryPg()
    const service = new ContactService(repo)
    const payload = {
      name: `${body.firstName} ${body.lastName}`.trim(),
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      company: null,
      phone: body.phone ?? null,
      industry: null,
      inquiry_type: body.inquiryType,
      message: body.message ?? null,
      ip: ip,
      user_agent: req.headers['user-agent'] || null,
      user_ip: ip,
      country: geo?.country ?? null,
      region: geo?.region ?? null,
      city: geo?.city ?? null,
      is_bot: false,
      is_validated: isValidated,
    }
    const created = await service.createInquiry(payload as any)
    res.status(201).json({ success: true, id: created.id, isValidated })
  }catch(err:any){
    console.error(err)
    if(err?.issues) return res.status(400).json({ error: 'Validation failed', details: err.issues })
    res.status(500).json({ error: 'Internal error' })
  }
}
