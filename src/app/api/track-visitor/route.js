import { extractPublicIp, lookupIpGeo, reverseGeocode } from '../../../lib/ipGeoLookup';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_VISITOR_TRACKING_WEBHOOK_URL || '';

const getIndianTime = () => {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const d   = String(ist.getUTCDate()).padStart(2, '0');
  const m   = String(ist.getUTCMonth() + 1).padStart(2, '0');
  const y   = ist.getUTCFullYear();
  let h     = ist.getUTCHours();
  const min = String(ist.getUTCMinutes()).padStart(2, '0');
  const sec = String(ist.getUTCSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${d}/${m}/${y}, ${String(h).padStart(2, '0')}:${min}:${sec} ${ampm} (IST)`;
};

export async function POST(req) {
  try {
    if (!WEBHOOK_URL) return Response.json({ skipped: true });

    const { ip: bodyIp, lat, lon, pageUrl, referrer, userAgent } = await req.json();
    const ip = extractPublicIp(req, bodyIp);
    const ipGeo = await lookupIpGeo(ip);
    const gpsGeo = await reverseGeocode(lat, lon);

    const geo = {
      ip: ipGeo.ip || ip || 'Unknown',
      city: gpsGeo?.city || ipGeo.city,
      region: gpsGeo?.region || ipGeo.region,
      country: gpsGeo?.country || ipGeo.country,
      pincode: gpsGeo?.pincode || ipGeo.pincode,
      source: gpsGeo?.pincode ? gpsGeo.source : ipGeo.source,
    };

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: getIndianTime(),
        ip: geo.ip,
        city: geo.city,
        region: geo.region,
        country: geo.country,
        pincode: geo.pincode,
        pageUrl,
        referrer: referrer || 'Direct',
        userAgent,
      }),
    });

    return Response.json({ success: true, geo });
  } catch (err) {
    console.error('track-visitor error:', err);
    return Response.json({ success: false });
  }
}
