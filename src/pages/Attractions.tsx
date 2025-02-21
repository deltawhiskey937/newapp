import React from 'react';
import { MapPin } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import AdSenseHelmet from '../components/AdSenseHelmet';
import SEOHelmet from '../components/SEOHelmet';

const attractions = [
  {
    name: "National Museum of the US Air Force",
    description: "The world's largest military aviation museum featuring over 350 aerospace vehicles.",
    address: "1100 Spaatz St, Dayton, OH 45433",
    website: "https://www.nationalmuseum.af.mil/"
  },
  {
    name: "Dayton Art Institute",
    description: "Fine art museum housed in an Italian Renaissance-style building.",
    address: "456 Belmonte Park N, Dayton, OH 45405",
    website: "https://www.daytonartinstitute.org/"
  },
  {
    name: "Boonshoft Museum of Discovery",
    description: "Science and discovery museum perfect for families and children.",
    address: "2600 Deweese Pkwy, Dayton, OH 45414",
    website: "https://www.boonshoftmuseum.org/"
  }
];

export default function Attractions() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": attractions.map((attraction, index) => ({
      "@type": "TouristAttraction",
      "position": index + 1,
      "name": attraction.name,
      "description": attraction.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": attraction.address.split(',')[0],
        "addressLocality": "Dayton",
        "addressRegion": "OH",
        "postalCode": attraction.address.match(/\d{5}/)?.[0]
      },
      "url": attraction.website
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEOHelmet 
        title="Top Attractions in Dayton, Ohio - GemCity AI"
        description="Explore Dayton's best attractions including the National Museum of the US Air Force, Dayton Art Institute, and Boonshoft Museum. Plan your visit to Gem City's top destinations."
        path="/attractions"
      />
      <AdSenseHelmet />
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <MapPin size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Attractions in Dayton</h1>
        </div>

        {/* Top Ad Unit with specific slot ID */}
        <div className="mb-8">
          <AdUnit slot="9610671836" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-gray-600 mb-4">{attraction.description}</p>
                <p className="text-sm text-gray-500 mb-4">{attraction.address}</p>
                <a
                  href={attraction.website}
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
          <AdUnit slot="9610671836" />
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
}