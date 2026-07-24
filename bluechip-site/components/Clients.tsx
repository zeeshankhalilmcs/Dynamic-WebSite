import { useState } from 'react'

const clients = [
  { name: 'Amreli Steel', image: 'amreli-steel.jpg' },
  { name: 'Appollo Seed', image: 'appollo-seed.png' },
  { name: 'Cake n Cookies', image: 'cake-n-cookies.jpg' },
  { name: 'Fayaz Oil & Ghee', image: 'fayaz-oil-ghee.jpg' },
  { name: 'FFC Meer Put Mathelo', image: 'ffc-meer-put-mathelo.jpg' },
  { name: 'Millat Thresher', image: 'millat-thresher.png' },
  { name: 'Shahbaz Oil & Ghee', image: 'shahbaz-oil-ghee.jpeg' },
  { name: 'Canal Country Club', image: 'canal-country-club.jpg' },
  { name: 'MCC Cash & Carry', image: 'mcc-cash-carry.jpg' },
  { name: 'Mirwise Zarai', image: 'mirwise-zarai.png' },
]

function ClientLogo({ name, slug, image }: { name: string; slug: string; image?: string }) {
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const candidates = image
    ? [`/images/clients/${image}`, `/images/clients/${slug}.svg`, `/images/clients/${slug}.png`, `/images/clients/${slug}.jpg`, `/images/clients/${slug}.jpeg`, `/images/clients/${slug}.webp`]
    : [`/images/clients/${slug}.svg`, `/images/clients/${slug}.png`, `/images/clients/${slug}.jpg`, `/images/clients/${slug}.jpeg`, `/images/clients/${slug}.webp`]
  const src = candidates[attempt]
  if (failed) {
    // visual fallback: show an initial in a circle (so the card still has a logo-like element)
    return (
      <div className="mx-auto h-20 w-full max-w-[140px] flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold">
          {name.charAt(0)}
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      className="mx-auto h-20 w-full max-w-[140px] object-contain"
      onError={() => {
        if (attempt < candidates.length - 1) {
          setAttempt((current) => current + 1)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

export default function Clients() {
  return (
    <section className="mt-8">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">View Our Clients</h2>
          <div className="mx-auto mt-4 h-0.5 w-48 bg-slate-200" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => {
            const slug = client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

            return (
              <a
                key={client.name}
                href={`https://www.google.com/search?q=${encodeURIComponent(client.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-full text-center">
                  <ClientLogo name={client.name} slug={slug} image={(client as any).image} />
                  <div className="mt-3 text-sm font-semibold text-slate-700">{client.name}</div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
