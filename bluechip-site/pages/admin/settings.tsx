import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import PromoModal from '../../components/PromoModal'

type PromoDraft = {
  enabled?: boolean
  title?: string
  subtitle?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  imagePath?: string
  displayPages?: string[]
  forceShowOnHomepage?: boolean
  persistHours?: number
  dismissDays?: number
}

type PricingPlanDraft = {
  id?: string
  name?: string
  price?: string
  period?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  featured?: boolean
  badge?: string
  features?: string[]
  highlights?: string[]
  details?: string[]
  detailTitle?: string
}

type PricingComparisonFeatureDraft = {
  name?: string
  values?: string[]
}

type PricingDraft = {
  heroTitle?: string
  heroSubtitle?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  comparisonTitle?: string
  faqTitle?: string
  plans?: PricingPlanDraft[]
  comparisonFeatures?: PricingComparisonFeatureDraft[]
  faqs?: Array<{ question?: string; answer?: string }>
}

export default function AdminSettingsPage() {
  const [values, setValues] = useState<any>({
    email: { enabled: false, host: '', port: '', username: '', password: '', senderName: '', senderEmail: '' },
    recaptcha: { enabled: false, siteKey: '', secretKey: '' },
    verification: { enabled: false, otpEnabled: false, otpTtlMinutes: 10, otpMaxAttempts: 5 },
    chatbot: { enabled: false, provider: '', apiKey: '', endpoint: '', greeting: '' },
    whatsapp: { enabled: false, provider: 'twilio', apiKey: '', phoneNumber: '', webhookUrl: '', greeting: '' },
    announcementBar: { enabled: true, items: ['POS', 'Billing QR', 'Display Digital', 'WhatsApp Catalogue Support', 'Receipts Delivery', 'Staff Tracking', 'Management Revenue', 'Inventory Reports', 'Control Multi-branch', 'Customer & History Management'] },
    promo: {
      enabled: true,
      title: 'Digital Invoicing Software Solutions for Corporate & Non-Corporate Businesses',
      subtitle: 'Create & post to FBR, professional invoices in seconds. Localized for Pakistan and compatible with tax posting requirements.',
      primaryCtaLabel: 'Contact for demo',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'See pricing',
      secondaryCtaHref: '/pricing',
      imagePath: '/images/stock/hero.png',
      displayPages: ['homepage'],
      forceShowOnHomepage: false,
      dismissDays: 0,
      persistHours: 0,
    },
  })
  const [promoPreviewOpen, setPromoPreviewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [pricing, setPricing] = useState<PricingDraft>({
    heroTitle: '',
    heroSubtitle: '',
    heroCtaLabel: '',
    heroCtaHref: '',
    comparisonTitle: '',
    faqTitle: '',
    plans: [],
    comparisonFeatures: [],
    faqs: [],
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token') || ''
    if (!token) {
      window.location.href = '/admin/login'
      return
    }

    fetch('/api/admin/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/admin/login'
          return false
        }
        return true
      })
      .then((ok) => {
        if (!ok) return
        Promise.all([
          fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json()),
          fetch('/api/admin/pricing', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json()),
        ])
          .then(([settingsData, pricingData]) => {
            setValues({
              email: { enabled: false, host: '', port: '', username: '', password: '', senderName: '', senderEmail: '', ...(settingsData.email || {}) },
              recaptcha: { enabled: false, siteKey: '', secretKey: '', ...(settingsData.recaptcha || {}) },
              verification: { enabled: false, otpEnabled: false, otpTtlMinutes: 10, otpMaxAttempts: 5, ...(settingsData.verification || {}) },
              chatbot: { enabled: false, provider: '', apiKey: '', endpoint: '', greeting: '', ...(settingsData.chatbot || {}) },
              whatsapp: { enabled: false, provider: 'twilio', apiKey: '', phoneNumber: '', webhookUrl: '', greeting: '', ...(settingsData.whatsapp || {}) },
              announcementBar: { enabled: true, items: ['POS', 'Billing QR', 'Display Digital', 'WhatsApp Catalogue Support', 'Receipts Delivery', 'Staff Tracking', 'Management Revenue', 'Inventory Reports', 'Control Multi-branch', 'Customer & History Management'], ...(settingsData.announcementBar || {}) },
              promo: {
                enabled: true,
                title: 'Digital Invoicing Software Solutions for Corporate & Non-Corporate Businesses',
                subtitle: 'Create & post to FBR, professional invoices in seconds. Localized for Pakistan and compatible with tax posting requirements.',
                primaryCtaLabel: 'Contact for demo',
                primaryCtaHref: '/contact',
                secondaryCtaLabel: 'See pricing',
                secondaryCtaHref: '/pricing',
                imagePath: '/images/stock/hero.png',
                displayPages: settingsData.promo?.displayPages ?? (settingsData.promo?.displayPage ? [settingsData.promo.displayPage] : ['homepage']),
                forceShowOnHomepage: settingsData.promo?.forceShowOnHomepage ?? false,
                // compute dismissDays from stored settings (backward compatible with persistHours)
                dismissDays: typeof settingsData.promo?.dismissDays === 'number'
                  ? settingsData.promo.dismissDays
                  : typeof settingsData.promo?.persistHours === 'number'
                  ? Math.floor(settingsData.promo.persistHours / 24)
                  : 0,
                persistHours: typeof settingsData.promo?.dismissDays === 'number'
                  ? settingsData.promo.dismissDays * 24
                  : typeof settingsData.promo?.persistHours === 'number'
                  ? settingsData.promo.persistHours
                  : 0,
                ...(settingsData.promo || {}),
              },
            })
            setPricing({
              heroTitle: pricingData.heroTitle || '',
              heroSubtitle: pricingData.heroSubtitle || '',
              heroCtaLabel: pricingData.heroCtaLabel || '',
              heroCtaHref: pricingData.heroCtaHref || '',
              comparisonTitle: pricingData.comparisonTitle || '',
              faqTitle: pricingData.faqTitle || '',
              plans: pricingData.plans || [],
              comparisonFeatures: pricingData.comparisonFeatures || [],
              faqs: pricingData.faqs || [],
            })
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
  }, [])

  async function saveSettings() {
    const token = localStorage.getItem('admin_token') || ''
    if (!token) return

    setSaving(true)
    setMessage('')
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    setSaving(false)
    if (res.ok) {
      setMessage('Settings saved successfully.')
    } else {
      setMessage('Unable to save settings.')
    }
  }

  function updateSection(section: string, field: string, value: string | boolean | number | string[]) {
    setValues((current: any) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  async function savePricing() {
    const token = localStorage.getItem('admin_token') || ''
    if (!token) return

    setSaving(true)
    setMessage('')
    const res = await fetch('/api/admin/pricing', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pricing),
    })

    setSaving(false)
    if (res.ok) {
      setMessage('Pricing content saved successfully.')
    } else {
      setMessage('Unable to save pricing content.')
    }
  }

  function updatePricingField(field: keyof PricingDraft, value: string) {
    setPricing((current) => ({ ...current, [field]: value }))
  }

  function updatePlan(index: number, field: keyof PricingPlanDraft, value: string | boolean) {
    setPricing((current) => {
      const nextPlans = [...(current.plans || [])]
      nextPlans[index] = { ...(nextPlans[index] || {}), [field]: value }
      return { ...current, plans: nextPlans }
    })
  }

  function updatePlanFeatures(index: number, value: string) {
    setPricing((current) => {
      const nextPlans = [...(current.plans || [])]
      const currentFeatures = nextPlans[index]?.features || []
      nextPlans[index] = { ...(nextPlans[index] || {}), features: value.split('\n').map((item) => item.trim()).filter(Boolean) }
      return { ...current, plans: nextPlans }
    })
  }

  function updatePlanHighlights(index: number, value: string) {
    setPricing((current) => {
      const nextPlans = [...(current.plans || [])]
      nextPlans[index] = { ...(nextPlans[index] || {}), highlights: value.split('\n').map((item) => item.trim()).filter(Boolean) }
      return { ...current, plans: nextPlans }
    })
  }

  function updatePlanDetails(index: number, value: string) {
    setPricing((current) => {
      const nextPlans = [...(current.plans || [])]
      nextPlans[index] = { ...(nextPlans[index] || {}), details: value.split('\n').map((item) => item.trim()).filter(Boolean) }
      return { ...current, plans: nextPlans }
    })
  }

  function updatePlanDetailTitle(index: number, value: string) {
    setPricing((current) => {
      const nextPlans = [...(current.plans || [])]
      nextPlans[index] = { ...(nextPlans[index] || {}), detailTitle: value }
      return { ...current, plans: nextPlans }
    })
  }

  function addPlan() {
    setPricing((current) => ({
      ...current,
      plans: [...(current.plans || []), { name: 'New plan', price: 'Custom', period: '/ mo', description: '', ctaLabel: 'Contact us', ctaHref: '/contact', features: [] }],
    }))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="mt-2 text-slate-600">Manage email delivery, reCAPTCHA, and chatbot configuration.</p>
        </div>

        {message ? <div className="rounded bg-emerald-100 px-3 py-2 text-sm text-emerald-800">{message}</div> : null}

        {loading ? <div className="rounded-3xl bg-white p-6 shadow">Loading settings...</div> : null}

        {!loading ? (
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Email settings</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.email.enabled} onChange={(e) => updateSection('email', 'enabled', e.target.checked)} />
                  Enabled
                </label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={values.email.host || ''} onChange={(e) => updateSection('email', 'host', e.target.value)} placeholder="SMTP host" className="rounded border px-3 py-2" />
                <input value={values.email.port || ''} onChange={(e) => updateSection('email', 'port', e.target.value)} placeholder="SMTP port" className="rounded border px-3 py-2" />
                <input value={values.email.username || ''} onChange={(e) => updateSection('email', 'username', e.target.value)} placeholder="SMTP username" className="rounded border px-3 py-2" />
                <input type="password" value={values.email.password || ''} onChange={(e) => updateSection('email', 'password', e.target.value)} placeholder="SMTP password" className="rounded border px-3 py-2" />
                <input value={values.email.senderName || ''} onChange={(e) => updateSection('email', 'senderName', e.target.value)} placeholder="Sender name" className="rounded border px-3 py-2" />
                <input value={values.email.senderEmail || ''} onChange={(e) => updateSection('email', 'senderEmail', e.target.value)} placeholder="Sender email" className="rounded border px-3 py-2" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">reCAPTCHA settings</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.recaptcha.enabled} onChange={(e) => updateSection('recaptcha', 'enabled', e.target.checked)} />
                  Enabled
                </label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={values.recaptcha.siteKey || ''} onChange={(e) => updateSection('recaptcha', 'siteKey', e.target.value)} placeholder="Site key" className="rounded border px-3 py-2" />
                <input type="password" value={values.recaptcha.secretKey || ''} onChange={(e) => updateSection('recaptcha', 'secretKey', e.target.value)} placeholder="Secret key" className="rounded border px-3 py-2" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Verification settings</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.verification.enabled} onChange={(e) => updateSection('verification', 'enabled', e.target.checked)} />
                  Enable verification
                </label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.verification.otpEnabled} onChange={(e) => updateSection('verification', 'otpEnabled', e.target.checked)} />
                  Require OTP for contact form
                </label>
                <input value={values.verification.otpTtlMinutes || ''} onChange={(e) => updateSection('verification', 'otpTtlMinutes', Number(e.target.value))} placeholder="OTP TTL minutes" type="number" className="rounded border px-3 py-2" />
                <input value={values.verification.otpMaxAttempts || ''} onChange={(e) => updateSection('verification', 'otpMaxAttempts', Number(e.target.value))} placeholder="Max attempts" type="number" className="rounded border px-3 py-2" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Chatbot settings</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.chatbot.enabled} onChange={(e) => updateSection('chatbot', 'enabled', e.target.checked)} />
                  Enabled
                </label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={values.chatbot.provider || ''} onChange={(e) => updateSection('chatbot', 'provider', e.target.value)} placeholder="Provider" className="rounded border px-3 py-2" />
                <input type="password" value={values.chatbot.apiKey || ''} onChange={(e) => updateSection('chatbot', 'apiKey', e.target.value)} placeholder="API key" className="rounded border px-3 py-2" />
                <input value={values.chatbot.endpoint || ''} onChange={(e) => updateSection('chatbot', 'endpoint', e.target.value)} placeholder="Endpoint URL" className="rounded border px-3 py-2" />
                <input value={values.chatbot.greeting || ''} onChange={(e) => updateSection('chatbot', 'greeting', e.target.value)} placeholder="Greeting message" className="rounded border px-3 py-2" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Homepage announcement bar</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.announcementBar.enabled} onChange={(e) => updateSection('announcementBar', 'enabled', e.target.checked)} />
                  Enabled
                </label>
              </div>
              <div className="mt-4 space-y-3">
                <textarea value={(values.announcementBar.items || []).join('\n')} onChange={(e) => updateSection('announcementBar', 'items', e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} placeholder="One announcement item per line" className="w-full rounded border px-3 py-2" rows={6} />
                <p className="text-sm text-slate-600">These items will appear in the scrolling bar below the hero section on the homepage.</p>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Promo modal</h2>
                  <p className="text-sm text-slate-600">Preview the promo instantly without saving.</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={values.promo.enabled} onChange={(e) => updateSection('promo', 'enabled', e.target.checked)} />
                    Enabled
                  </label>
                  <button type="button" onClick={() => setPromoPreviewOpen(true)} className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    Preview promo
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={values.promo.title || ''} onChange={(e) => updateSection('promo', 'title', e.target.value)} placeholder="Modal title" className="rounded border px-3 py-2" />
                <input value={values.promo.subtitle || ''} onChange={(e) => updateSection('promo', 'subtitle', e.target.value)} placeholder="Modal subtitle" className="rounded border px-3 py-2" />
                <input value={values.promo.primaryCtaLabel || ''} onChange={(e) => updateSection('promo', 'primaryCtaLabel', e.target.value)} placeholder="Primary CTA label" className="rounded border px-3 py-2" />
                <input value={values.promo.primaryCtaHref || ''} onChange={(e) => updateSection('promo', 'primaryCtaHref', e.target.value)} placeholder="Primary CTA href" className="rounded border px-3 py-2" />
                <input value={values.promo.secondaryCtaLabel || ''} onChange={(e) => updateSection('promo', 'secondaryCtaLabel', e.target.value)} placeholder="Secondary CTA label" className="rounded border px-3 py-2" />
                <input value={values.promo.secondaryCtaHref || ''} onChange={(e) => updateSection('promo', 'secondaryCtaHref', e.target.value)} placeholder="Secondary CTA href" className="rounded border px-3 py-2" />
                <input value={values.promo.imagePath || ''} onChange={(e) => updateSection('promo', 'imagePath', e.target.value)} placeholder="Image path" className="rounded border px-3 py-2" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.promo.forceShowOnHomepage || false} onChange={(e) => updateSection('promo', 'forceShowOnHomepage', e.target.checked)} />
                  Always show on homepage (ignore dismissal)
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    multiple
                    size={6}
                    value={values.promo.displayPages || ['homepage']}
                    onChange={(e) => updateSection('promo', 'displayPages', Array.from(e.target.selectedOptions).map((option) => option.value))}
                    className="rounded border px-3 py-2"
                  >
                    <option value="homepage">Homepage</option>
                    <option value="pos">POS page</option>
                    <option value="reviews">Reviews page</option>
                    <option value="why">Why BlueChip page</option>
                    <option value="blog">Blog index page</option>
                    <option value="blog-detail">Blog detail page</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <input type="number" min={0} value={values.promo.dismissDays ?? Math.floor((values.promo.persistHours || 0) / 24)} onChange={(e) => updateSection('promo', 'dismissDays', Number(e.target.value))} placeholder="Dismiss for (days)" className="rounded border px-3 py-2" />
                    <span className="text-sm text-slate-600">0 = show every time</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">Modal content and target pages will be used by the promo popup across the site. Hold Ctrl / Cmd to select multiple pages.</p>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">WhatsApp integration</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={values.whatsapp.enabled} onChange={(e) => updateSection('whatsapp', 'enabled', e.target.checked)} />
                  Enabled
                </label>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={values.whatsapp.provider || ''} onChange={(e) => updateSection('whatsapp', 'provider', e.target.value)} placeholder="Provider" className="rounded border px-3 py-2" />
                <input type="password" value={values.whatsapp.apiKey || ''} onChange={(e) => updateSection('whatsapp', 'apiKey', e.target.value)} placeholder="API key or token" className="rounded border px-3 py-2" />
                <input value={values.whatsapp.phoneNumber || ''} onChange={(e) => updateSection('whatsapp', 'phoneNumber', e.target.value)} placeholder="Sender phone number" className="rounded border px-3 py-2" />
                <input value={values.whatsapp.webhookUrl || ''} onChange={(e) => updateSection('whatsapp', 'webhookUrl', e.target.value)} placeholder="Webhook URL" className="rounded border px-3 py-2" />
                <input value={values.whatsapp.greeting || ''} onChange={(e) => updateSection('whatsapp', 'greeting', e.target.value)} placeholder="Greeting message" className="rounded border px-3 py-2 md:col-span-2" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Pricing page content</h2>
                <button onClick={savePricing} disabled={saving} className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">
                  {saving ? 'Saving...' : 'Save pricing'}
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input value={pricing.heroTitle || ''} onChange={(e) => updatePricingField('heroTitle', e.target.value)} placeholder="Hero title" className="rounded border px-3 py-2" />
                <input value={pricing.heroCtaLabel || ''} onChange={(e) => updatePricingField('heroCtaLabel', e.target.value)} placeholder="Hero CTA label" className="rounded border px-3 py-2" />
                <input value={pricing.heroCtaHref || ''} onChange={(e) => updatePricingField('heroCtaHref', e.target.value)} placeholder="Hero CTA href" className="rounded border px-3 py-2" />
                <input value={pricing.comparisonTitle || ''} onChange={(e) => updatePricingField('comparisonTitle', e.target.value)} placeholder="Comparison title" className="rounded border px-3 py-2" />
                <input value={pricing.faqTitle || ''} onChange={(e) => updatePricingField('faqTitle', e.target.value)} placeholder="FAQ title" className="rounded border px-3 py-2" />
                <textarea value={pricing.heroSubtitle || ''} onChange={(e) => updatePricingField('heroSubtitle', e.target.value)} placeholder="Hero subtitle" className="rounded border px-3 py-2 md:col-span-2" rows={3} />
              </div>

              <div className="mt-6 space-y-4">
                {(pricing.plans || []).map((plan, index) => (
                  <div key={plan.id || `${plan.name || 'plan'}-${index}`} className="rounded-2xl border border-slate-200 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <input value={plan.name || ''} onChange={(e) => updatePlan(index, 'name', e.target.value)} placeholder="Plan name" className="rounded border px-3 py-2" />
                      <input value={plan.price || ''} onChange={(e) => updatePlan(index, 'price', e.target.value)} placeholder="Plan price" className="rounded border px-3 py-2" />
                      <input value={plan.period || ''} onChange={(e) => updatePlan(index, 'period', e.target.value)} placeholder="Plan period" className="rounded border px-3 py-2" />
                      <input value={plan.ctaLabel || ''} onChange={(e) => updatePlan(index, 'ctaLabel', e.target.value)} placeholder="CTA label" className="rounded border px-3 py-2" />
                      <input value={plan.ctaHref || ''} onChange={(e) => updatePlan(index, 'ctaHref', e.target.value)} placeholder="CTA href" className="rounded border px-3 py-2" />
                      <input value={plan.badge || ''} onChange={(e) => updatePlan(index, 'badge', e.target.value)} placeholder="Badge" className="rounded border px-3 py-2" />
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={Boolean(plan.featured)} onChange={(e) => updatePlan(index, 'featured', e.target.checked)} />
                        Featured plan
                      </label>
                      <textarea value={(plan.features || []).join('\n')} onChange={(e) => updatePlanFeatures(index, e.target.value)} placeholder="One feature per line" className="rounded border px-3 py-2 md:col-span-2" rows={4} />
                      <textarea value={(plan.highlights || []).join('\n')} onChange={(e) => updatePlanHighlights(index, e.target.value)} placeholder="One highlight per line" className="rounded border px-3 py-2 md:col-span-2" rows={3} />
                    </div>
                    <textarea value={plan.description || ''} onChange={(e) => updatePlan(index, 'description', e.target.value)} placeholder="Plan description" className="mt-4 w-full rounded border px-3 py-2" rows={3} />
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <input value={plan.detailTitle || ''} onChange={(e) => updatePlanDetailTitle(index, e.target.value)} placeholder="Detail section title" className="rounded border px-3 py-2" />
                      <textarea value={(plan.details || []).join('\n')} onChange={(e) => updatePlanDetails(index, e.target.value)} placeholder="One detail per line" className="rounded border px-3 py-2" rows={4} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={addPlan} className="mt-4 rounded border border-slate-300 px-3 py-2 text-sm">Add plan</button>
            </section>

            <div className="flex justify-end">
              <button onClick={saveSettings} disabled={saving} className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">
                {saving ? 'Saving...' : 'Save settings'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {promoPreviewOpen ? (
        <PromoModal
          previewMode
          previewOpen={promoPreviewOpen}
          previewSettings={{
            ...values.promo,
            persistHours: typeof values.promo.dismissDays === 'number'
              ? values.promo.dismissDays * 24
              : values.promo.persistHours ?? 0,
          }}
          onClose={() => setPromoPreviewOpen(false)}
        />
      ) : null}
    </AdminLayout>
  )
}

export function getServerSideProps() {
  return { props: {} }
}

