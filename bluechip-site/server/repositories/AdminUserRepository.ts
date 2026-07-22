export type AdminUser = {
  id: string
  fullName: string
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  role: string
  isActive: boolean
  createdAt?: string
  lastLoginAt?: string | null
}

export interface IAdminUserRepository {
  create(user: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<AdminUser>
  findByEmailOrUsername(login: string): Promise<AdminUser | null>
  findByRole(role: string): Promise<AdminUser | null>
  updateLastLogin(id: string): Promise<void>
}
