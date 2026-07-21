export type OtpVerification = {
  id?: string
  email: string
  otpHash: string
  expiresAt: string
  attempts: number
  usedAt?: string | null
  createdAt?: string
}

export interface IOtpVerificationRepository {
  create(record: OtpVerification): Promise<OtpVerification>
  findActiveByEmail(email: string): Promise<OtpVerification | null>
  markUsed(id: string): Promise<void>
  incrementAttempts(id: string): Promise<void>
  deleteExpired(): Promise<void>
}
