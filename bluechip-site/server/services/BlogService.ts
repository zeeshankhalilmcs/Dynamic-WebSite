import { BlogRepositoryPg } from '../repositories/pg/BlogRepositoryPg'
import { z } from 'zod'

export type BlogStatus = 'draft' | 'published'

export type BlogContentBlock =
  | { type: 'paragraph' | 'h2' | 'h3'; text: string }
  | { type: 'bullet-list' | 'numbered-list'; items: string[] }
  | { type: 'callout'; tone?: 'info' | 'success' | 'warning'; title?: string; text: string }
  | { type: 'faq'; items: Array<{ question: string; answer: string }> }
  | { type: 'cta'; text: string; href: string; label: string }

export type BlogListOptions = { includeDrafts?: boolean; category?: string; page?: number; limit?: number }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featuredImage: string
  readingTime: string
  featured?: boolean
  status: BlogStatus
  seoTitle?: string
  seoDescription?: string
  contentBlocks: BlogContentBlock[]
  canonicalUrl?: string
}

const blockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.enum(['paragraph', 'h2', 'h3']), text: z.string().min(1) }),
  z.object({ type: z.enum(['bullet-list', 'numbered-list']), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal('callout'), tone: z.enum(['info', 'success', 'warning']).optional(), title: z.string().optional(), text: z.string().min(1) }),
  z.object({ type: z.literal('faq'), items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1) }),
  z.object({ type: z.literal('cta'), text: z.string().min(1), href: z.string().min(1), label: z.string().min(1) }),
])

export const blogPostInputSchema = z.object({
  title: z.string().min(3), excerpt: z.string().min(10), content: z.string().default(''), category: z.string().min(1), author: z.string().min(1),
  featuredImage: z.string().min(1), tags: z.array(z.string()).default([]), status: z.enum(['draft', 'published']).default('published'), featured: z.boolean().optional(), readingTime: z.string().optional(),
  contentBlocks: z.array(blockSchema).default([]), seoTitle: z.string().optional(), seoDescription: z.string().optional(), canonicalUrl: z.string().optional(), publishedAt: z.string().optional(),
})

