import { extractPublicIp, lookupIpGeo, reverseGeocode } from '../../../lib/ipGeoLookup';

export async function POST(req) {
  try {
    const { ip: bodyIp, lat, lon } = await req.json();
    const ip = extractPublicIp(req, bodyIp);
    const ipGeo = await lookupIpGeo(ip);
    const gpsGeo = await reverseGeocode(lat, lon);

    const geo = {
      ip: ipGeo.ip || ip || 'Unknown',
      city: gpsGeo?.city || ipGeo.city,
      region: gpsGeo?.region || ipGeo.region,
      country: gpsGeo?.country || ipGeo.country,
      pincode: gpsGeo?.pincode || ipGeo.pincode,
    };

    return Response.json({ success: true, geo });
  } catch (err) {
    console.error('geo-lookup error:', err);
    return Response.json({ success: false }, { status: 500 });
  }
}
