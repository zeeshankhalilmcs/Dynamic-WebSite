import { AdminUserService } from './AdminUserService'
import { AdminSettingsService } from './AdminSettingsService'
import { ContactService } from './ContactService'
import { InquiryRepositoryPg } from '../repositories/pg/InquiryRepositoryPg'
import { createBlogPost, getPostBySlug, updateBlogPost, blogSeedPosts } from './BlogService'
import type { AdminSettings } from '../repositories/AdminSettingsRepository'
import type { Inquiry } from '../repositories/InquiryRepository'

const defaultAdminSettings: AdminSettings = {
  recaptcha: { enabled: false, siteKey: '', secretKey: '' },
  verification: { enabled: false, otpEnabled: false, otpTtlMinutes: 10, otpMaxAttempts: 5 },
  chatbot: {
    enabled: false,
    provider: '',
    apiKey: '',
    endpoint: '',
    greeting: 'Hello! I can help with store support, inquiries, and product questions.',
  },
}

const sampleInquiries: Inquiry[] = [
  {
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    inquiry_type: 'General Question',
    message: 'I would like to learn more about your ERP and POS services for retail businesses.',
    company: 'ABC Traders',
    phone: '0300-1234567',
    country: 'Pakistan',
    is_bot: false,
    is_validated: true,
    reviewed: false,
  },
  {
    name: 'Ali Ahmed',
    email: 'ali.ahmed@example.com',
    inquiry_type: 'Support Request',
    message: 'Can you help me integrate my inventory system with your restaurant POS solution?',
    company: 'Fresh Bites',
    phone: '0311-7654321',
    country: 'Pakistan',
    is_bot: false,
    is_validated: true,
    reviewed: false,
  },
]

export class AdminSeedService {
  private readonly adminUserService = new AdminUserService()
  private readonly settingsService = new AdminSettingsService()
  private readonly contactService = new ContactService(new InquiryRepositoryPg())

  async seedAllData() {
    const user = await this.adminUserService.ensureSeedSuperAdmin()
    const fallbackToken = await this.settingsService.ensureAdminFallbackToken()

    const seededPosts: Array<{ slug: string; action: 'created' | 'updated' }> = []
    for (const post of blogSeedPosts) {
      const existing = await getPostBySlug(post.slug, { includeDrafts: true })
      if (!existing) {
        await createBlogPost(post)
        seededPosts.push({ slug: post.slug, action: 'created' })
      } else {
        await updateBlogPost(post.slug, post)
        seededPosts.push({ slug: post.slug, action: 'updated' })
      }
    }

    const existingSettings = await this.settingsService.getSettings()
    let settingsSeeded = false
    if (!existingSettings || Object.keys(existingSettings).length === 0) {
      await this.settingsService.saveSettings(defaultAdminSettings)
      settingsSeeded = true
    }

    const inquiryRepo = new InquiryRepositoryPg()
    const existingInquiries = await inquiryRepo.findAll()
    const seededInquiries: Array<{ email: string; created: boolean }> = []
    if (existingInquiries.length === 0) {
      for (const inquiry of sampleInquiries) {
        await this.contactService.createInquiry(inquiry)
        seededInquiries.push({ email: inquiry.email, created: true })
      }
    }

    return {
      superAdmin: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      adminToken: fallbackToken,
      blogPosts: seededPosts,
      adminSettings: {
        seeded: settingsSeeded,
        values: defaultAdminSettings,
      },
      inquiries: seededInquiries,
    }
  }
}