const initialPosts: BlogPost[] = [
  {
    slug: 'power-bi-software-solution-pakistan',
    title: 'Power BI software solution in Pakistan for smarter operations',
    excerpt: 'See how modern reporting and analytics help growing businesses move from scattered spreadsheets to confident decision making.',
    content: 'Businesses across Pakistan are under pressure to make faster decisions with fewer manual steps. Power BI turns operational data into clear dashboards that executives, managers, and frontline teams can understand without extra effort.\n\nWhen reporting is centralized, leaders can track sales performance, inventory movement, and operational health from one place. That visibility helps teams respond faster to changes and improves accountability across departments.\n\nAt BlueChip Solution, we help companies connect their systems, clean their data, and design dashboards that support everyday decisions rather than just historical reporting.',
    category: 'Software',
    tags: ['Analytics', 'Power BI', 'Reporting'],
    author: 'BlueChip Team',
    publishedAt: '2026-07-10',
    featuredImage: '/images/blog/erp-reporting.svg',
    readingTime: '5 min read',
    featured: true,
    status: 'published',
    seoTitle: 'Power BI software solution in Pakistan for smarter operations',
    seoDescription: 'Discover how Power BI helps businesses in Pakistan gain better visibility, faster decisions, and stronger reporting.',
    contentBlocks: [{ type: 'paragraph', text: 'Businesses across Pakistan are under pressure to make faster decisions with fewer manual steps. Power BI turns operational data into clear dashboards that executives, managers, and frontline teams can understand without extra effort.' }, { type: 'h2', text: 'Make reporting part of the daily rhythm' }, { type: 'bullet-list', items: ['Connect sales and operational data.', 'Give teams a shared view of performance.', 'Turn recurring questions into useful dashboards.'] }],
  },
  {
    slug: 'restaurant-pos-system-pakistan',
    title: 'How to choose the right restaurant POS system in Pakistan',
    excerpt: 'A strong restaurant POS combines speed, reporting, and flexibility so teams can run operations with less friction.',
    content: 'Restaurant teams need software that helps them move quickly from order intake to payment and reporting. The right POS platform should support bill splitting, kitchen routing, staff management, and straightforward inventory controls.\n\nA practical setup also improves the customer experience. Faster checkout, fewer mistakes, and more accurate reporting create a better service flow during busy periods.\n\nFor businesses in Pakistan, the right platform is usually one that can scale across locations while remaining simple for staff to learn and use every day.',
    category: 'Retail',
    tags: ['POS', 'Restaurant', 'Operations'],
    author: 'BlueChip Team',
    publishedAt: '2026-06-24',
    featuredImage: '/images/blog/pos-inventory-control.svg',
    readingTime: '4 min read',
    status: 'published',
    seoTitle: 'How to choose the right restaurant POS system in Pakistan',
    seoDescription: 'Learn what to look for in a restaurant POS system that supports operations, reporting, and customer service.',
    contentBlocks: [{ type: 'paragraph', text: 'Restaurant teams need software that helps them move quickly from order intake to payment and reporting.' }, { type: 'h2', text: 'Choose for the busiest shift' }, { type: 'numbered-list', items: ['Test order speed and kitchen routing.', 'Review inventory and reporting workflows.', 'Confirm training and support plans.'] }],
  },
  {
    slug: 'fbr-digital-invoicing-guide',
    title: 'A practical guide to FBR digital invoicing for businesses',
    excerpt: 'Stay compliant and reduce manual effort with a simple approach to digital invoicing and invoice workflows.',
    content: 'Digital invoicing requirements are becoming a critical part of modern business operations. Companies need to understand the compliance expectations, filing needs, and reporting standards that apply to their setup.\n\nIn practice, this means reviewing internal finance workflows, invoice templates, and integration points with ERP or accounting software. With the right processes in place, teams can reduce manual work while making audits easier.\n\nBlueChip Solution helps businesses connect invoicing workflows to reliable systems so they stay compliant without sacrificing efficiency.',
    category: 'Compliance',
    tags: ['FBR', 'Finance', 'Digital Invoicing'],
    author: 'BlueChip Team',
    publishedAt: '2026-05-18',
    featuredImage: '/images/blog/digital-invoicing.svg',
    readingTime: '6 min read',
    status: 'published',
    seoTitle: 'A practical guide to FBR digital invoicing for businesses',
    seoDescription: 'See how businesses can modernize invoicing practices and stay aligned with evolving compliance expectations.',
    contentBlocks: [{ type: 'paragraph', text: 'Digital invoicing requirements are becoming a critical part of modern business operations.' }, { type: 'h2', text: 'Prepare your invoice workflow' }, { type: 'bullet-list', items: ['Review invoice data and approvals.', 'Connect finance and operational systems.', 'Keep records ready for review.'] }],
  },
  {
    slug: 'erp-systems-future-trends-pakistan',
    title: 'Future trends in ERP systems shaping business growth',
    excerpt: 'Modern ERP systems are moving toward connected data, flexible workflows, and better visibility across teams.',
    content: 'ERP platforms continue to evolve as businesses want faster access to reliable information. Today, the most effective systems connect finance, supply chain, sales, and operations in a way that helps teams work from the same source of truth.\n\nThis shift is especially valuable for companies with multiple branches or departments. Instead of relying on disconnected spreadsheets or repeated manual entries, leaders can monitor performance and make decisions with more confidence.\n\nA modern ERP approach should balance process control with user friendliness so adoption remains strong over time.',
    category: 'Technology',
    tags: ['ERP', 'Automation', 'Strategy'],
    author: 'BlueChip Team',
    publishedAt: '2026-04-02',
    featuredImage: '/images/blog/erp-data-foundation.svg',
    readingTime: '5 min read',
    status: 'published',
    seoTitle: 'Future trends in ERP systems shaping business growth',
    seoDescription: 'Explore the trends defining the next generation of ERP systems for growing organizations.',
    contentBlocks: [{ type: 'paragraph', text: 'ERP platforms continue to evolve as businesses want faster access to reliable information.' }, { type: 'h2', text: 'The connected ERP direction' }, { type: 'bullet-list', items: ['Shared operational data.', 'Flexible workflows.', 'Accessible reporting.'] }],
  },
  {
    slug: 'erp-benefits-and-challenges',
    title: 'Understanding the benefits and challenges of ERP systems',
    excerpt: 'A well-planned ERP rollout can improve visibility and efficiency, but it requires clear ownership and realistic expectations.',
    content: 'ERP systems can transform daily operations when they are implemented with a clear plan. They improve data visibility, shorten manual work, and make coordination between departments easier.\n\nAt the same time, ERP projects can become difficult when requirements are unclear or teams expect immediate change without preparation. A successful roll out usually includes process review, data cleanup, training, and ongoing support.\n\nThe goal is not only to install software, but to create a system that fits real business needs and remains useful as the organization grows.',
    category: 'Technology',
    tags: ['ERP', 'Change Management', 'Implementation'],
    author: 'BlueChip Team',
    publishedAt: '2026-03-12',
    featuredImage: '/images/blog/software-implementation.svg',
    readingTime: '4 min read',
    status: 'published',
    seoTitle: 'Understanding the benefits and challenges of ERP systems',
    seoDescription: 'Learn how ERP can improve operational visibility and what challenges often come with implementation.',
    contentBlocks: [{ type: 'paragraph', text: 'ERP systems can transform daily operations when they are implemented with a clear plan.' }, { type: 'h2', text: 'Balance capability with adoption' }, { type: 'callout', tone: 'info', title: 'Plan for the people', text: 'Training, ownership, and support are as important as configuration.' }],
  },
  {
    slug: 'seo-that-supports-sales', title: 'SEO that supports sales teams instead of vanity metrics', excerpt: 'Connect search intent to the questions buyers ask before they contact you.', content: 'SEO creates business value when it helps the right people find useful answers.', category: 'SEO', tags: ['SEO', 'Content', 'Growth'], author: 'BlueChip Team', publishedAt: '2026-03-01', featuredImage: '/images/blog/seo-sales-alignment.svg', readingTime: '5 min read', status: 'published', seoTitle: 'SEO that supports sales teams instead of vanity metrics', seoDescription: 'SEO planning that connects useful content, search intent, and qualified business enquiries.', contentBlocks: [{ type: 'paragraph', text: 'SEO creates business value when it helps the right people find useful answers.' }, { type: 'h2', text: 'Connect content to commercial questions' }, { type: 'bullet-list', items: ['Start with customer problems.', 'Add proof that makes the next step safe.', 'Link useful guidance to a clear next action.'] }, { type: 'callout', tone: 'success', title: 'Measure the handoff', text: 'Track qualified enquiries alongside traffic and rankings.' }] },
  {
    slug: 'ai-assisted-customer-operations', title: 'Where AI assistance fits into customer operations', excerpt: 'Use AI to reduce repetitive work while keeping human judgement at the centre of customer relationships.', content: 'AI is most useful when it removes friction from repeatable work without hiding important decisions.', category: 'AI', tags: ['AI', 'Customer Service', 'Automation'], author: 'BlueChip Team', publishedAt: '2026-02-18', featuredImage: '/images/blog/ai-customer-operations.svg', readingTime: '6 min read', status: 'published', seoTitle: 'Where AI assistance fits into customer operations', seoDescription: 'A practical guide to introducing AI assistance with human oversight.', contentBlocks: [{ type: 'paragraph', text: 'AI is most useful when it removes friction from repeatable work without hiding important decisions.' }, { type: 'h2', text: 'A safe starting sequence' }, { type: 'numbered-list', items: ['Choose a narrow workflow.', 'Set approved information and boundaries.', 'Keep human review for customer-impacting actions.', 'Review errors regularly.'] }, { type: 'cta', text: 'Discuss an AI-assisted workflow.', href: '/contact', label: 'Start a conversation' }] },
  {
    slug: 'software-implementation-without-disruption', title: 'How to implement new business software without disrupting the day', excerpt: 'A phased implementation protects the workflows that keep the business moving.', content: 'Software implementation is an operational change programme, not just an installation task.', category: 'Software', tags: ['Software', 'Implementation', 'Change'], author: 'BlueChip Team', publishedAt: '2026-02-04', featuredImage: '/images/blog/software-implementation.svg', readingTime: '5 min read', status: 'published', seoTitle: 'How to implement new business software without disrupting the day', seoDescription: 'A phased software implementation approach for growing teams.', contentBlocks: [{ type: 'paragraph', text: 'Software implementation is an operational change programme, not just an installation task.' }, { type: 'h2', text: 'Use a phased rollout' }, { type: 'bullet-list', items: ['Document the current process.', 'Pilot one team.', 'Train on real scenarios.', 'Expand after support questions become predictable.'] }, { type: 'callout', tone: 'warning', title: 'Avoid the big-bang trap', text: 'Changing every workflow at once makes problems harder to diagnose.' }] },
]

