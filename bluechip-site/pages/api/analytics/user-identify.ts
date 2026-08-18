import type { NextApiRequest, NextApiResponse } from 'next'

interface UserIdentification {
  sessionId: string
  email: string
  name: string
  phone?: string
  whatsapp?: string
  facebook?: string
  instagram?: string
  tiktok?: string
  source?: string
  timestamp: number
}

// Simple in-memory storage and rate limiting (production should use database)
const userDataStore: UserIdentification[] = []
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}

const RATE_LIMIT_WINDOW = 3600000 // 1 hour
const RATE_LIMIT_MAX = 10 // 10 requests per hour

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore[sessionId]

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitStore[sessionId] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return true
  }

  if (limit.count >= RATE_LIMIT_MAX) {
    return false
  }

  limit.count++
  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const identification: UserIdentification = req.body

    // Validate required fields
    if (!identification.sessionId || !identification.email || !identification.name) {
      return res.status(400).json({
        error: 'Missing required fields: sessionId, email, name',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(identification.email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Check rate limit
    if (!checkRateLimit(identification.sessionId)) {
      return res.status(429).json({
        error: 'Too many user identification requests',
        message: 'Please wait before making another identification request. Limit: 10 per hour.',
      })
    }

    // Store user data
    userDataStore.push(identification)

    // Log for debugging
    console.log('✓ User identified:', {
      sessionId: identification.sessionId,
      email: identification.email,
      name: identification.name,
      source: identification.source,
    })

    return res.status(200).json({
      success: true,
      message: 'User identified successfully',
      userId: identification.email, // Simple user ID
    })
  } catch (error) {
    console.error('Error identifying user:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
