import type { NextApiRequest, NextApiResponse } from 'next'
import { getGeoLocation } from '../../../server/services/GeoService'
import crypto from 'crypto'

interface LocationTrackRequest {
  sessionId: string
}

interface LocationTrackResponse {
  sessionId: string
  country: string | null
  region: string | null
  city: string | null
  hashedIp: string
  timestamp: number
}

// Simple in-memory storage for demo (production should use database)
const locationDataStore: LocationTrackResponse[] = []

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16)
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body: LocationTrackRequest = req.body

    // Validate required fields
    if (!body.sessionId) {
      return res.status(400).json({ error: 'Missing required field: sessionId' })
    }

    // Get client IP from request
    const clientIp = getClientIp(req)

    // Get geolocation data
    const geoLocation = getGeoLocation(clientIp)

    const locationData: LocationTrackResponse = {
      sessionId: body.sessionId,
      country: geoLocation?.country ?? null,
      region: geoLocation?.region ?? null,
      city: geoLocation?.city ?? null,
      hashedIp: hashIp(clientIp),
      timestamp: Date.now(),
    }

    // Store location data
    locationDataStore.push(locationData)

    // Log for debugging
    console.log('✓ Location tracked:', {
      sessionId: body.sessionId,
      country: geoLocation?.country,
      region: geoLocation?.region,
      city: geoLocation?.city,
      ip: clientIp,
    })

    return res.status(200).json({
      success: true,
      message: 'Location tracked successfully',
      location: {
        country: locationData.country,
        region: locationData.region,
        city: locationData.city,
      },
    })
  } catch (error) {
    console.error('Error tracking location:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
