import crypto from 'crypto'
import { OtpVerificationRepositoryPg } from '../repositories/pg/OtpVerificationRepositoryPg'
import type { OtpVerification } from '../repositories/OtpVerificationRepository'
import { AdminSettingsService } from './AdminSettingsService'

const OTP_TTL_MINUTES = 10
const MAX_ATTEMPTS = 5

function hashOtp(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
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

  async requestOtp(email: string): Promise<{ otp: string }> {
    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString()
    const record: OtpVerification = {
      email,
      otpHash: hashOtp(otp),
      expiresAt,
      attempts: 0,
    }

    await this.otpRepo.create(record)
    return { otp }
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const record = await this.otpRepo.findActiveByEmail(email)
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
