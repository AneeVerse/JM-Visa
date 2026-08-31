import { useState, useEffect } from 'react';
import { getGpsCoords, getPublicIp } from '../lib/browserLocation';

const useGeoLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchGeo = async () => {
            try {
                const [ip, gps] = await Promise.all([getPublicIp(), getGpsCoords()]);

                if (gps?.lat && gps?.lon) {
                    const response = await fetch('/api/geo-lookup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ip, lat: gps.lat, lon: gps.lon }),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data?.geo) {
                            setLocation(data.geo);
                            return;
                        }
                    }
                }

                const response = await fetch('/api/geo-lookup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ip }),
                });
                if (!response.ok) return;
                const data = await response.json();
                if (data?.geo) setLocation(data.geo);
            } catch (err) {
                console.error("Geo fetch failed:", err);
            }
        };
        fetchGeo();
    }, []);

    return location;
};

export default useGeoLocation;
