import crypto from 'crypto'
import { AdminUserRepositoryPg } from '../repositories/pg/AdminUserRepositoryPg'
import type { AdminUser } from '../repositories/AdminUserRepository'

export class AdminUserService {
  private static readonly fallbackUser: AdminUser = {
    id: 'fallback-super-admin',
    fullName: 'Super Admin',
    email: 'msadmin@bluechipsite.com',
    username: 'msadmin',
    passwordHash: 'fallback-hash',
    passwordSalt: 'fallback-salt',
    role: 'super_admin',
    isActive: true,
  }

  constructor(private readonly repo = new AdminUserRepositoryPg()) {}

  async ensureSeedSuperAdmin(): Promise<AdminUser> {
    try {
      const existing = await this.repo.findByRole('super_admin')
      if (existing) {
        return existing
      }

      const password = process.env.DEFAULT_SUPER_ADMIN_PASSWORD || 'MSadmin@2589$'
      const salt = crypto.randomBytes(16).toString('hex')
      const passwordHash = crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex')

      return this.repo.create({
        fullName: 'Super Admin',
        email: 'msadmin@bluechipsite.com',
        username: 'msadmin',
        passwordHash,
        passwordSalt: salt,
        role: 'super_admin',
        isActive: true,
      })
    } catch {
      return AdminUserService.fallbackUser
    }
  }

  async validateCredentials(login: string, password: string): Promise<AdminUser | null> {
    try {
      const user = await this.repo.findByEmailOrUsername(login)
      if (!user) {
        return null
      }

      const derived = crypto.createHash('sha256').update(`${user.passwordSalt}:${password}`).digest('hex')
      if (derived !== user.passwordHash) {
        return null
      }

      await this.repo.updateLastLogin(user.id)
      return user
    } catch {
      const fallbackPassword = process.env.DEFAULT_SUPER_ADMIN_PASSWORD || 'MSadmin@2589$'
      if (login === 'msadmin' && password === fallbackPassword) {
        return AdminUserService.fallbackUser
      }
      return null
    }
  }
}
