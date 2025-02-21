import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import AdSenseHelmet from '../components/AdSenseHelmet';
import SEOHelmet from '../components/SEOHelmet';

const tips = [
  {
    category: "Transportation",
    tips: [
      {
        text: "RTA buses provide convenient public transportation throughout the city",
        link: "http://www.i-riderta.org/",
        linkText: "View RTA routes and schedules"
      },
      {
        text: "The Dayton International Airport is just 15 minutes from downtown",
        link: "https://www.flydayton.com/",
        linkText: "Visit Dayton International Airport"
      },
      {
        text: "Bike trails connect many parts of the city through the Nation's Largest Paved Trail Network",
        link: "https://www.metroparks.org/things-to-do/cycling/",
        linkText: "Explore Miami Valley Bike Trails"
      }
    ]
  },
  {
    category: "Food & Dining",
    tips: [
      {
        text: "Try the famous 'Dayton-style' square-cut pizza at Marion's Piazza",
        link: "https://www.marionspiazza.com/",
        linkText: "Visit Marion's Piazza"
      },
      {
        text: "Visit 2nd Street Market for local produce and prepared foods",
        link: "https://www.metroparks.org/places-to-go/2nd-street-market/",
        linkText: "Learn about 2nd Street Market"
      },
      {
        text: "The Oregon District offers the best nightlife and dining options",
        link: "https://www.theoregondistrict.org/",
        linkText: "Explore the Oregon District"
      }
    ]
  },
  {
    category: "Local Culture",
    tips: [
      {
        text: "First Fridays feature art galleries and special events downtown",
        link: "https://www.downtowndayton.org/things-to-do/first-friday/",
        linkText: "Check out First Friday events"
      },
      {
        text: "The Dragon's baseball games are a summer tradition",
        link: "https://www.milb.com/dayton",
        linkText: "Get Dragons tickets"
      },
      {
        text: "Visit in summer for numerous festivals celebrating local heritage",
        link: "https://www.daytonlocal.com/festivals.asp",
        linkText: "View festival calendar"
      }
    ]
  }
];

export default function Tips() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tips.flatMap(section => 
      section.tips.map(tip => ({
        "@type": "Question",
        "name": `${section.category} Tip`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": tip.text
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEOHelmet 
        title="Local Tips & Insider Guide to Dayton, Ohio - GemCity AI"
        description="Get insider tips about Dayton's transportation, dining, culture, and entertainment. Local knowledge about the best pizza, nightlife, and hidden gems in the Gem City."
        path="/tips"
      />
      <AdSenseHelmet />
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <MessageCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Local Tips</h1>
        </div>

        {/* Top Ad Unit with specific slot ID */}
        <div className="mb-8">
          <AdUnit slot="1111829742" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
                <ul className="space-y-4">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-600">
                      <div className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <div>
                          <p>{tip.text}</p>
                          <a
                            href={tip.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-1 font-medium"
                          >
                            {tip.linkText}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ad Unit with specific slot ID */}
        <div className="mt-8">
          <AdUnit slot="3045263488" />
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </div>
  );
}