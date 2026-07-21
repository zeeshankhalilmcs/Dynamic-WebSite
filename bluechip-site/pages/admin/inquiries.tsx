import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

type InquiryItem = {
  id: string
  name: string
  email: string
  company?: string | null
  inquiry_type?: string | null
  message?: string | null
  country?: string | null
  region?: string | null
  city?: string | null
  is_bot?: boolean
  reviewed?: boolean
  created_at?: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [query, setQuery] = useState('')
  const [reviewedFilter, setReviewedFilter] = useState<'all' | 'true' | 'false'>('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
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
        const params = new URLSearchParams({ page: String(page) })
    if (query) params.set('query', query)
    if (reviewedFilter !== 'all') params.set('reviewed', reviewedFilter)

        setLoading(true)
        fetch(`/api/admin/inquiries?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((data) => {
            setInquiries(data.inquiries || [])
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
  }, [page, query, reviewedFilter])

  async function markReviewed(id: string) {
    const token = localStorage.getItem('admin_token')
    if (!token) return

    await fetch('/api/admin/mark-reviewed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })

    setInquiries((current) => current.map((item) => item.id === id ? { ...item, reviewed: true } : item))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Inquiry Review</h1>
            <p className="mt-2 text-slate-600">Review submissions, search by contact or company, and follow up quickly.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow md:flex-row md:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or company"
            className="w-full rounded border px-3 py-2"
          />
          <select value={reviewedFilter} onChange={(e) => setReviewedFilter(e.target.value as 'all' | 'true' | 'false')} className="rounded border px-3 py-2">
            <option value="all">All statuses</option>
            <option value="false">Unreviewed</option>
            <option value="true">Reviewed</option>
          </select>
          <button onClick={() => { setPage(1); setQuery(''); setReviewedFilter('all') }} className="rounded bg-slate-800 px-3 py-2 text-white">Reset</button>
        </div>

        {loading ? <div className="rounded-3xl bg-white p-6 shadow">Loading inquiries...</div> : null}

        {!loading && inquiries.length === 0 ? <div className="rounded-3xl bg-white p-6 shadow">No inquiries match the current filters.</div> : null}

        {!loading && inquiries.length > 0 ? (
          <div className="space-y-3">
            {inquiries.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-5 shadow">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{item.inquiry_type || 'General'}</span>
                      {item.is_bot ? <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">Bot flagged</span> : null}
                      {item.reviewed ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800">Reviewed</span> : <span className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-800">Pending</span>}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.email}</p>
                    <p className="text-sm text-slate-600">{item.company || 'No company provided'}</p>
                    <p className="mt-2 text-sm text-slate-700">{item.message || 'No message provided.'}</p>
                    <p className="mt-3 text-xs text-slate-500">{item.country ? `${item.country}${item.region ? ` / ${item.region}` : ''}${item.city ? ` / ${item.city}` : ''}` : 'Location unavailable'}</p>
                  </div>
                  <button onClick={() => markReviewed(item.id)} className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Mark reviewed</button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex justify-between">
          <button disabled={page === 1} onClick={() => setPage((value) => Math.max(value - 1, 1))} className="rounded border px-3 py-2 disabled:opacity-50">Previous</button>
          <span className="text-sm text-slate-600">Page {page}</span>
          <button onClick={() => setPage((value) => value + 1)} className="rounded border px-3 py-2">Next</button>
        </div>
      </div>
    </AdminLayout>
  )
}
