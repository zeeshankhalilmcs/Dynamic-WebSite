import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BlogCard from '../../components/BlogCard'
import BlogContentRenderer from '../../components/BlogContentRenderer'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../server/services/BlogService'
import type { BlogPost } from '../../server/services/BlogService'

type BlogPostPageProps = {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug
  if (!slug) {
    return { notFound: true }
  }

  const post = await getPostBySlug(slug)
  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
      relatedPosts: await getRelatedPosts(slug),
    },
  }
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const faqBlocks = post.contentBlocks.filter((block) => block.type === 'faq')
  const canonical = post.canonicalUrl || `https://bluechipsolution.net/blog/${post.slug}`
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, image: [post.featuredImage], author: { '@type': 'Person', name: post.author }, datePublished: post.publishedAt, mainEntityOfPage: canonical }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://bluechipsolution.net/blog' }, { '@type': 'ListItem', position: 2, name: post.title, item: canonical }] }

  return (
    <>
      <Head>
        <title>{post.seoTitle || post.title} | BlueChip Solution</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.seoDescription || post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle || post.title} />
        <meta name="twitter:description" content={post.seoDescription || post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqBlocks.map((block, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: block.items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }) }} />)}
      </Head>

      <Header />
      <main className="container py-16 lg:py-20">
        <div className="mb-8">
          <Link href="/blog" className="text-sm font-semibold text-indigo-700 transition hover:text-indigo-900">
            ← Back to blog
          </Link>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <img src={post.featuredImage} alt={post.title} className="h-72 w-full object-cover" />
          <div className="p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">{post.category}</span>
              <span>{post.readingTime}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8"><BlogContentRenderer blocks={post.contentBlocks.length ? post.contentBlocks : [{ type: 'paragraph', text: post.content }]} /></div>

            <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Author</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">{post.author}</p>
              <p className="mt-2 text-slate-600">BlueChip Solution helps businesses turn operational complexity into reliable software and digital process improvements.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 p-8 lg:px-10">
            <span className="text-sm font-semibold text-slate-500">Share:</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-sm font-semibold">LinkedIn</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-sm font-semibold">X / Twitter</a>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">Related articles</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
        <section className="mt-12 rounded-[2rem] bg-indigo-600 p-8 text-white lg:p-10"><h2 className="text-3xl font-bold">Turn the next idea into an operational advantage.</h2><p className="mt-3 max-w-2xl text-indigo-100">Tell us what you are trying to improve and we will help you find a practical path forward.</p><Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-slate-900">Book a consultation</Link></section>
      </main>

      <Footer />
    </>
  )
}
