import type { NextApiRequest, NextApiResponse } from 'next'
import { createBlogPost, deleteBlogPost, getPostBySlug, updateBlogPost } from '../../../../server/services/BlogService'
import { requireAdminAuth } from '../../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' })
  }

  if (req.method === 'GET') {
    const includeDrafts = req.query.includeDrafts === '1'
    if (includeDrafts) {
      const authError = await requireAdminAuth(req)
      if (authError) return res.status(401).json({ error: authError })
    }
    const post = await getPostBySlug(slug, { includeDrafts })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    return res.status(200).json(post)
  }

  if (req.method === 'PUT') {
    const authError = await requireAdminAuth(req)
    if (authError) return res.status(401).json({ error: authError })
    try {
      const updated = await updateBlogPost(slug, req.body || {})
      if (!updated) return res.status(404).json({ error: 'Post not found' })
      return res.status(200).json(updated)
    } catch (error) {
      return res.status(400).json({ error: 'Validation failed', details: error instanceof Error ? error.message : error })
    }
  }

  if (req.method === 'DELETE') {
    const authError = await requireAdminAuth(req)
    if (authError) return res.status(401).json({ error: authError })
    const removed = await deleteBlogPost(slug)
    return res.status(200).json({ removed })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
