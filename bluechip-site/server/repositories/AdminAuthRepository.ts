export type AdminSession = {
  id: string
  token: string
  createdAt: string
  expiresAt: string
}

export interface IAdminAuthRepository {
  saveSession(session: AdminSession): Promise<void>
  revokeSession(token: string): Promise<void>
  isSessionValid(token: string): Promise<boolean>
}
