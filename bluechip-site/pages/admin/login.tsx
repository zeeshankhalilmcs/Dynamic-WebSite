import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [captchaEnabled, setCaptchaEnabled] = useState(false)
  const [captchaConfirmed, setCaptchaConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setError('')
    setLoading(true)

    if (captchaEnabled && !captchaConfirmed) {
      setError('Please confirm you are not a robot.')
      setLoading(false)
      return
    }

    try {
      const payload = username.trim() && password.trim()
        ? { username, password }
        : { token }

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      localStorage.setItem('admin_token', data.token)
      document.cookie = `admin_token=${encodeURIComponent(data.token)}; path=/; max-age=28800; SameSite=Lax`
      router.push('/admin')
    } catch {
      setError('Unable to sign in right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Blue Chip Solutions</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Secure sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Use your seeded super admin credentials or the existing admin token.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none ring-0"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none ring-0"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Admin token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none ring-0"
              placeholder="Enter admin token if you have one"
            />
          </div>
          {captchaEnabled ? (
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={captchaConfirmed} onChange={(e) => setCaptchaConfirmed(e.target.checked)} />
              I confirm I am not a robot.
            </label>
          ) : null}
          {error ? <div className="rounded-xl bg-rose-500/15 px-3 py-2 text-sm text-rose-300">{error}</div> : null}
          <button disabled={loading} className="w-full rounded-xl bg-amber-500 px-4 py-2 font-medium text-slate-950 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
