import type { NextApiRequest } from 'next'

export type BotSignal = {
  isBot: boolean
  reason: string | null
}

const BOT_USER_AGENTS = [
  'curl',
  'python-requests',
  'go-http-client',
  'wget',
  'headlesschrome',
  'bot',
  'spider',
  'slurp',
  'crawler',
]

export function evaluateBotSignals(req: NextApiRequest, body: Record<string, unknown>): BotSignal {
  const userAgent = String(req.headers['user-agent'] || '').toLowerCase()
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
  const honeypot = String((body as Record<string, unknown>)?.website || '').trim()
  const submissionTime = Number((body as Record<string, unknown>)?.submittedAt || 0)
  const now = Date.now()

  const suspiciousUserAgent = BOT_USER_AGENTS.some((token) => userAgent.includes(token))
  const hasHoneypot = honeypot.length > 0
  const tooFast = submissionTime > 0 && now - submissionTime < 2500

  if (suspiciousUserAgent || hasHoneypot || tooFast) {
    return {
      isBot: true,
      reason: suspiciousUserAgent ? 'suspicious-user-agent' : hasHoneypot ? 'honeypot' : 'too-fast',
    }
  }

  return { isBot: false, reason: null }
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (Array.isArray(forwarded)) {
    return forwarded[0] || 'unknown'
  }
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : String(req.socket.remoteAddress || 'unknown')
}
