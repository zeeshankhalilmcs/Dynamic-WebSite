import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminSettingsPage() {
  const [values, setValues] = useState<any>({
    email: { enabled: false, host: '', port: '', username: '', password: '', senderName: '', senderEmail: '' },
    recaptcha: { enabled: false, siteKey: '', secretKey: '' },
    verification: { enabled: false, otpEnabled: false, otpTtlMinutes: 10, otpMaxAttempts: 5 },
    chatbot: { enabled: false, provider: '', apiKey: '', endpoint: '', greeting: '' },
    whatsapp: { enabled: false, provider: 'twilio', apiKey: '', phoneNumber: '', webhookUrl: '', greeting: '' },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

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
        fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((data) => {
            setValues({
              email: { enabled: false, host: '', port: '', username: '', password: '', senderName: '', senderEmail: '', ...(data.email || {}) },
              recaptcha: { enabled: false, siteKey: '', secretKey: '', ...(data.recaptcha || {}) },
              verification: { enabled: false, otpEnabled: false, otpTtlMinutes: 10, otpMaxAttempts: 5, ...(data.verification || {}) },
              chatbot: { enabled: false, provider: '', apiKey: '', endpoint: '', greeting: '', ...(data.chatbot || {}) },
              whatsapp: { enabled: false, provider: 'twilio', apiKey: '', phoneNumber: '', webhookUrl: '', greeting: '', ...(data.whatsapp || {}) },
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

  function updateSection(section: string, field: string, value: string | boolean | number) {
    setValues((current: any) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
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

            <div className="flex justify-end">
              <button onClick={saveSettings} disabled={saving} className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">
                {saving ? 'Saving...' : 'Save settings'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  )
}
