import { useEffect, useCallback, useState } from 'react'

export interface AnalyticsEvent {
  eventName: string
  sessionId: string
  eventData?: Record<string, any>
  timestamp: number
}

export interface UserIdentification {
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

/**
 * Custom hook for analytics tracking
 * - All operations are deferred to useEffect (client-only)
 * - Integrates with both custom API and Google Analytics
 * - Lazy loads deviceTracker to avoid SSR compilation issues
 */
export function useAnalytics() {
  const [sessionId, setSessionId] = useState<string>('')

  // Initialize session ID on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const { getOrCreateSessionId } = await import('../utils/deviceTracker')
        const id = getOrCreateSessionId()
        setSessionId(id)
      } catch (error) {
        console.error('Failed to initialize session:', error)
      }
    }

    if (typeof window !== 'undefined' && !sessionId) {
      initializeSession()
    }
  }, [sessionId])

  // Track device info on mount (once per session)
  useEffect(() => {
    const trackDevice = async () => {
      try {
        // Dynamically import deviceTracker to avoid SSR issues
        const { getDeviceInfo } = await import('../utils/deviceTracker')
        const deviceInfo = getDeviceInfo()
        const response = await fetch('/api/analytics/device-track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deviceInfo),
        })

        if (!response.ok) {
          console.warn('Failed to track device:', response.statusText)
        }
      } catch (error) {
        console.error('Error tracking device:', error)
      }
    }

    // Only track once per session
    if (typeof window !== 'undefined' && !sessionStorage.getItem('device_tracked')) {
      trackDevice()
      sessionStorage.setItem('device_tracked', 'true')
    }
  }, [])

  /**
   * Track a custom event
   */
  const trackEvent = useCallback(
    async (eventName: string, eventData?: Record<string, any>) => {
      if (typeof window === 'undefined') return

      const event: AnalyticsEvent = {
        eventName,
        sessionId,
        eventData,
        timestamp: Date.now(),
      }

      try {
        // Send to custom API
        await fetch('/api/analytics/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        }).catch(() => {
          // Silently fail if API unavailable
        })

        // Send to Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', eventName, eventData)
        }
      } catch (error) {
        console.error('Error tracking event:', error)
      }
    },
    [sessionId]
  )

  /**
   * Identify a user and capture their information
   */
  const identifyUser = useCallback(
    async (
      email: string,
      name: string,
      options?: {
        phone?: string
        whatsapp?: string
        facebook?: string
        instagram?: string
        tiktok?: string
        source?: string
      }
    ) => {
      if (typeof window === 'undefined') return false

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        console.warn('Invalid email format:', email)
        return false
      }

      const identification: UserIdentification = {
        sessionId,
        email,
        name,
        phone: options?.phone,
        whatsapp: options?.whatsapp,
        facebook: options?.facebook,
        instagram: options?.instagram,
        tiktok: options?.tiktok,
        source: options?.source,
        timestamp: Date.now(),
      }

      try {
        const response = await fetch('/api/analytics/user-identify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(identification),
        })

        if (!response.ok) {
          console.warn('Failed to identify user:', response.statusText)
          return false
        }

        // Also identify in Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('config', (window as any).GA_MEASUREMENT_ID || '', {
            user_id: email,
          })
          ;(window as any).gtag('set', {
            user_properties: {
              name,
              email,
            },
          })
        }

        return true
      } catch (error) {
        console.error('Error identifying user:', error)
        return false
      }
    },
    [sessionId]
  )

  /**
   * Track page view
   */
  const trackPageView = useCallback(
    (path: string) => {
      if (typeof window === 'undefined') return

      trackEvent('page_view', { path })

      // Also track in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: path,
        })
      }
    },
    [trackEvent]
  )

  return {
    sessionId,
    trackEvent,
    identifyUser,
    trackPageView,
  }
}

