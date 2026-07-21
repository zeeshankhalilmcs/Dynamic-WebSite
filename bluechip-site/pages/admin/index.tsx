import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token') || ''
    setToken(storedToken)
    if (!storedToken) {
      setLoading(false)
      return
    }

    fetch('/api/admin/me', { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/admin/login'
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (!data) return
        fetch('/api/admin/metrics', { headers: { Authorization: `Bearer ${storedToken}` } })
          .then((metricsRes) => metricsRes.json())
          .then((metricsData) => {
            setMetrics(metricsData)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }, [])

  function saveToken() {
    localStorage.setItem('admin_token', token)
    window.location.reload()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">Review inquiries and monitor contact performance.</p>
          </div>
          <a href="/admin/settings" className="rounded bg-slate-800 px-3 py-2 text-sm text-white">Open settings</a>
        </div>

        {!token ? (
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-sm text-slate-600">Enter the admin token to access the dashboard.</p>
            <div className="mt-4 flex gap-3">
              <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Admin token" className="w-full rounded border px-3 py-2" />
              <button onClick={saveToken} className="rounded bg-indigo-600 px-4 py-2 text-white">Enter</button>
            </div>
          </div>
        ) : null}

        {loading && <div>Loading metrics...</div>}
        {metrics && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-6 rounded-3xl bg-white shadow">
              <div className="text-sm text-slate-500">Total Inquiries</div>
              <div className="mt-3 text-3xl font-semibold">{metrics.stats.total}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white shadow">
              <div className="text-sm text-slate-500">Unreviewed</div>
              <div className="mt-3 text-3xl font-semibold">{metrics.stats.unreviewed}</div>
            </div>
            <div className="p-6 rounded-3xl bg-white shadow">
              <div className="text-sm text-slate-500">Bot Submissions</div>
              <div className="mt-3 text-3xl font-semibold">{metrics.stats.bot_count}</div>
            </div>
          </div>
        )}
        {metrics && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold">Top countries</h2>
              <ul className="mt-4 space-y-3">
                {metrics.geo.map((item:any) => (
                  <li key={item.country} className="flex justify-between gap-4 border-b pb-3">
                    <span>{item.country || 'Unknown'}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="text-xl font-semibold">Last 14 days</h2>
              <ul className="mt-4 space-y-3">
                {metrics.trend.map((item:any) => (
                  <li key={item.period} className="flex justify-between gap-4 border-b pb-3">
                    <span>{item.period}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  )
}
