import type { BlogListOptions, BlogPost, BlogStatus } from '../services/BlogService'

export interface BlogRepository {
  list(options?: BlogListOptions): Promise<BlogPost[]>
  getBySlug(slug: string, includeDrafts?: boolean): Promise<BlogPost | null>
  create(post: Omit<BlogPost, 'slug' | 'publishedAt'> & { slug?: string; publishedAt?: string }): Promise<BlogPost>
  update(slug: string, post: Partial<BlogPost>): Promise<BlogPost | null>
  remove(slug: string): Promise<boolean>
}

export type BlogRepositoryRow = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  published_at: string
  featured_image: string
  reading_time: string
  featured: boolean
  status: BlogStatus
  content_blocks: BlogPost['contentBlocks']
  seo_title: string | null
  seo_description: string | null
  canonical_url: string | null
}
