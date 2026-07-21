import type { NextApiRequest, NextApiResponse } from 'next'
import { InquiryRepositoryPg } from '../../../server/repositories/pg/InquiryRepositoryPg'
import { stringify } from 'csv-stringify/sync'

const ADMIN_TOKEN = process.env.ADMIN_EXPORT_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!ADMIN_TOKEN || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const repo = new InquiryRepositoryPg()
    const result = await repo.findAll()
    const csv = stringify(result, {
      header: true,
      columns: {
        id: 'ID',
        name: 'Name',
        company: 'Company',
        phone: 'Phone',
        email: 'Email',
        industry: 'Industry',
        inquiry_type: 'Inquiry Type',
        message: 'Message',
        ip: 'IP',
        user_agent: 'User Agent',
        created_at: 'Created At',
      },
    })

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="inquiries.csv"')
    res.status(200).send(csv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to export inquiries' })
  }
}
