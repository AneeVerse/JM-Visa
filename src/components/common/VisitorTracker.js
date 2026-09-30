"use client";

import { useEffect, useRef } from "react";
import { getPublicIp } from "../../lib/browserLocation";

export default function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const track = async () => {
      const ip = await getPublicIp();

      await fetch("/api/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip,
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
