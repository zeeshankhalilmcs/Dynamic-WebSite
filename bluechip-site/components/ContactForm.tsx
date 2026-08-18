import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Lazy-load the analytics hook only on client side
function useAnalyticsLazy() {
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const { useAnalytics } = await import('../hooks/useAnalytics')
        const analyticsInstance = useAnalytics()
        setAnalytics(analyticsInstance)
      } catch (error) {
        console.error('Failed to load analytics:', error)
      }
    }

    if (typeof window !== 'undefined') {
      loadAnalytics()
    }
  }, [])

  return analytics
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  inquiryType: string
  message?: string
  website?: string
  otp?: string
  submittedAt?: string
}

export default function ContactForm(){
  const router = useRouter()
  const { register, handleSubmit, getValues, setValue, formState: { isSubmitting } } = useForm<FormData>({ defaultValues: { inquiryType: 'General' } })
  const analytics = useAnalyticsLazy()
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [verificationEnabled, setVerificationEnabled] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)

  const successMessage = 'Thanks for reaching out! Our sales team will get in touch with you shortly to set up your consultation and help you with the next steps.'

  useEffect(() => {
    axios.get('/api/settings').then((res) => {
      const settings = res.data || {}
      const enabled = Boolean(settings.verification?.enabled)
      const otp = Boolean(settings.verification?.otpEnabled)
      setVerificationEnabled(enabled)
      setOtpEnabled(otp)
    })

    const cookieName = 'contact_session_id'
    const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, cookie) => {
      const [name, value] = cookie.split('=')
      if (name && value) acc[name] = value
      return acc
    }, {})

    if (!cookies[cookieName]) {
      const sessionId = `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`
      document.cookie = `${cookieName}=${sessionId}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
    }
  }, [])

  useEffect(() => {
    const industry = typeof router.query.industry === 'string' ? router.query.industry : ''
    if (!industry) return

    const message = `I am interested in learning more about ${industry} from BlueChip Solution. I would like to understand the available features, pricing, implementation process, and how the solution can help improve my business operations. Please contact me to discuss my requirements and recommend a suitable solution for my business.`

    setValue('message', message)
    setValue('inquiryType', 'Quote')
  }, [router.query.industry, setValue])

  async function requestOtp() {
    const values = getValues()
    try {
      const response = await axios.post('/api/contact/request-otp', { email: values.email })
      if (response.data.success) {
        setOtpSent(true)
        setSubmissionComplete(false)
        setSuccess('A verification code has been sent to your email.')
      }
    } catch {
      setError('Unable to send verification code.')
    }
  }

  async function onSubmit(data: FormData){
    setSuccess(null)
    setError(null)
    try{
      if (verificationEnabled && otpEnabled) {
        const verifyResponse = await axios.post('/api/contact/verify-otp', { email: data.email, otp: data.otp })
        if (!verifyResponse.data.success) {
          setError('The verification code is invalid or expired.')
          return
        }
      }

      const payload = { ...data }
      await axios.post('/api/contact', payload)
      
      // Track successful contact form submission (if analytics loaded)
      if (analytics?.trackEvent) {
        analytics.trackEvent('contact_form_submitted', {
          inquiryType: data.inquiryType,
          hasPhone: !!data.phone,
          hasMessage: !!data.message,
        })
      }

      // Identify the user in analytics (if analytics loaded)
      if (analytics?.identifyUser) {
        const name = `${data.firstName} ${data.lastName}`.trim()
        await analytics.identifyUser(data.email, name, {
          phone: data.phone,
          source: 'contact_form',
        })
      }

      setSubmissionComplete(true)
      setSuccess(successMessage)
    }catch(err:any){
      const apiError = err?.response?.data
      setError(apiError?.reason ? `${apiError.error || 'Submission failed.'} (${apiError.reason})` : apiError?.error || 'Submission failed. Please try again later.')
      
      // Track failed submission (if analytics loaded)
      if (analytics?.trackEvent) {
        analytics.trackEvent('contact_form_error', {
          error: apiError?.error || 'unknown',
        })
      }
    }
  }

  if (submissionComplete) {
    return (
      <div className="max-w-xl rounded-[1.5rem] border border-green-200 bg-green-50 p-8 text-center text-slate-800 shadow-sm">
        <p className="text-lg font-semibold text-green-900">Thanks for reaching out!</p>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Our sales team will get in touch with you shortly to set up your consultation and help you with the next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      {success && <div className="p-3 bg-green-100 text-green-800 rounded">{success}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">First name *</label>
          <input {...register('firstName', { required: true })} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Last name *</label>
          <input {...register('lastName', { required: true })} className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block font-medium">Email *</label>
        <input {...register('email', { required: true })} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block font-medium">Phone</label>
        <input {...register('phone')} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block font-medium">Inquiry Type *</label>
        <select {...register('inquiryType', { required: true })} className="w-full border rounded px-3 py-2">
          <option>General</option>
          <option>Demo</option>
          <option>Quote</option>
          <option>Support</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Inquiry detail *</label>
        <textarea {...register('message', { required: true })} className="w-full border rounded px-3 py-2 h-28" />
      </div>
      {verificationEnabled && otpEnabled && otpSent ? (
        <div>
          <label className="block font-medium">Verification code *</label>
          <input {...register('otp', { required: verificationEnabled })} className="w-full border rounded px-3 py-2" />
        </div>
      ) : null}
      <div className="hidden">
        <label className="block font-medium">Website</label>
        <input {...register('website')} className="w-full border rounded px-3 py-2" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" value={Date.now()} {...register('submittedAt')} />
      {error ? <div className="p-3 bg-rose-100 text-rose-800 rounded">{error}</div> : null}
      <div className="flex gap-3">
        {verificationEnabled && otpEnabled ? <button type="button" onClick={requestOtp} disabled={isSubmitting} className="px-4 py-2 rounded bg-slate-700 text-white">Send code</button> : null}
        <button disabled={isSubmitting} className="px-4 py-2 rounded bg-indigo-600 text-white">Submit</button>
      </div>
    </form>
  )
}