export const blogSeedPosts: BlogPost[] = initialPosts.map((post) => ({ ...post }))
let blogPosts: BlogPost[] = blogSeedPosts.map((post) => ({ ...post }))
const repo = new BlogRepositoryPg()

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getAllPosts(options: boolean | BlogListOptions = false) {
  const normalized = typeof options === 'boolean' ? { includeDrafts: options } : options
  try {
    const posts = await repo.list(normalized)
    return posts.map((post) => ({ ...post, tags: [...post.tags] }))
  } catch {
    const visiblePosts = normalized.includeDrafts ? blogPosts : blogPosts.filter((post) => post.status === 'published')
    const filtered = normalized.category ? visiblePosts.filter((post) => post.category === normalized.category) : visiblePosts
    const start = ((normalized.page ?? 1) - 1) * (normalized.limit ?? 100)
    return filtered.slice(start, start + (normalized.limit ?? 100)).map((post) => ({ ...post, tags: [...post.tags] }))
  }
}

export async function getFeaturedPosts() {
  const posts = await getAllPosts()
  return posts.filter((post) => post.featured)
}

export async function getPostBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  try {
    const post = await repo.getBySlug(slug, options.includeDrafts)
    return post ? { ...post, tags: [...post.tags] } : null
  } catch {
    const post = blogPosts.find((item) => item.slug === slug && (options.includeDrafts || item.status === 'published'))
    return post ? { ...post, tags: [...post.tags] } : null
  }
}

