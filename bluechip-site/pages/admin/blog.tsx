import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import type { BlogContentBlock, BlogPost } from '../../server/services/BlogService'

type BlogFormState = {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  featuredImage: string
  tags: string
  status: 'draft' | 'published'
  featured: boolean
  seoTitle: string
  seoDescription: string
  canonicalUrl: string
  contentBlocks: BlogContentBlock[]
}

type TextBlockType = 'paragraph' | 'h2' | 'h3'

function isTextBlock(block: BlogContentBlock): block is Extract<BlogContentBlock, { type: TextBlockType }> {
  return block.type === 'paragraph' || block.type === 'h2' || block.type === 'h3'
}

const emptyForm = (): BlogFormState => ({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  author: 'BlueChip Team',
  featuredImage: '',
  tags: '',
  status: 'published',
  featured: false,
  seoTitle: '', seoDescription: '', canonicalUrl: '', contentBlocks: [{ type: 'paragraph', text: '' }],
})

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [form, setForm] = useState<BlogFormState>(emptyForm())
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadPosts() {
      const token = localStorage.getItem('admin_token') || ''
      const res = await fetch('/api/blog/posts?includeDrafts=1', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const payload = await res.json()
        setPosts(payload.posts ?? [])
      }
    }

    loadPosts()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.title || !form.excerpt || !form.content || !form.category || !form.author) {
      setMessage('Please complete the required fields.')
      return
    }

    const dto = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      author: form.author,
      featuredImage: form.featuredImage || '/images/blog/software-implementation.svg',
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      status: form.status,
      featured: form.featured,
      seoTitle: form.seoTitle, seoDescription: form.seoDescription, canonicalUrl: form.canonicalUrl,
      contentBlocks: form.contentBlocks.filter((block) => !isTextBlock(block) || block.text.trim()).map((block) => isTextBlock(block) ? { ...block, text: block.text.trim() } : block),
    }
    const token = localStorage.getItem('admin_token') || ''
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

    if (editingSlug) {
      const response = await fetch(`/api/blog/posts/${editingSlug}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(dto),
      })

      if (response.ok) {
        const updated = await response.json()
        setPosts((current) => current.map((post) => (post.slug === editingSlug ? updated : post)))
        setMessage('Blog post updated successfully.')
      }
    } else {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify(dto),
      })

      if (response.ok) {
        const created = await response.json()
        setPosts((current) => [created, ...current])
        setMessage('Blog post created successfully.')
      }
    }

    setForm(emptyForm())
    setEditingSlug(null)
  }

  function startEdit(post: BlogPost) {
    setEditingSlug(post.slug)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      featuredImage: post.featuredImage,
      tags: post.tags.join(', '),
      status: post.status,
      featured: post.featured ?? false,
      seoTitle: post.seoTitle ?? '', seoDescription: post.seoDescription ?? '', canonicalUrl: post.canonicalUrl ?? '', contentBlocks: post.contentBlocks?.length ? post.contentBlocks : [{ type: 'paragraph', text: post.content }],
    })
  }

  async function handleDelete(slug: string) {
    const token = localStorage.getItem('admin_token') || ''
    const response = await fetch(`/api/blog/posts/${slug}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    if (response.ok) {
      setPosts((current) => current.filter((post) => post.slug !== slug))
      setMessage('Blog post removed.')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="mt-2 text-slate-600">Create, edit, and publish posts for the public blog.</p>
          </div>

        </div>

        {message ? <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <input value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} className="w-full rounded border px-3 py-2" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))} className="w-full rounded border px-3 py-2" required />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm((current) => ({ ...current, excerpt: e.target.value }))} className="w-full rounded border px-3 py-2" rows={3} required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Content</label>
            <textarea value={form.content} onChange={(e) => setForm((current) => ({ ...current, content: e.target.value }))} className="w-full rounded border px-3 py-2" rows={8} required />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between"><label className="text-sm font-medium">Structured content blocks</label><button type="button" onClick={() => setForm((current) => ({ ...current, contentBlocks: [...current.contentBlocks, { type: 'paragraph', text: '' }] }))} className="rounded border bg-white px-3 py-1 text-sm">Add paragraph</button></div>
            <div className="mt-3 space-y-3">
              {form.contentBlocks.map((block, index) => (
                <div key={index} className="flex gap-2">
                  {isTextBlock(block) ? <>
                    <select value={block.type} onChange={(e) => setForm((current) => ({ ...current, contentBlocks: current.contentBlocks.map((item, itemIndex) => itemIndex === index && isTextBlock(item) ? { ...item, type: e.target.value as TextBlockType } : item) }))} className="rounded border px-2 py-2"><option value="paragraph">Paragraph</option><option value="h2">H2</option><option value="h3">H3</option></select>
                    <input value={block.text} onChange={(e) => setForm((current) => ({ ...current, contentBlocks: current.contentBlocks.map((item, itemIndex) => itemIndex === index && isTextBlock(item) ? { ...item, text: e.target.value } : item) }))} className="min-w-0 flex-1 rounded border px-3 py-2" placeholder="Block text" />
                  </> : <div className="min-w-0 flex-1 rounded border border-dashed bg-white px-3 py-2 text-sm text-slate-600">{block.type} block (preserved; this editor supports paragraph, H2, and H3 editing)</div>}
                  <button type="button" onClick={() => setForm((current) => ({ ...current, contentBlocks: current.contentBlocks.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded border px-3 text-rose-600">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Search appearance</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium">SEO title</label><input value={form.seoTitle} onChange={(e) => setForm((current) => ({ ...current, seoTitle: e.target.value }))} className="w-full rounded border px-3 py-2" /></div>
              <div><label className="mb-2 block text-sm font-medium">Canonical URL</label><input value={form.canonicalUrl} onChange={(e) => setForm((current) => ({ ...current, canonicalUrl: e.target.value }))} className="w-full rounded border px-3 py-2" /></div>
            </div>
            <div className="mt-4"><label className="mb-2 block text-sm font-medium">SEO description</label><textarea value={form.seoDescription} onChange={(e) => setForm((current) => ({ ...current, seoDescription: e.target.value }))} className="w-full rounded border px-3 py-2" rows={2} /></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Author</label>
              <input value={form.author} onChange={(e) => setForm((current) => ({ ...current, author: e.target.value }))} className="w-full rounded border px-3 py-2" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => setForm((current) => ({ ...current, tags: e.target.value }))} className="w-full rounded border px-3 py-2" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Featured image URL</label>
              <input value={form.featuredImage} onChange={(e) => setForm((current) => ({ ...current, featuredImage: e.target.value }))} className="w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select value={form.status} onChange={(e) => setForm((current) => ({ ...current, status: e.target.value as 'draft' | 'published' }))} className="w-full rounded border px-3 py-2">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm((current) => ({ ...current, featured: e.target.checked }))} />
            Feature this post on the blog home page
          </label>

          <div className="flex gap-3">
            <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-white">{editingSlug ? 'Update post' : 'Create post'}</button>
            {editingSlug ? <button type="button" onClick={() => { setEditingSlug(null); setForm(emptyForm()) }} className="rounded border px-4 py-2">Cancel</button> : null}
          </div>
        </form>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Existing posts</h2>
          <div className="mt-4 space-y-3">
            {posts.map((post) => (
              <div key={post.slug} className="flex items-center justify-between gap-4 rounded border p-4">
                <div>
                  <div className="font-semibold text-slate-900">{post.title}</div>
                  <div className="text-sm text-slate-500">{post.category} • {post.status}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(post)} className="rounded border px-3 py-2 text-sm">Edit</button>
                  <button onClick={() => handleDelete(post.slug)} className="rounded border px-3 py-2 text-sm text-rose-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
