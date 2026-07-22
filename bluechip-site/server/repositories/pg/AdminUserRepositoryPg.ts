import { pool } from '../../db/pool'
import type { AdminUser, IAdminUserRepository } from '../AdminUserRepository'

export class AdminUserRepositoryPg implements IAdminUserRepository {
  async create(user: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>): Promise<AdminUser> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name text NOT NULL,
        email text NOT NULL UNIQUE,
        username text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        password_salt text NOT NULL,
        role text NOT NULL DEFAULT 'admin',
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        last_login_at timestamptz
      )
    `)

    const res = await pool.query(
      `INSERT INTO admin_users (full_name, email, username, password_hash, password_salt, role, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, full_name, email, username, password_hash, password_salt, role, is_active, created_at, last_login_at`,
      [user.fullName, user.email, user.username, user.passwordHash, user.passwordSalt, user.role, user.isActive]
    )

    return this.mapRow(res.rows[0])
  }

  async findByEmailOrUsername(login: string): Promise<AdminUser | null> {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name text NOT NULL,
        email text NOT NULL UNIQUE,
        username text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        password_salt text NOT NULL,
        role text NOT NULL DEFAULT 'admin',
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        last_login_at timestamptz
      )
    `)

    const res = await pool.query(
      `SELECT id, full_name, email, username, password_hash, password_salt, role, is_active, created_at, last_login_at
       FROM admin_users
       WHERE (email = $1 OR username = $1) AND is_active = true`,
      [login]
    )

    return res.rows[0] ? this.mapRow(res.rows[0]) : null
  }

  async findByRole(role: string): Promise<AdminUser | null> {
    const res = await pool.query(
      `SELECT id, full_name, email, username, password_hash, password_salt, role, is_active, created_at, last_login_at
       FROM admin_users
       WHERE role = $1 AND is_active = true
       ORDER BY created_at DESC LIMIT 1`,
      [role]
    )

    return res.rows[0] ? this.mapRow(res.rows[0]) : null
  }

  async updateLastLogin(id: string): Promise<void> {
    await pool.query('UPDATE admin_users SET last_login_at = now() WHERE id = $1', [id])
  }

  private mapRow(row: any): AdminUser {
    return {
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      username: row.username,
      passwordHash: row.password_hash,
      passwordSalt: row.password_salt,
      role: row.role,
      isActive: row.is_active,
      createdAt: row.created_at,
      lastLoginAt: row.last_login_at,
    }
  }
}
