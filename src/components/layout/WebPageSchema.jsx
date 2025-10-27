"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function WebPageSchema({ title, description }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid rendering during prerender/build
  if (!isMounted) return null;

  const currentUrl = `https://www.jmvisaservices.com${pathname}`;
  
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${currentUrl}#webpage`,
    "url": currentUrl,
    "name": title || "JM Visa Services",
    "description": description || "Professional visa and immigration services for travel, education, and work across 40+ countries",
    "publisher": {
      "@id": "https://www.jmvisaservices.com/#organization"
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.jmvisaservices.com/#website",
      "url": "https://www.jmvisaservices.com",
      "name": "JM Visa Services",
      "description": "Professional visa and immigration services for travel, education, and work across 40+ countries",
      "publisher": {
        "@id": "https://www.jmvisaservices.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.jmvisaservices.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
  );
}