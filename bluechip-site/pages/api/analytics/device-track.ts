import type { NextApiRequest, NextApiResponse } from 'next'
import type { DeviceInfo } from '../../../utils/deviceTracker'

// Simple in-memory storage for demo (production should use database)
const deviceDataStore: DeviceInfo[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const deviceInfo: DeviceInfo = req.body

    // Validate required fields
    if (!deviceInfo.sessionId || !deviceInfo.browser || !deviceInfo.os) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Store device data
    deviceDataStore.push(deviceInfo)
    
    // Log for debugging
    console.log('✓ Device tracked:', {
      sessionId: deviceInfo.sessionId,
      browser: `${deviceInfo.browser} ${deviceInfo.browserVersion}`,
      os: `${deviceInfo.os} ${deviceInfo.osVersion}`,
      device: deviceInfo.deviceType,
    })

    return res.status(200).json({
      success: true,
      message: 'Device tracked successfully',
    })
  } catch (error) {
    console.error('Error tracking device:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
