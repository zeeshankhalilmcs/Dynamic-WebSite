let geoip: { lookup: (ip: string) => { country?: string | null; region?: string | null; city?: string | null } | null } | null = null

try {
  geoip = require('geoip-lite')
} catch (error) {
  console.warn('GeoIP library unavailable in this environment:', error)
  geoip = null
}

export type GeoLocation = {
  country: string | null
  region: string | null
  city: string | null
}

export function getGeoLocation(ip?: string | null): GeoLocation | null {
  if (!ip || ip === 'unknown' || !geoip) {
    return null
  }

  try {
    const lookup = geoip.lookup(ip)
    if (!lookup) {
      return null
    }

    return {
      country: lookup.country ?? null,
      region: lookup.region ?? null,
      city: lookup.city ?? null,
    }
  } catch (error) {
    console.warn('Geo lookup failed', error)
    return null
  }
}
