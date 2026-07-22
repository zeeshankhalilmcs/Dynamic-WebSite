import type { NextApiRequest } from 'next'

export type ChatbotSession = {
  id: string
  name: string
  email: string
  phone: string
  inquiry: string
  createdAt: string
}

export class ChatbotService {
  private static readonly knowledgeBase = [
    {
      keywords: ['opening hours', 'hours', 'timing', 'open'],
      answer: 'Our support team is available during standard business hours. Please leave your inquiry and we will follow up promptly.',
    },
    {
      keywords: ['price', 'pricing', 'quotation', 'quote'],
      answer: 'We can provide a tailored quotation based on your needs. Please share your request and our team will contact you with pricing details.',
    },
    {
      keywords: ['delivery', 'shipping', 'dispatch'],
      answer: 'We coordinate delivery and logistics based on your location and order size. Please leave your inquiry so our team can advise you.',
    },
    {
      keywords: ['support', 'help', 'issue'],
      answer: 'We are happy to assist with product support and service-related questions. Please share your details and we will contact you soon.',
    },
  ]

  answerInquiry(inquiry: string): string {
    const lower = inquiry.toLowerCase()
    const match = ChatbotService.knowledgeBase.find((item) => item.keywords.some((keyword) => lower.includes(keyword)))
    return match?.answer || 'I can help with store support and inquiries. Our support team will contact you shortly if I cannot answer your request directly.'
  }

  buildSessionPayload(req: NextApiRequest, body: Record<string, unknown>): ChatbotSession {
    return {
      id: `${Date.now()}`,
      name: String(body.name || ''),
      email: String(body.email || ''),
      phone: String(body.phone || ''),
      inquiry: String(body.inquiry || ''),
      createdAt: new Date().toISOString(),
    }
  }
}