export async function getRelatedPosts(slug: string) {
  const posts = await getAllPosts()
  return posts.filter((post) => post.slug !== slug).slice(0, 3)
}

export async function createBlogPost(input: Partial<BlogPost> & Pick<BlogPost, 'title' | 'excerpt' | 'content' | 'category' | 'author' | 'featuredImage'> & { tags?: string[] }) {
  const validated = blogPostInputSchema.parse(input)
  const slug = slugify(input.title)
  const post: BlogPost = {
    slug,
    title: input.title,
    excerpt: input.excerpt,
    content: validated.content,
    category: input.category,
    tags: input.tags ?? [],
    author: input.author,
    publishedAt: new Date().toISOString(),
    featuredImage: input.featuredImage,
    readingTime: input.readingTime ?? '4 min read',
    featured: input.featured ?? false,
    status: input.status ?? 'published',
    contentBlocks: validated.contentBlocks,
    seoTitle: validated.seoTitle,
    seoDescription: validated.seoDescription,
    canonicalUrl: validated.canonicalUrl,
  }

  try {
    const persisted = await repo.create(post)
    blogPosts = [persisted, ...blogPosts.filter((item) => item.slug !== persisted.slug)]
    return { ...persisted, tags: [...persisted.tags] }
  } catch {
    blogPosts = [post, ...blogPosts]
    return { ...post, tags: [...post.tags] }
  }
}

export async function updateBlogPost(slug: string, updates: Partial<BlogPost>) {
  const validated = blogPostInputSchema.partial().parse(updates)
  try {
    const updated = await repo.update(slug, validated)
    if (!updated) return null
    blogPosts = blogPosts.map((post) => (post.slug === slug ? { ...updated, tags: [...updated.tags] } : post))
    return { ...updated, tags: [...updated.tags] }
  } catch {
    const index = blogPosts.findIndex((post) => post.slug === slug)
    if (index === -1) return null

    const current = blogPosts[index]
    const updated = {
      ...current,
      ...validated,
      tags: validated.tags ?? current.tags,
    }

    blogPosts[index] = updated
    return { ...updated, tags: [...updated.tags] }
  }
}

export async function deleteBlogPost(slug: string) {
  try {
    const removed = await repo.remove(slug)
    if (removed) {
      blogPosts = blogPosts.filter((post) => post.slug !== slug)
    }
    return removed
  } catch {
    const existing = blogPosts.find((post) => post.slug === slug)
    if (!existing) return false

    blogPosts = blogPosts.filter((post) => post.slug !== slug)
    return true
  }
}
