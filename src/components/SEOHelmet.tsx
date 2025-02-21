import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

export default function SEOHelmet({ 
  title = "GemCity AI - Your Complete Resource for Dayton, Ohio",
  description = "Discover the best of Dayton, Ohio with GemCity AI. Find local attractions, events, restaurants, historical sites, and insider tips. Your AI-powered guide to the Gem City.",
  path = "",
  type = "website"
}: SEOProps) {
  const baseUrl = "https://gemcityai.com";
  const url = `${baseUrl}${path}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GemCity AI",
    "url": baseUrl,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GemCity AI" />
      <meta property="og:image" content={`${baseUrl}/images/carillon-tower.jpg`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/images/carillon-tower.jpg`} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="Dayton Ohio, things to do in Dayton, Dayton attractions, Dayton events, Dayton restaurants, Dayton history, Gem City" />
      <meta name="geo.region" content="US-OH" />
      <meta name="geo.placename" content="Dayton" />
      <meta name="geo.position" content="39.7589;-84.1916" />
      <meta name="ICBM" content="39.7589, -84.1916" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}