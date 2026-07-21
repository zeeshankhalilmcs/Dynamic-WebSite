import jwt from 'jsonwebtoken'
import { AdminAuthRepositoryPg } from '../repositories/pg/AdminAuthRepositoryPg'

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_EXPORT_TOKEN || process.env.ADMIN_UI_TOKEN

export class AdminSessionService {
  constructor(private readonly repo = new AdminAuthRepositoryPg()) {}

  createToken(): string {
    if (!ADMIN_SECRET) {
      throw new Error('Admin JWT secret is not configured')
    }

    return jwt.sign({ sub: 'admin' }, ADMIN_SECRET, { expiresIn: '8h' })
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
    if (!token || !ADMIN_SECRET) {
      return false
    }

    try {
      jwt.verify(token, ADMIN_SECRET)
      return this.repo.isSessionValid(token)
    } catch {
      return false
    }
  }
}
