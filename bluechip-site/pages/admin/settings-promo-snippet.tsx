// helper snippet for PromoDraft and page options
export type PromoDraft = {
  enabled?: boolean
  title?: string
  subtitle?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  imagePath?: string
  displayPages?: string[]
  forceShowOnHomepage?: boolean
  persistHours?: number
  dismissDays?: number
}

export const pageOptions = ['homepage', 'pos', 'reviews', 'why', 'blog', 'blog-detail'] as const

export function isPageOption(value: string): value is (typeof pageOptions)[number] {
  return pageOptions.includes(value as any)
}
