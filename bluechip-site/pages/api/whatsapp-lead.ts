import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { evaluateBotSignals, getClientIp } from '../../server/services/BotProtectionService'
import { getGeoLocation } from '../../server/services/GeoService'
import { LeadQueueService } from '../../server/services/LeadQueueService'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
})

function normalizeEmailFromPhone(phone: string) {
  const digits = phone.replace(/[^0-9]/g, '')
  const sanitized = digits ? `whatsapp-${digits}` : `whatsapp-${Date.now()}`
  return `${sanitized}@whatsapp.local`
}

function parseName(name: string) {
  const parts = name.trim().split(/\s+/)
  return {
    firstName: parts[0] || name,
    lastName: parts.slice(1).join(' ') || null,
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = schema.parse(req.body)
    const botSignals = evaluateBotSignals(req, body as Record<string, unknown>)
    if (botSignals.isBot) {
      return res.status(403).json({ success: false, error: 'Request rejected', reason: botSignals.reason })
    }

    const ip = getClientIp(req)
    const geo = getGeoLocation(ip)
    const { firstName, lastName } = parseName(body.name)

    const payload = {
      name: body.name,
      first_name: firstName,
      last_name: lastName,
      company: null,
      phone: body.phone,
      email: normalizeEmailFromPhone(body.phone),
      industry: null,
      inquiry_type: 'WhatsApp Lead',
      message: 'User requested a WhatsApp conversation.',
      ip,
      user_agent: req.headers['user-agent'] || null,
      user_ip: ip,
      country: geo?.country ?? null,
      region: geo?.region ?? null,
      city: geo?.city ?? null,
      is_bot: false,
      is_validated: false,
      reviewed: false,
    }

    const queueService = new LeadQueueService()

    try {
      const service = new LeadQueueService()
      const persisted = await service.flushPendingLeads()
      if (persisted.processed > 0) {
        console.info('Flushed pending leads:', persisted.processed)
      }
    } catch (retryError) {
      console.error('Pending lead flush failed:', retryError)
    }

    try {
      const service = new LeadQueueService()
      await service.enqueueLead(payload)
      return res.status(201).json({ success: true, persisted: false, queued: true })
    } catch (persistenceError) {
      console.error('WhatsApp lead queueing failed:', persistenceError)
      return res.status(200).json({ success: true, persisted: false, queued: false })
    }
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues })
    }
    console.error(error)
    return res.status(500).json({ error: 'Unable to save WhatsApp lead' })
  }
}
