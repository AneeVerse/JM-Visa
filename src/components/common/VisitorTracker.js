"use client";

import { useEffect, useRef } from "react";
import { getGpsCoords, getPublicIp } from "../../lib/browserLocation";

export default function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const track = async () => {
      const [ip, gps] = await Promise.all([getPublicIp(), getGpsCoords()]);

      await fetch("/api/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip,
          lat: gps?.lat,
          lon: gps?.lon,
          pageUrl: window.location.href,
          referrer: document.referrer || "Direct",
          userAgent: navigator.userAgent,
        }),
      });
    };

    track().catch(() => {});
  }, []);

  return null;
}
