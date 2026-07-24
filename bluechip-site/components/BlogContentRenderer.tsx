import Link from 'next/link'
import type { BlogContentBlock } from '../server/services/BlogService'

export default function BlogContentRenderer({ blocks }: { blocks: BlogContentBlock[] }) {
  return <div className="space-y-7 text-lg leading-8 text-slate-700">
    {blocks.map((block, index) => {
      if (block.type === 'paragraph') return <p key={index}>{block.text}</p>
      if (block.type === 'h2') return <h2 key={index} className="pt-4 text-3xl font-bold text-slate-900">{block.text}</h2>
      if (block.type === 'h3') return <h3 key={index} className="pt-2 text-2xl font-semibold text-slate-900">{block.text}</h3>
      if (block.type === 'bullet-list' || block.type === 'numbered-list') {
        const List = block.type === 'bullet-list' ? 'ul' : 'ol'
        return <List key={index} className={block.type === 'bullet-list' ? 'list-disc space-y-2 pl-6' : 'list-decimal space-y-2 pl-6'}>{block.items.map((item) => <li key={item}>{item}</li>)}</List>
      }
      if (block.type === 'callout') return <aside key={index} className={`rounded-2xl border-l-4 p-5 ${block.tone === 'warning' ? 'border-amber-400 bg-amber-50' : block.tone === 'success' ? 'border-emerald-400 bg-emerald-50' : 'border-indigo-400 bg-indigo-50'}`}><strong className="block text-slate-900">{block.title}</strong><span>{block.text}</span></aside>
      if (block.type === 'faq') return <section key={index} className="space-y-4"><h2 className="text-3xl font-bold text-slate-900">Frequently asked questions</h2>{block.items.map((item) => <details key={item.question} className="rounded-2xl border border-slate-200 p-5"><summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary><p className="mt-3">{item.answer}</p></details>)}</section>
      if (block.type === 'cta') return <div key={index} className="rounded-2xl bg-slate-900 p-6 text-white"><p>{block.text}</p><Link href={block.href} className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">{block.label} →</Link></div>
      return null
    })}
  </div>
}
