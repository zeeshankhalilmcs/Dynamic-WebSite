import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AdminLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [captchaEnabled, setCaptchaEnabled] = useState(false)
  const [captchaConfirmed, setCaptchaConfirmed] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (storedToken) {
      router.replace('/admin')
    }

    axios.get('/api/settings').then((res) => {
      const enabled = Boolean(res.data?.verification?.enabled)
      setCaptchaEnabled(enabled)
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token.trim()) {
      setError('Please enter the admin token.')
      return
    }

    if (captchaEnabled && !captchaConfirmed) {
      setError('Please confirm you are not a robot.')
      return
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      localStorage.setItem('admin_token', data.token)
      document.cookie = `admin_token=${encodeURIComponent(data.token)}; path=/; max-age=28800; SameSite=Lax`
      router.push('/admin')
    } catch {
      setError('Unable to sign in right now.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-600">Use the configured admin token to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Admin token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter token"
            />
          </div>
          {captchaEnabled ? (
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={captchaConfirmed} onChange={(e) => setCaptchaConfirmed(e.target.checked)} />
              I confirm I am not a robot.
            </label>
          ) : null}
          {error ? <div className="rounded bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
          <button className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white">Sign in</button>
        </form>
      </div>
    </div>
  )
}
