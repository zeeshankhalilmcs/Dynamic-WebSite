export type AdminSettings = {
  email?: {
    enabled?: boolean
    host?: string
    port?: string
    username?: string
    password?: string
    senderName?: string
    senderEmail?: string
  }
  recaptcha?: {
    enabled?: boolean
    siteKey?: string
    secretKey?: string
  }
  verification?: {
    enabled?: boolean
    otpEnabled?: boolean
    otpTtlMinutes?: number
    otpMaxAttempts?: number
  }
  chatbot?: {
    enabled?: boolean
    provider?: string
    apiKey?: string
    endpoint?: string
    greeting?: string
  }
  admin?: {
    fallbackToken?: string
  }
  pricing?: {
    heroTitle?: string
    heroSubtitle?: string
    heroCtaLabel?: string
    heroCtaHref?: string
    comparisonTitle?: string
    faqTitle?: string
    plans?: Array<{
      id?: string
      name?: string
      price?: string
      period?: string
      description?: string
      ctaLabel?: string
      ctaHref?: string
      featured?: boolean
      badge?: string
      features?: string[]
      highlights?: string[]
    }>
    comparisonFeatures?: Array<{ name?: string; values?: string[] }>
    faqs?: Array<{ question?: string; answer?: string }>
  }
}

export interface IAdminSettingsRepository {
  getAll(): Promise<AdminSettings>
  save(settings: AdminSettings): Promise<AdminSettings>
}
