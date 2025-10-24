"use client";

import { useEffect, useState } from "react";

export default function OrganizationSchema() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Avoid rendering during prerender/build
  if (!isMounted) return null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.jmvisaservices.com/#organization",
    "name": "JM Visa Services",
    "alternateName": "JM Visa",
    "description": "Professional visa and immigration services including study abroad, work visas, tourist visas, business visas, and comprehensive immigration guidance for your international journey.",
    "url": "https://www.jmvisaservices.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.jmvisaservices.com/logo/logo.png",
      "width": 300,
      "height": 100
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://www.jmvisaservices.com/images/jm-banner.jpg",
      "width": 1200,
      "height": 630
    },
    "telephone": ["+919321315524", "+918591070718"],
    "email": "info@jmvisaservices.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office Address - JM Visa Services",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 0.0, // Replace with actual coordinates
      "longitude": 0.0
    },
    "openingHours": [
      "Mo-Fr 10:00-20:00",
      "Sa 10:00-17:00", 
      "Su by appointment"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR, USD, EUR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer, Online Payment",
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country", 
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "Canada"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Australia"
      },
      {
        "@type": "Country",
        "name": "New Zealand"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Visa Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Study Abroad Visa Services",
            "description": "Complete assistance for student visa applications and overseas education guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Work Visa Services",
            "description": "Professional work visa consultation and application assistance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tourist Visa Services",
            "description": "Tourist and visitor visa processing for multiple countries"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Visa Services",
            "description": "Business visa consultation and application support"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Immigration Consultation",
            "description": "Expert immigration advice and documentation assistance"
          }
        }
      ]
    },
    "sameAs": [
        "https://www.instagram.com/jmvisaservices",
        "https://www.facebook.com/p/JM-Visa-Services", 
        "https://www.linkedin.com/company/jmvisa-services/"
      ],
    "founder": {
      "@type": "Person",
      "name": "Founder Name" // Replace with actual founder name
    },
    "foundingDate": "2020", // Replace with actual founding date
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "knowsAbout": [
      "Visa Processing",
      "Immigration Law",
      "Study Abroad",
      "Work Permits",
      "Tourist Visas",
      "Business Visas",
      "Document Verification",
      "Embassy Procedures"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sample Customer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent visa services with professional guidance throughout the process."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}