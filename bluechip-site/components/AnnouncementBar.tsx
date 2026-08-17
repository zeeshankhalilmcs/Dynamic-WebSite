import { useEffect, useState } from 'react'

const defaultItems = [
  'POS',
  'Billing QR',
  'Display Digital',
  'WhatsApp Catalogue Support',
  'Receipts Delivery',
  'Staff Tracking',
  'Management Revenue',
  'Inventory Reports',
  'Control Multi-branch',
  'Customer & History Management',
]

type AnnouncementBarConfig = {
  enabled?: boolean
  items?: string[]
}

export default function AnnouncementBar() {
  const [config, setConfig] = useState<AnnouncementBarConfig>({
    enabled: true,
    items: defaultItems,
  })

  useEffect(() => {
    let isMounted = true

    const loadConfig = async () => {
      try {
        const response = await fetch('/api/settings')
        if (!response.ok) {
          throw new Error('Unable to load announcement settings')
        }

        const data = await response.json()
        const nextItems = Array.isArray(data?.announcementBar?.items)
          ? data.announcementBar.items.filter((item: string) => item && item.trim())
          : defaultItems

        if (isMounted) {
          setConfig({
            enabled: data?.announcementBar?.enabled !== false,
            items: nextItems.length > 0 ? nextItems : defaultItems,
          })
        }
      } catch {
        if (isMounted) {
          setConfig({ enabled: true, items: defaultItems })
        }
      }
    }

    loadConfig()

    return () => {
      isMounted = false
    }
  }, [])

  if (!config.enabled || !config.items?.length) {
    return null
  }

  const marqueeItems = [...(config.items || []), ...(config.items || [])]

  return (
    <div className="border-y border-slate-200 bg-slate-900 text-white">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max min-w-max items-center gap-8 py-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100 sm:py-3 sm:text-sm lg:text-base">
          {marqueeItems.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-4 sm:gap-8">
              <span>{item}</span>
              <span className="text-indigo-300">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
