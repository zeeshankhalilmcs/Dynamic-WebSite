import Link from 'next/link'

type BookConsultationCardProps = {
  eyebrow?: string
  title?: string
  buttonText?: string
  href?: string
}

export default function BookConsultationCard({
  eyebrow = 'Ready to build something better?',
  title = 'Let’s turn your operational goals into a reliable digital system.',
  buttonText = 'Book a consultation',
  href = '/contact',
}: BookConsultationCardProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-sm lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100">{eyebrow}</p>
          <h3 className="mt-3 text-3xl font-semibold">{title}</h3>
        </div>
        <Link href={href} className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
