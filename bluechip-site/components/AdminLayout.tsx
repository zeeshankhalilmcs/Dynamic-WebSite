import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  async function handleLogout() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token')
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      }

      localStorage.removeItem('admin_token')
      document.cookie = 'admin_token=; path=/; max-age=0; SameSite=Lax'
      window.location.href = '/admin/login'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-20">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="font-bold text-xl">BT Admin</Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-slate-700 hover:text-slate-900">Dashboard</Link>
            <Link href="/admin/inquiries" className="text-slate-700 hover:text-slate-900">Inquiries</Link>
            <Link href="/admin/settings" className="text-slate-700 hover:text-slate-900">Settings</Link>
            <button onClick={handleLogout} className="rounded border px-3 py-1 text-sm text-slate-700">Logout</button>
          </nav>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  )
}
