import { promises as fs } from 'fs'
import path from 'path'
import { InquiryRepositoryPg } from '../repositories/pg/InquiryRepositoryPg'
import { ContactService } from './ContactService'

type PendingLead = {
  id: string
  payload: Record<string, unknown>
  createdAt: string
  attempts: number
  nextAttemptAt?: string
  lastError?: string
}

const QUEUE_FILE = path.join(process.cwd(), 'data', 'pending-whatsapp-leads.json')
const MAX_ATTEMPTS = 5
const MAX_BATCH_SIZE = 5

export class LeadQueueService {
  private async readQueue(): Promise<PendingLead[]> {
    try {
      const content = await fs.readFile(QUEUE_FILE, 'utf8')
      const parsed = JSON.parse(content)
      return Array.isArray(parsed) ? parsed : []
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        return []
      }
      throw error
    }
  }

  private async writeQueue(queue: PendingLead[]): Promise<void> {
    await fs.mkdir(path.dirname(QUEUE_FILE), { recursive: true })
    await fs.writeFile(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8')
  }

  async enqueueLead(payload: Record<string, unknown>): Promise<void> {
    const queue = await this.readQueue()
    queue.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      payload,
      createdAt: new Date().toISOString(),
      attempts: 0,
    })
    await this.writeQueue(queue)
  }

  async flushPendingLeads(): Promise<{ processed: number; remaining: number }> {
    const queue = await this.readQueue()
    if (!queue.length) {
      return { processed: 0, remaining: 0 }
    }

    const now = Date.now()
    const eligible = queue.filter((entry) => {
      if (!entry.nextAttemptAt) return true
      return new Date(entry.nextAttemptAt).getTime() <= now
    }).slice(0, MAX_BATCH_SIZE)

    if (!eligible.length) {
      return { processed: 0, remaining: queue.length }
    }

    const service = new ContactService(new InquiryRepositoryPg())
    const remainingQueue: PendingLead[] = []
    let processed = 0

    for (const entry of queue) {
      const isEligible = eligible.some((candidate) => candidate.id === entry.id)
      if (!isEligible) {
        remainingQueue.push(entry)
        continue
      }

      try {
        await service.createInquiry(entry.payload as any)
        processed += 1
      } catch (error) {
        const nextAttemptCount = (entry.attempts || 0) + 1
        const nextAttemptAt = new Date(Date.now() + Math.min(1000 * 60 * 5 * nextAttemptCount, 1000 * 60 * 60 * 6)).toISOString()

        remainingQueue.push({
          ...entry,
          attempts: nextAttemptCount,
          nextAttemptAt,
          lastError: error instanceof Error ? error.message : String(error),
        })
      }
    }

    await this.writeQueue(remainingQueue)
    return { processed, remaining: remainingQueue.length }
  }
}
