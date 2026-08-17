import crypto from 'crypto'
import { OtpVerificationRepositoryPg } from '../repositories/pg/OtpVerificationRepositoryPg'
import type { OtpVerification } from '../repositories/OtpVerificationRepository'
import { AdminSettingsService } from './AdminSettingsService'
import { EmailService } from './EmailService'

const OTP_TTL_MINUTES = 10
const MAX_ATTEMPTS = 5
const OTP_REQUEST_WINDOW_MS = 60 * 1000
const MAX_OTP_REQUESTS_PER_WINDOW = 3
const OTP_RESEND_COOLDOWN_MS = 60 * 1000

const requestHistory = new Map<string, number[]>()
const cooldownMap = new Map<string, number>()

function hashOtp(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)
}

function enforceOtpRequestLimit(email: string): void {
  const normalized = normalizeEmail(email)
  const now = Date.now()
  const recent = (requestHistory.get(normalized) ?? []).filter((ts) => now - ts < OTP_REQUEST_WINDOW_MS)

  if (recent.length >= MAX_OTP_REQUESTS_PER_WINDOW) {
    throw new Error('Too many OTP requests. Please wait a moment and try again.')
  }

  const lastRequestAt = cooldownMap.get(normalized)
  if (lastRequestAt && now - lastRequestAt < OTP_RESEND_COOLDOWN_MS) {
    throw new Error('Please wait before requesting a new OTP code.')
  }

  recent.push(now)
  requestHistory.set(normalized, recent)
  cooldownMap.set(normalized, now)
}

export class VerificationService {
  constructor(
    private readonly otpRepo = new OtpVerificationRepositoryPg(),
    private readonly settingsService = new AdminSettingsService()
  ) {}

  async isVerificationEnabled(): Promise<boolean> {
    const settings = await this.settingsService.getSettings()
    return Boolean(settings.recaptcha?.enabled || settings.email?.enabled)
  }

  async requestOtp(email: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email)

    if (!isValidEmail(normalizedEmail)) {
      throw new Error('Invalid email address.')
    }

    enforceOtpRequestLimit(normalizedEmail)

    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString()
    const record: OtpVerification = {
      email: normalizedEmail,
      otpHash: hashOtp(otp),
      expiresAt,
      attempts: 0,
    }

    await this.otpRepo.create(record)
    await EmailService.sendOtpEmail(normalizedEmail, otp)
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const normalizedEmail = normalizeEmail(email)
    const record = await this.otpRepo.findActiveByEmail(normalizedEmail)
    if (!record) return false

    const isValid = hashOtp(otp) === record.otpHash
    if (!isValid) {
      await this.otpRepo.incrementAttempts(record.id as string)
      return false
    }

    await this.otpRepo.markUsed(record.id as string)
    return true
  }
}
