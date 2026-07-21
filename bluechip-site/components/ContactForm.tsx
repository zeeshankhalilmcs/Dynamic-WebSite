import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useEffect, useState } from 'react'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  inquiryType: string
  message?: string
  website?: string
  submittedAt?: number
  otp?: string
}

export default function ContactForm(){
  const { register, handleSubmit, getValues, formState: { isSubmitting } } = useForm<FormData>({ defaultValues: { inquiryType: 'General', submittedAt: Date.now() } })
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [verificationEnabled, setVerificationEnabled] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    axios.get('/api/settings').then((res) => {
      const settings = res.data || {}
      const enabled = Boolean(settings.verification?.enabled)
      const otp = Boolean(settings.verification?.otpEnabled)
      setVerificationEnabled(enabled)
      setOtpEnabled(otp)
    })
  }, [])

  async function requestOtp() {
    const values = getValues()
    try {
      const response = await axios.post('/api/contact/request-otp', { email: values.email })
      if (response.data.success) {
        setOtpSent(true)
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

      const payload = { ...data, submittedAt: Date.now() }
      await axios.post('/api/contact', payload)
      setSuccess('Thank you — we received your inquiry.')
    }catch(err:any){
      setError(err?.response?.data?.error || 'Submission failed. Please try again later.')
    }
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
      <input type="hidden" {...register('submittedAt')} />
      <div className="hidden">
        <label className="block font-medium">Website</label>
        <input {...register('website')} className="w-full border rounded px-3 py-2" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? <div className="p-3 bg-rose-100 text-rose-800 rounded">{error}</div> : null}
      <div className="flex gap-3">
        {verificationEnabled && otpEnabled ? <button type="button" onClick={requestOtp} disabled={isSubmitting} className="px-4 py-2 rounded bg-slate-700 text-white">Send code</button> : null}
        <button disabled={isSubmitting} className="px-4 py-2 rounded bg-indigo-600 text-white">Submit</button>
      </div>
    </form>
  )
}
