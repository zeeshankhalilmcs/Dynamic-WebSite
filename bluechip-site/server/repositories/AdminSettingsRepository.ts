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
}

export interface IAdminSettingsRepository {
  getAll(): Promise<AdminSettings>
  save(settings: AdminSettings): Promise<AdminSettings>
}
