import { useState, useEffect } from 'react';
import { getPublicIp } from '../lib/browserLocation';

const useGeoLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchGeo = async () => {
            try {
                const ip = await getPublicIp();
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
