const GEO_CACHE_KEY = Symbol.for('jmvisa.ipGeo.cache');
if (!globalThis[GEO_CACHE_KEY]) {
  globalThis[GEO_CACHE_KEY] = new Map();
}
const geoCache = globalThis[GEO_CACHE_KEY];
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const IPV4_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/;

const isPublicIpv4 = (ip) => {
  if (!ip || !IPV4_RE.test(ip)) return false;
  const [a, b] = ip.split('.').map(Number);
  if (a === 10 || a === 127 || a === 0) return false;
  if (a === 192 && b === 168) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 169 && b === 254) return false;
  return true;
};

const fetchJson = async (url, timeoutMs = 5000, headers = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
      headers,
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const GPS_CACHE_KEY = Symbol.for('jmvisa.gpsGeo.cache');
if (!globalThis[GPS_CACHE_KEY]) {
  globalThis[GPS_CACHE_KEY] = new Map();
}
const gpsCache = globalThis[GPS_CACHE_KEY];

const roundCoord = (value) => Number(value).toFixed(4);

export const reverseGeocode = async (lat, lon) => {
  if (lat == null || lon == null || Number.isNaN(Number(lat)) || Number.isNaN(Number(lon))) {
    return null;
  }

  const cacheKey = `${roundCoord(lat)},${roundCoord(lon)}`;
  const cached = gpsCache.get(cacheKey);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.geo;
  }

  const data = await fetchJson(
    `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json&addressdetails=1&zoom=18`,
    6000,
    {
      'User-Agent': 'JMVisaServices/1.0 (info@jmvisaservices.com)',
      'Accept-Language': 'en',
    }
  );

  const address = data?.address;
  if (!address) return null;

  const geo = {
    city: address.city || address.town || address.suburb || address.village || address.county || 'Unknown',
    region: address.state || 'Unknown',
    country: address.country || 'Unknown',
    pincode: address.postcode || 'Unknown',
    source: 'gps-nominatim',
  };

  gpsCache.set(cacheKey, { geo, cachedAt: Date.now() });
  return geo;
};

const lookupIpApi = async (ip) => {
  const data = await fetchJson(
    `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,query,city,regionName,zip,country,isp,lat,lon`
  );
  if (!data || data.status !== 'success') return null;
  return {
    ip: data.query || ip,
    city: data.city || 'Unknown',
    region: data.regionName || 'Unknown',
    country: data.country || 'Unknown',
    pincode: data.zip || 'Unknown',
    isp: data.isp || '',
    source: 'ip-api.com',
  };
};

const lookupIpWho = async (ip) => {
  const data = await fetchJson(`https://ipwho.is/${encodeURIComponent(ip)}`);
  if (!data || data.success === false) return null;
  return {
    ip: data.ip || ip,
    city: data.city || 'Unknown',
    region: data.region || 'Unknown',
    country: data.country || 'Unknown',
    pincode: data.postal || 'Unknown',
    isp: data.connection?.isp || '',
    source: 'ipwho.is',
  };
};

export const extractPublicIp = (req, bodyIp = '') => {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const realIp = req.headers.get('x-real-ip')?.trim() || '';
  const candidates = [bodyIp, forwarded, realIp];
  return candidates.find(isPublicIpv4) || '';
};

export const lookupIpGeo = async (ip) => {
  if (!isPublicIpv4(ip)) {
    return {
      ip: ip || 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      pincode: 'Unknown',
      isp: '',
      source: 'skipped',
    };
  }

  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.geo;
  }

  const geo = (await lookupIpApi(ip)) || (await lookupIpWho(ip));
  const resolved = geo || {
    ip,
    city: 'Unknown',
    region: 'Unknown',
    country: 'Unknown',
    pincode: 'Unknown',
    isp: '',
    source: 'none',
  };

  geoCache.set(ip, { geo: resolved, cachedAt: Date.now() });
  return resolved;
};
