import fs from 'fs'
import path from 'path'

let geoip: { lookup: (ip: string) => { country?: string | null; region?: string | null; city?: string | null } | null } | null = null

try {
  const candidateDirs = [
    path.join(process.cwd(), 'geoip-data'),
    path.join(process.cwd(), 'node_modules', 'geoip-lite', 'data'),
  ]

  const dataFile = candidateDirs
    .map((dir) => path.join(dir, 'geoip-country.dat'))
    .find((file) => fs.existsSync(file))

  if (dataFile) {
    process.env.GEODATADIR = path.dirname(dataFile)
    geoip = require('geoip-lite')
  }
} catch (error) {
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
