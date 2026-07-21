import { pool } from '../../db/pool'
import type { AdminSession, IAdminAuthRepository } from '../AdminAuthRepository'

export class AdminAuthRepositoryPg implements IAdminAuthRepository {
  async saveSession(session: AdminSession): Promise<void> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        token text NOT NULL UNIQUE,
        created_at timestamptz DEFAULT now(),
        expires_at timestamptz NOT NULL
      )
    `)

    await pool.query(
      'INSERT INTO admin_sessions (token, created_at, expires_at) VALUES ($1, now(), $2) ON CONFLICT (token) DO NOTHING',
      [session.token, session.expiresAt]
    )
  }

  async revokeSession(token: string): Promise<void> {
    await pool.query('DELETE FROM admin_sessions WHERE token = $1', [token])
  }

  async isSessionValid(token: string): Promise<boolean> {
    const res = await pool.query('SELECT 1 FROM admin_sessions WHERE token = $1 AND expires_at > now()', [token])
    return res.rowCount !== null && res.rowCount > 0
  }
}
