import type { NextApiRequest } from 'next'
import { AdminSessionService } from './AdminSessionService'

const sessionService = new AdminSessionService()

function getBearerToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim()
  }

  const cookieHeader = req.headers.cookie || ''
  const cookieValue = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('admin_token='))

  if (cookieValue) {
    return decodeURIComponent(cookieValue.split('=')[1] || '')
  }

  return null
}

export async function requireAdminAuth(req: NextApiRequest): Promise<string | null> {
  const token = getBearerToken(req)
  if (!token) {
    return 'Unauthorized'
  }

  const valid = await sessionService.isValid(token)
  return valid ? null : 'Unauthorized'
}

export async function createAdminJwt(token: string): Promise<string> {
  if (!token.trim()) {
    throw new Error('Admin token is required')
  }

  const jwt = sessionService.createToken()
  await sessionService.persistSession(jwt)
  return jwt
}

export async function revokeAdminSession(token: string): Promise<void> {
  await sessionService.revokeSession(token)
}
