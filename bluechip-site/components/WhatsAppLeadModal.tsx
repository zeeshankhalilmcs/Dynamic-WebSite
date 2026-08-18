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

const phoneNumber = '923317003618' // BlueChip Solution WhatsApp number

function buildWhatsappUrl(name: string, phone: string, planName?: string, billingMode?: BillingMode) {
  const billingLabel = billingMode === 'yearly' ? 'Yearly' : 'Monthly'
  const planText = planName ? `the ${planName} ${billingLabel} plan` : 'your plan'
  const message = `Hi BlueChip Solution, \nThis is ${name}. I'm interested in ${planText} to sign up. Can you help me out with onboarding? Thanks.\n\nRegards,\n${name}`
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
        setSuccess('Thanks! We’ve opened WhatsApp for follow-up.')
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
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-slate-900 px-6 py-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">Quick onboarding</p>
              <h2 className="mt-2 text-2xl font-semibold">Let’s get you started on WhatsApp</h2>
              <p className="mt-2 text-sm leading-6 text-indigo-100">Share your details and we’ll open your chat with the right plan context ready.</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20">Close</button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {planName ? (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">Selected plan</div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{planName}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                    {billingMode === 'yearly' ? 'Yearly' : 'Monthly'}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Mobile number with country code"
                  required
                />
              </div>
            </div>

            {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
            {success ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 sm:w-auto">
                {loading ? 'Saving lead...' : 'Continue to WhatsApp'}
              </button>
              <p className="text-xs leading-5 text-slate-500">We’ll save your details and open the chat so your onboarding request is ready to go.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
