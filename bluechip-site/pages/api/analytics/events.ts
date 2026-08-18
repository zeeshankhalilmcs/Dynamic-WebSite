import type { NextApiRequest, NextApiResponse } from 'next'

interface AnalyticsEvent {
  eventName: string
  sessionId: string
  eventData?: Record<string, any>
  timestamp: number
}

// Simple in-memory storage for demo (production should use database)
const eventsStore: AnalyticsEvent[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const event: AnalyticsEvent = req.body

    // Validate required fields
    if (!event.eventName || !event.sessionId) {
      return res.status(400).json({ error: 'Missing required fields: eventName, sessionId' })
    }

    // Store event
    eventsStore.push(event)

    // Log for debugging
    console.log('✓ Event tracked:', event.eventName, {
      sessionId: event.sessionId,
      data: event.eventData,
    })

    return res.status(200).json({
      success: true,
      message: 'Event tracked successfully',
    })
  } catch (error) {
    console.error('Error tracking event:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
