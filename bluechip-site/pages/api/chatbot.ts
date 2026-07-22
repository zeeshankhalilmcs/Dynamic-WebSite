import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatbotService } from '../../server/services/ChatbotService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}
  const service = new ChatbotService()
  const session = service.buildSessionPayload(req, body as Record<string, unknown>)
  const answer = service.answerInquiry(String(body.inquiry || ''))

  return res.status(200).json({ success: true, answer, session })
}
