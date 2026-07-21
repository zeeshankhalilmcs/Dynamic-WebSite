import { pool } from '../../db/pool'
import type { OtpVerification, IOtpVerificationRepository } from '../OtpVerificationRepository'

export class OtpVerificationRepositoryPg implements IOtpVerificationRepository {
  async create(record: OtpVerification): Promise<OtpVerification> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS otp_verifications (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email text NOT NULL,
        otp_hash text NOT NULL,
        expires_at timestamptz NOT NULL,
        attempts integer DEFAULT 0,
        used_at timestamptz,
        created_at timestamptz DEFAULT now()
      )
    `)

    const res = await pool.query(
      'INSERT INTO otp_verifications (email, otp_hash, expires_at, attempts, created_at) VALUES ($1, $2, $3, $4, now()) RETURNING id, email, otp_hash, expires_at, attempts, used_at, created_at',
      [record.email, record.otpHash, record.expiresAt, record.attempts]
    )

    return res.rows[0]
  }

  async findActiveByEmail(email: string): Promise<OtpVerification | null> {
    const res = await pool.query(
      'SELECT id, email, otp_hash, expires_at, attempts, used_at, created_at FROM otp_verifications WHERE email = $1 AND used_at IS NULL AND expires_at > now() ORDER BY created_at DESC LIMIT 1',
      [email]
    )
    return res.rows[0] ?? null
  }

  async markUsed(id: string): Promise<void> {
    await pool.query('UPDATE otp_verifications SET used_at = now() WHERE id = $1', [id])
  }

  async incrementAttempts(id: string): Promise<void> {
    await pool.query('UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = $1', [id])
  }

  async deleteExpired(): Promise<void> {
    await pool.query('DELETE FROM otp_verifications WHERE expires_at <= now()')
  }
}
