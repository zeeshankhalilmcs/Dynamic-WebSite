import { pool } from '../../db/pool'
import type { BlogListOptions, BlogPost, BlogStatus } from '../../services/BlogService'
import type { BlogRepository, BlogRepositoryRow } from '../BlogRepository'

function mapRow(row: BlogRepositoryRow): BlogPost {
  const publishedAt = typeof row.published_at === 'string'
    ? row.published_at
    : typeof (row.published_at as { toISOString?: () => string })?.toISOString === 'function'
      ? (row.published_at as { toISOString: () => string }).toISOString()
      : new Date().toISOString()

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags ?? [],
    author: row.author,
    publishedAt,
    featuredImage: row.featured_image,
    readingTime: row.reading_time,
    featured: row.featured,
    status: row.status,
    contentBlocks: row.content_blocks ?? [],
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    canonicalUrl: row.canonical_url ?? undefined,
  }
}

export class BlogRepositoryPg implements BlogRepository {
  async list(options: BlogListOptions = {}): Promise<BlogPost[]> {
    const conditions = options.includeDrafts ? [] : ["status = 'published'"]
    const values: string[] = []
    if (options.category) { values.push(options.category); conditions.push(`category = $${values.length}`) }
    const page = Math.max(options.page ?? 1, 1)
    const limit = Math.min(Math.max(options.limit ?? 100, 1), 100)
    values.push(String(limit), String((page - 1) * limit))
    const res = await pool.query(`SELECT * FROM blog_posts ${conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''} ORDER BY published_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`, values)
    return res.rows.map((row: BlogRepositoryRow) => mapRow(row))
  }

  async getBySlug(slug: string, includeDrafts = false): Promise<BlogPost | null> {
    const res = await pool.query(`SELECT * FROM blog_posts WHERE slug = $1${includeDrafts ? '' : " AND status = 'published'"}`, [slug])
    if (res.rows.length === 0) return null
    return mapRow(res.rows[0] as BlogRepositoryRow)
  }

  async create(post: Omit<BlogPost, 'slug' | 'publishedAt'> & { slug?: string; publishedAt?: string }): Promise<BlogPost> {
    const slug = post.slug || `${Date.now()}`
    const values = [
      slug,
      post.title,
      post.excerpt,
      post.content,
      post.category,
      post.tags ?? [],
      post.author,
      post.publishedAt ?? new Date().toISOString(),
      post.featuredImage,
      post.readingTime ?? '4 min read',
      post.featured ?? false,
      post.status ?? 'published',
      JSON.stringify(post.contentBlocks ?? []),
      post.seoTitle ?? null,
      post.seoDescription ?? null,
      post.canonicalUrl ?? null,
    ]

    const res = await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, author, published_at, featured_image, reading_time, featured, status, content_blocks, seo_title, seo_description, canonical_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14, $15, $16)
       RETURNING *`,
      values,
    )

    return mapRow(res.rows[0] as BlogRepositoryRow)
  }

  async update(slug: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
    const fields: string[] = []
    const values: unknown[] = []

    const mapping: Array<[string, unknown]> = [
      ['title', post.title],
      ['excerpt', post.excerpt],
      ['content', post.content],
      ['category', post.category],
      ['tags', post.tags],
      ['author', post.author],
      ['published_at', post.publishedAt],
      ['featured_image', post.featuredImage],
      ['reading_time', post.readingTime],
      ['featured', post.featured],
      ['status', post.status],
      ['content_blocks', post.contentBlocks ? JSON.stringify(post.contentBlocks) : undefined],
      ['seo_title', post.seoTitle],
      ['seo_description', post.seoDescription],
      ['canonical_url', post.canonicalUrl],
    ]

    for (const [field, value] of mapping) {
      if (value !== undefined) {
        fields.push(`${field} = $${fields.length + 2}${field === 'content_blocks' ? '::jsonb' : ''}`)
        values.push(value)
      }
    }

    if (fields.length === 0) {
      return this.getBySlug(slug)
    }

    values.unshift(slug)
    const res = await pool.query(`UPDATE blog_posts SET ${fields.join(', ')} WHERE slug = $1 RETURNING *`, values)
    if (res.rows.length === 0) return null
    return mapRow(res.rows[0] as BlogRepositoryRow)
  }

  async remove(slug: string): Promise<boolean> {
    const res = await pool.query('DELETE FROM blog_posts WHERE slug = $1', [slug])
    return (res.rowCount ?? 0) > 0
  }
}
