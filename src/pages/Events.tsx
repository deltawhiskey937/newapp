import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import AdSenseHelmet from '../components/AdSenseHelmet';
import SEOHelmet from '../components/SEOHelmet';

const events = [
  {
    title: "Dayton Air Show",
    location: "Dayton International Airport",
    description: "Experience the thrill of aviation at the premier air show featuring military and civilian aircraft demonstrations, including the U.S. Air Force Thunderbirds and U.S. Navy Blue Angels. Enjoy ground displays, interactive exhibits, and family entertainment.",
    link: "https://daytonairshow.com/"
  },
  {
    title: "Celtic Festival",
    location: "RiverScape MetroPark",
    description: "Celebrate Celtic heritage with traditional music, dance performances, authentic food, and cultural exhibitions. Features multiple stages of entertainment, Celtic sports demonstrations, and a marketplace with authentic Celtic merchandise.",
    link: "https://www.unitedirishofdayton.org/"
  },
  {
    title: "Germanfest Picnic",
    location: "Carillon Historical Park",
    description: "Experience German culture with authentic food, live music, traditional dance, and family-friendly activities. Enjoy German beer, traditional cuisine, and cultural performances in a historic setting.",
    link: "https://www.daytongermanclub.org/"
  },
  {
    title: "Hispanic Heritage Festival",
    location: "RiverScape MetroPark",
    description: "Celebrate Hispanic culture with live music, dance performances, authentic cuisine, and family activities. Experience the vibrant traditions of Dayton's Hispanic community through art, food, and entertainment.",
    link: "https://www.daytonohio.gov/calendar"
  },
  {
    title: "Oktoberfest at the Dayton Art Institute",
    location: "Dayton Art Institute",
    description: "One of the longest-running Oktoberfest celebrations in the region, featuring German food, beer, wine, art, music, and family activities. Enjoy traditional games, artisan vendors, and live entertainment.",
    link: "https://www.daytonartinstitute.org/oktoberfest"
  },
  {
    title: "Winter Festival at Carillon Park",
    location: "Carillon Historical Park",
    description: "Experience the magic of the holiday season with historic displays, festive lights, live music, and seasonal treats. Visit with Santa, enjoy holiday crafts, and explore the winter wonderland at this historic venue.",
    link: "https://www.daytonhistory.org/"
  }
];

export default function Events() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": events.map((event, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": event.title,
      "description": event.description,
      "location": {
        "@type": "Place",
        "name": event.location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dayton",
          "addressRegion": "OH"
        }
      },
      "url": event.link
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEOHelmet 
        title="Events in Dayton, Ohio - Festivals, Shows & More - GemCity AI"
        description="Find the best events in Dayton including the Air Show, Celtic Festival, Germanfest, and more. Stay updated with local festivals, shows, and cultural celebrations."
        path="/events"
      />
      <AdSenseHelmet />
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Calendar size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Events in Dayton</h1>
        </div>

        {/* Top Ad Unit */}
        <div className="mb-8">
          <AdUnit slot="1818406755" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ad Unit */}
        <div className="mt-8">
          <AdUnit slot="5093714466" />
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
}