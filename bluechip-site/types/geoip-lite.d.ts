declare module 'geoip-lite' {
  export interface GeoLookup {
    country?: string
    region?: string
    city?: string
  }

  export function lookup(ip: string): GeoLookup | null

  const geoip: {
    lookup(ip: string): GeoLookup | null
  }

  export default geoip
}
