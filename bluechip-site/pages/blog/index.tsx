import Head from 'next/head'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BlogCard from '../../components/BlogCard'
import BookConsultationCard from '../../components/BookConsultationCard'
import { getAllPosts, getFeaturedPosts } from '../../server/services/BlogService'
import type { BlogPost } from '../../server/services/BlogService'

type BlogPageProps = {
  posts: BlogPost[]
  featuredPosts: BlogPost[]
  initialHasMore: boolean
}

export async function getStaticProps() {
  const posts = await getAllPosts({ page: 1, limit: 6 })
  const nextPage = await getAllPosts({ page: 2, limit: 6 })
  const featuredPosts = await getFeaturedPosts()

  return {
    props: {
      posts,
      featuredPosts,
      initialHasMore: nextPage.length > 0,
    },
  }
}

export default function BlogPage({ posts: initialPosts, featuredPosts, initialHasMore }: BlogPageProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const featured = category === 'All' ? featuredPosts[0] : undefined
  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map((post) => post.category)))], [posts])
  const filteredPosts = category === 'All' ? posts : posts.filter((post) => post.category === category)
  const regularPosts = filteredPosts.filter((post) => post.slug !== featured?.slug)

  async function loadCategory(nextCategory: string) {
    setLoading(true); setError(''); setCategory(nextCategory)
    try {
      const response = await fetch(`/api/blog/posts?page=1&limit=6${nextCategory === 'All' ? '' : `&category=${encodeURIComponent(nextCategory)}`}`)
      if (!response.ok) throw new Error('Unable to load articles.')
      const payload = await response.json()
      setPosts(payload.posts ?? [])
      setPage(1)
      setHasMore(Boolean(payload.hasMore))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load articles.')
    } finally { setLoading(false) }
  }

  async function loadMore() {
    setLoading(true); setError('')
    try {
      const nextPage = page + 1
      const response = await fetch(`/api/blog/posts?page=${nextPage}&limit=6${category === 'All' ? '' : `&category=${encodeURIComponent(category)}`}`)
      if (!response.ok) throw new Error('Unable to load more articles.')
      const payload = await response.json()
      setPosts((current) => [...current, ...(payload.posts ?? []).filter((post: BlogPost) => !current.some((item) => item.slug === post.slug))])
      setPage(nextPage); setHasMore(Boolean(payload.hasMore))
    } catch (loadError) { setError(loadError instanceof Error ? loadError.message : 'Unable to load more articles.') } finally { setLoading(false) }
  }

  return (
    <>
      <Head>
        <title>Blog | BlueChip Solution</title>
        <meta name="description" content="Insights on ERP, POS, analytics, and digital operations for modern businesses in Pakistan." />
        <meta property="og:title" content="Blog | BlueChip Solution" />
        <meta property="og:description" content="Insights on ERP, POS, analytics, and digital operations for modern businesses in Pakistan." />
      </Head>

      <Header />
      <main className="container py-16 lg:py-20">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Insights & strategy</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Practical ideas for growing operations and smarter technology decisions.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Explore articles on ERP, POS, reporting, compliance, and digital transformation that help businesses move faster with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((topic) => (
              <button key={topic} onClick={() => void loadCategory(topic)} disabled={loading} className={`rounded-full border px-4 py-2 text-sm font-medium ${category === topic ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600'}`}>
                {topic}
              </button>
            ))}
          </div>
        </section>

        {featured && (
          <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <img src={featured.featuredImage} alt={featured.title} className="h-72 w-full object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">{featured.category}</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">{featured.title}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{featured.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span>{featured.author}</span>
                  <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Read featured article
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Why teams read the blog</p>
              <h3 className="mt-4 text-2xl font-semibold">Practical guidance for system selection, onboarding, and growth.</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                <li>• Understand the tradeoffs behind ERP, POS, and analytics choices.</li>
                <li>• Learn how to plan implementation without unnecessary complexity.</li>
                <li>• See how technology can support better operations and service quality.</li>
              </ul>
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
        {error && <p className="mt-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
        {!loading && regularPosts.length === 0 && <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">No published articles match this category yet.</p>}
        {hasMore && regularPosts.length > 0 && <div className="mt-8 text-center"><button onClick={loadMore} disabled={loading} className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 disabled:opacity-50">{loading ? 'Loading articles…' : 'Load more articles'}</button></div>}

        <BookConsultationCard />
      </main>

      <Footer />
    </>
  )
}
