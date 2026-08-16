import type { NextApiRequest, NextApiResponse } from 'next'
import { AdminSettingsService } from '../../server/services/AdminSettingsService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const service = new AdminSettingsService()
  const settings = await service.getSettings()

  const publicSettings = {
    announcementBar: {
      enabled: settings.announcementBar?.enabled !== false,
      items: Array.isArray(settings.announcementBar?.items)
        ? settings.announcementBar.items.filter((item: string) => item && item.trim())
        : [],
    },
    promo: {
      enabled: settings.promo?.enabled !== false,
      title: settings.promo?.title || 'Digital Invoicing Software Solutions for Corporate & Non-Corporate Businesses',
      subtitle: settings.promo?.subtitle || 'Create & post to FBR, professional invoices in seconds. Localized for Pakistan and compatible with tax posting requirements.',
      primaryCtaLabel: settings.promo?.primaryCtaLabel || 'Contact for demo',
      primaryCtaHref: settings.promo?.primaryCtaHref || '/contact',
      secondaryCtaLabel: settings.promo?.secondaryCtaLabel || 'See pricing',
      secondaryCtaHref: settings.promo?.secondaryCtaHref || '/pricing',
      imagePath: settings.promo?.imagePath || '/images/stock/hero.png',
      displayPages: Array.isArray(settings.promo?.displayPages)
        ? settings.promo.displayPages
        : ['homepage'],
      forceShowOnHomepage: settings.promo?.forceShowOnHomepage === true,
      // Support dismissal configured in days (promo.dismissDays) for admin UX.
      // If dismissDays is provided use that; otherwise fall back to persistHours; default 0 = show every time.
      persistHours: typeof settings.promo?.dismissDays === 'number'
        ? settings.promo.dismissDays * 24
        : typeof settings.promo?.persistHours === 'number'
        ? settings.promo.persistHours
        : 0,
    },
    recaptcha: {
      enabled: Boolean(settings.recaptcha?.enabled),
      siteKey: settings.recaptcha?.siteKey || '',
    },
    verification: {
      enabled: Boolean(settings.verification?.enabled),
      otpEnabled: Boolean(settings.verification?.otpEnabled),
      otpTtlMinutes: settings.verification?.otpTtlMinutes || 10,
      otpMaxAttempts: settings.verification?.otpMaxAttempts || 5,
    },
  }

  return res.status(200).json(publicSettings)
}
