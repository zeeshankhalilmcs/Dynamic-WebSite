import type { NextApiRequest, NextApiResponse } from 'next'
import { createBlogPost, getAllPosts, getFeaturedPosts } from '../../../server/services/BlogService'
import { requireAdminAuth } from '../../../server/services/AdminAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const includeDrafts = req.query.includeDrafts === '1'
    if (includeDrafts) {
      const authError = await requireAdminAuth(req)
      if (authError) return res.status(401).json({ error: authError })
    }
    const category = typeof req.query.category === 'string' ? req.query.category : undefined
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 50)
    const posts = await getAllPosts({ includeDrafts, category, page, limit })
    const nextPage = await getAllPosts({ includeDrafts, category, page: page + 1, limit: 1 })
    const featured = await getFeaturedPosts()

    return res.status(200).json({ posts, featured, page, limit, hasMore: nextPage.length > 0 })
  }

  if (req.method === 'POST') {
    const authError = await requireAdminAuth(req)
    if (authError) return res.status(401).json({ error: authError })
    try {
      const created = await createBlogPost(req.body || {})
      return res.status(201).json(created)
    } catch (error) {
      return res.status(400).json({ error: 'Validation failed', details: error instanceof Error ? error.message : error })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
