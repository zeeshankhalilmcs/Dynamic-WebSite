import { UAParser } from 'ua-parser-js'

export interface DeviceInfo {
  sessionId: string
  browser: string
  browserVersion: string
  os: string
  osVersion: string
  deviceType: 'desktop' | 'mobile' | 'tablet'
  screenWidth: number
  screenHeight: number
  userAgent: string
  timestamp: number
}

const SESSION_STORAGE_KEY = 'bluechip_session_id'
const DEVICE_INFO_CACHE_KEY = 'bluechip_device_info'

/**
 * Generate a unique session ID using timestamp + random string
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 15)
  return `session_${timestamp}_${randomStr}`
}

/**
 * Get or create a session ID, persisted in sessionStorage
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (stored) return stored

    const newId = generateSessionId()
    sessionStorage.setItem(SESSION_STORAGE_KEY, newId)
    return newId
  } catch {
    // SessionStorage not available, return a temporary ID
    return generateSessionId()
  }
}

/**
 * Get cached device info or parse from user agent
 */
function parseDeviceInfo(): Omit<DeviceInfo, 'sessionId'> {
  if (typeof window === 'undefined') {
    return {
      browser: 'Unknown',
      browserVersion: '0',
      os: 'Unknown',
      osVersion: '0',
      deviceType: 'desktop',
      screenWidth: 0,
      screenHeight: 0,
      userAgent: '',
      timestamp: 0,
    }
  }

  // Try to get cached info
  try {
    const cached = sessionStorage.getItem(DEVICE_INFO_CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return parsed
    }
  } catch {
    // Fall through to parse
  }

  const parser = new UAParser(navigator.userAgent)
  const result = parser.getResult()

  const deviceInfo: Omit<DeviceInfo, 'sessionId'> = {
    browser: result.browser.name || 'Unknown',
    browserVersion: result.browser.version || '0',
    os: result.os.name || 'Unknown',
    osVersion: result.os.version || '0',
    deviceType: (result.device.type as 'desktop' | 'mobile' | 'tablet') || 'desktop',
    screenWidth: window.innerWidth || 0,
    screenHeight: window.innerHeight || 0,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  }

  // Cache for the session
  try {
    sessionStorage.setItem(DEVICE_INFO_CACHE_KEY, JSON.stringify(deviceInfo))
  } catch {
    // Ignore cache failures
  }

  return deviceInfo
}

/**
 * Get complete device information including session ID
 */
export function getDeviceInfo(): DeviceInfo {
  const sessionId = getOrCreateSessionId()
  const deviceInfo = parseDeviceInfo()

  return {
    ...deviceInfo,
    sessionId,
  }
}

/**
 * Create a fingerprint hash of device characteristics
 * (for analytics deduplication, not cryptographic security)
 */
export function getDeviceFingerprint(): string {
  const info = getDeviceInfo()
  const fingerprint = `${info.browser}|${info.os}|${info.screenWidth}|${info.screenHeight}|${info.deviceType}`

  // Simple hash
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}
