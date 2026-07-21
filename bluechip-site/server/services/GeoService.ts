import geoip from 'geoip-lite'

export type GeoLocation = {
  country: string | null
  region: string | null
  city: string | null
}

export function getGeoLocation(ip?: string | null): GeoLocation | null {
  if (!ip || ip === 'unknown') {
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
