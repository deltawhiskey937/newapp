import axios from 'axios';

interface FacebookEvent {
  id: string;
  name: string;
  description?: string;
  start_time: string;
  end_time?: string;
  place?: {
    name: string;
    location?: {
      city: string;
      state: string;
      street: string;
      zip: string;
    };
  };
  cover?: {
    source: string;
  };
}

export async function searchFacebookEvents(timeframe: string): Promise<FacebookEvent[]> {
  try {
    const now = new Date();
    let since = now.toISOString();
    let until: string;

    switch (timeframe) {
      case 'today':
        until = new Date(now.setHours(23, 59, 59, 999)).toISOString();
        break;
      case 'tomorrow':
        since = new Date(now.setDate(now.getDate() + 1)).toISOString();
        until = new Date(now.setHours(23, 59, 59, 999)).toISOString();
        break;
      case 'upcoming':
        until = new Date(now.setDate(now.getDate() + 7)).toISOString();
        break;
      case 'week':
      default:
        until = new Date(now.setDate(now.getDate() + 7)).toISOString();
    }

    // Get events from Facebook Graph API
    const response = await axios.get(`https://graph.facebook.com/v19.0/search`, {
      params: {
        q: 'Dayton',
        type: 'event',
        fields: 'id,name,description,start_time,end_time,place,cover',
        access_token: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN,
        center: '39.7589,-84.1916',
        distance: '20000', // 20km radius
        since: Math.floor(new Date(since).getTime() / 1000),
        until: Math.floor(new Date(until).getTime() / 1000)
      }
    });

    // Ensure we only return serializable data
    return response.data.data.map((event: FacebookEvent) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      place: event.place ? {
        name: event.place.name,
        location: event.place.location ? {
          city: event.place.location.city,
          state: event.place.location.state,
          street: event.place.location.street,
          zip: event.place.location.zip
        } : undefined
      } : undefined,
      cover: event.cover ? {
        source: event.cover.source
      } : undefined
    }));
  } catch (error) {
    console.error('Error fetching Facebook events:', error);
    return [];
  }
}