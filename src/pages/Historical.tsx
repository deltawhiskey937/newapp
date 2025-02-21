import React from 'react';
import { Landmark } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import AdSenseHelmet from '../components/AdSenseHelmet';
import SEOHelmet from '../components/SEOHelmet';

const historicalSites = [
  {
    name: "Wright Brothers National Museum",
    description: "Explore the birthplace of aviation and see the original Wright Flyer.",
    address: "30 S Williams St, Dayton, OH 45402",
    website: "https://www.nps.gov/daav/"
  },
  {
    name: "Carillon Historical Park",
    description: "A 65-acre open-air history museum featuring historic buildings and exhibits.",
    address: "1000 Carillon Blvd, Dayton, OH 45409",
    website: "https://www.daytonhistory.org/"
  },
  {
    name: "Paul Laurence Dunbar House",
    description: "Historic home of the famous African American poet and writer.",
    address: "219 N Paul Laurence Dunbar St, Dayton, OH 45402",
    website: "https://www.ohiohistory.org/visit/museum-and-site-locator/paul-laurence-dunbar-house/"
  }
];

export default function Historical() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": historicalSites.map((site, index) => ({
      "@type": "LandmarksOrHistoricalBuildings",
      "position": index + 1,
      "name": site.name,
      "description": site.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": site.address.split(',')[0],
        "addressLocality": "Dayton",
        "addressRegion": "OH",
        "postalCode": site.address.match(/\d{5}/)?.[0]
      },
      "url": site.website
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEOHelmet 
        title="Historical Sites in Dayton, Ohio - GemCity AI"
        description="Discover Dayton's rich history at the Wright Brothers National Museum, Carillon Historical Park, and Paul Laurence Dunbar House. Explore the birthplace of aviation and more."
        path="/historical"
      />
      <AdSenseHelmet />
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Landmark size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Historical Sites in Dayton</h1>
        </div>

        {/* Top Ad Unit with specific slot ID */}
        <div className="mb-8">
          <AdUnit slot="7367651879" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historicalSites.map((site, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{site.name}</h3>
                <p className="text-gray-600 mb-4">{site.description}</p>
                <p className="text-sm text-gray-500 mb-4">{site.address}</p>
                <a
                  href={site.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ad Unit with specific slot ID */}
        <div className="mt-8">
          <AdUnit slot="7683346644" />
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
}