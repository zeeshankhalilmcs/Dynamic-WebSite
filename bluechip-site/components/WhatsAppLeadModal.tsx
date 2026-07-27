import { useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'

type BillingMode = 'monthly' | 'yearly'

type Props = {
  isOpen: boolean
  onClose: () => void
  planName?: string
  billingMode?: BillingMode
}

const phoneNumber = '923087607119'

function buildWhatsappUrl(name: string, phone: string, planName?: string, billingMode?: BillingMode) {
  const billingLabel = billingMode === 'yearly' ? 'Yearly' : 'Monthly'
  const planText = planName ? `the ${planName} ${billingLabel} plan` : 'your plan'
  const message = `Hi BlueChip Solution, this is ${name}. I'm interested in ${planText} to sign up. Can you help me out with onboarding? Thanks.\n\nRegards,\n${name}`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export default function WhatsAppLeadModal({ isOpen, onClose, planName, billingMode }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post('/api/whatsapp-lead', { name, phone })
      if (response.data?.success) {
        setSuccess('Thank you! Your WhatsApp lead has been saved. We will follow up shortly.')
        setName('')
        setPhone('')
        window.open(buildWhatsappUrl(name, phone, planName, billingMode), '_blank', 'noreferrer')
      } else {
        setError(response.data?.error || 'Unable to save lead.')
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Unable to save lead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Start a WhatsApp conversation</h2>
            <p className="mt-2 text-sm text-slate-600">Share your name and phone number so we can follow up as a lead opportunity.</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {planName ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Selected plan: <span className="font-semibold text-slate-900">{planName}</span> • <span className="font-semibold text-slate-900">{billingMode === 'yearly' ? 'Yearly' : 'Monthly'}</span>
            </div>
          ) : null}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
              placeholder="Mobile number with country code"
              required
            />
          </div>
          {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
          {success ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 sm:w-auto">
              {loading ? 'Saving lead...' : 'Save and open WhatsApp'}
            </button>
            <p className="text-xs text-slate-500">We’ll save your details and open the chat for a faster follow-up.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
