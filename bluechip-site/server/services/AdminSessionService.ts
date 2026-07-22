import jwt from 'jsonwebtoken'
import { AdminAuthRepositoryPg } from '../repositories/pg/AdminAuthRepositoryPg'

const DEFAULT_ADMIN_SECRET = 'bluechip-admin-jwt-secret'
const DEFAULT_ADMIN_TOKEN = 'bluch$p-@dm$n-tok$n'

export function getAdminSecret(): string {
  return process.env.ADMIN_JWT_SECRET || process.env.ADMIN_EXPORT_TOKEN || process.env.ADMIN_UI_TOKEN || DEFAULT_ADMIN_SECRET
}

export function getAdminFallbackToken(): string {
  return process.env.ADMIN_EXPORT_TOKEN || process.env.ADMIN_UI_TOKEN || DEFAULT_ADMIN_TOKEN
}

export class AdminSessionService {
  constructor(private readonly repo = new AdminAuthRepositoryPg()) {}

  createToken(): string {
    const secret = getAdminSecret()
    return jwt.sign({ sub: 'admin' }, secret, { expiresIn: '8h' })
  }

  async persistSession(token: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
    await this.repo.saveSession({
      id: token,
      token,
      createdAt: new Date().toISOString(),
      expiresAt,
    })
  }

  async revokeSession(token: string): Promise<void> {
    await this.repo.revokeSession(token)
  }

  async isValid(token: string): Promise<boolean> {
    if (!token) {
      return false
    }

    try {
      const secret = getAdminSecret()
      jwt.verify(token, secret)
      return this.repo.isSessionValid(token)
    } catch {
      return false
    }
  }
}
