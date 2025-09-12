"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbJsonLd } from "next-seo";

function toTitleCase(segment) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbJsonLdDynamic({
  baseUrl = "https://www.jmvisaservices.com",
  rootName = "Home",
}) {
  const pathname = usePathname() || "/";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const segments = pathname
    .split("/")
    .filter(Boolean);

  const itemListElements = [
    {
      position: 1,
      name: rootName,
      item: baseUrl,
    },
  ];

  let cumulativePath = "";
  segments.forEach((segment, index) => {
    cumulativePath += `/${segment}`;
    itemListElements.push({
      position: index + 2,
      name: toTitleCase(segment),
      item: `${baseUrl}${cumulativePath}`,
    });
  });

  // Avoid rendering during prerender/build
  if (!isMounted) return null;

  return (
    <BreadcrumbJsonLd
      useAppDir
      itemListElements={itemListElements}
    />
  );
}


