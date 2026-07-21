import React from 'react'

const clients = [
  { name: 'Taunsa Shopping Mall', site: 'https://www.google.com/search?q=Taunsa+Shopping+Mall+official+website' },
  { name: 'Indus Mart', site: 'https://www.google.com/search?q=Indus+Mart+official+website' },
  { name: 'Bismillah Super Store', site: 'https://www.google.com/search?q=Bismillah+Super+Store+official+website' },
  { name: 'AL-ARABIA Super Store', site: 'https://www.google.com/search?q=AL-ARABIA+Super+Store+official+website' },
  { name: 'Khan Super Store', site: 'https://www.google.com/search?q=Khan+Super+Store+official+website' },
  { name: 'MCC Cash & Carry', site: 'https://www.google.com/search?q=MCC+Cash+%26+Carry+official+website' },
  { name: 'Medicine Bank Pharmacy', site: 'https://www.google.com/search?q=Medicine+Bank+Pharmacy+official+website' },
  { name: 'Saverz Supermarket', site: 'https://www.google.com/search?q=Saverz+Supermarket+official+website' },
  { name: 'Al-Rafay Hyper Mart', site: 'https://www.google.com/search?q=Al-Rafay+Hyper+Mart+official+website' },
  { name: 'Orthopaedic & Trauma Centre', site: 'https://www.google.com/search?q=Orthopaedic+%26+Trauma+Centre+official+website' },
  { name: 'Taj Gasoline', site: 'https://www.google.com/search?q=Taj+Gasoline+official+website' },
  { name: 'A-1 Store', site: 'https://www.google.com/search?q=A-1+Store+official+website' },
]

export default function Clients(){
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
            const logoPath = `/images/clients/${slug}.png`

            return (
              <a
                key={client.name}
                href={client.site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-36 items-center justify-center rounded-lg border-2 border-orange-400 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-center">
                  <img
                    src={logoPath}
                    alt={client.name}
                    className="mx-auto mb-2 h-12 w-auto object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  <div className="text-sm font-semibold text-slate-700 max-w-[120px] truncate mx-auto">{client.name}</div>
                </div>
              </a>
            )
          })}
        </div>

      </div>
    </section>
  )
}
