import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
}

const NEWS_SOURCES = [
  {
    name: 'WHIO',
    url: 'https://www.whio.com/arc/outboundfeeds/rss/category/news/?outputType=xml',
  },
  {
    name: 'Dayton 24/7 Now',
    url: 'https://dayton247now.com/feed/',
  }
];

async function fetchRSS(url: string): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/xml');
    
    return Array.from(doc.querySelectorAll('item')).map(item => {
      // Create a plain object with only the data we need
      const newsItem: NewsItem = {
        title: item.querySelector('title')?.textContent?.trim() || '',
        link: item.querySelector('link')?.textContent?.trim() || '',
        pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
        contentSnippet: item.querySelector('description')?.textContent
          ?.replace(/<[^>]*>/g, '')
          ?.replace(/\s+/g, ' ')
          ?.trim()
          ?.slice(0, 150) + '...',
        source: ''
      };
      
      // Only return items with required fields
      if (newsItem.title && newsItem.link && newsItem.pubDate) {
        return newsItem;
      }
      return null;
    }).filter((item): item is NewsItem => item !== null);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        const newsPromises = NEWS_SOURCES.map(async (source) => {
          try {
            const items = await fetchRSS(source.url);
            return items.map(item => ({
              ...item,
              source: source.name
            }));
          } catch (err) {
            console.error(`Error fetching from ${source.name}:`, err);
            return [];
          }
        });

        if (!mounted) return;

        const results = await Promise.all(newsPromises);
        
        const allNews = results.flat().filter(item => 
          item.title && item.link && item.pubDate
        );

        const sortedNews = allNews
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 9);

        if (mounted) {
          setNews(sortedNews);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Unable to load news at this time');
          console.error('News fetch error:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    const interval = setInterval(fetchNews, 15 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <p>{error || 'No news articles available at this time'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Newspaper className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Latest Dayton News</h2>
        </div>
        <div className="text-sm text-gray-500">
          Auto-updates every 15 minutes
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div 
            key={`${item.link}-${index}`}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 flex flex-col"
          >
            <div className="flex-1">
              <div className="text-sm text-blue-600 font-medium mb-2">
                {item.source}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                {item.title}
              </h3>
              {item.contentSnippet && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {item.contentSnippet}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-gray-500">
                {new Date(item.pubDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                Read More
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}