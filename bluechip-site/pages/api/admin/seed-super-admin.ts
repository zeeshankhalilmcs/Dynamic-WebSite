import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAdminAuth } from '../../../server/services/AdminAuth'
import { AdminSeedService } from '../../../server/services/AdminSeedService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authError = await requireAdminAuth(req)
  if (authError) {
    return res.status(401).json({ error: authError })
  }

  try {
    const seedService = new AdminSeedService()
    const result = await seedService.seedAllData()
    return res.status(200).json({ success: true, ...result })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Unable to seed project data' })
  }
}

// migration command to create the super admin user in the database
//  $env:DATABASE_URL = "postgres://user:password@localhost:5432/bizdb"; npm run migrate;