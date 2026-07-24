import Link from 'next/link'
import type { BlogPost } from '../server/services/BlogService'

type BlogCardProps = {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={post.featuredImage} alt={post.title} className="h-48 w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">{post.category}</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900 transition group-hover:text-indigo-700">
          Read article →
        </Link>
      </div>
    </article>
  )
}
