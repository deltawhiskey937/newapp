import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Building2, Landmark, MapPin, Calendar, MessageCircle } from 'lucide-react';
import Historical from './pages/Historical';
import Attractions from './pages/Attractions';
import Events from './pages/Events';
import Tips from './pages/Tips';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { ChatBot } from './components/ChatBot';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();

  const navigateAndScroll = (path: string, elementId: string) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="bg-gradient-to-r from-emerald-900 to-blue-900">
        <div className="text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Building2 size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold">GemCity AI</h1>
              </div>
              <p className="text-xl mb-8 leading-relaxed text-emerald-50">
                Your AI-powered guide to Dayton, Ohio - the Gem City. Discover history,
                attractions, events, and local insights with our intelligent assistant!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => navigateAndScroll('/historical', 'historical-section')}
                  className="group px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg backdrop-blur-sm hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-left shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                      <Landmark size={20} className="text-amber-50" />
                    </div>
                    <p className="text-sm font-medium text-amber-50">Historical Sites</p>
                  </div>
                  <p className="text-2xl font-bold">Explore</p>
                </button>
                <button
                  onClick={() => navigateAndScroll('/attractions', 'attractions-section')}
                  className="group px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg backdrop-blur-sm hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-left shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                      <MapPin size={20} className="text-emerald-50" />
                    </div>
                    <p className="text-sm font-medium text-emerald-50">Local Attractions</p>
                  </div>
                  <p className="text-2xl font-bold">Discover</p>
                </button>
                <button
                  onClick={() => navigateAndScroll('/events', 'events-section')}
                  className="group px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg backdrop-blur-sm hover:from-rose-600 hover:to-pink-700 transition-all duration-300 text-left shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                      <Calendar size={20} className="text-rose-50" />
                    </div>
                    <p className="text-sm font-medium text-rose-50">Events</p>
                  </div>
                  <p className="text-2xl font-bold">Experience</p>
                </button>
                <button
                  onClick={() => navigateAndScroll('/tips', 'tips-section')}
                  className="group px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg backdrop-blur-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-left shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                      <MessageCircle size={20} className="text-blue-50" />
                    </div>
                    <p className="text-sm font-medium text-blue-50">Local Tips</p>
                  </div>
                  <p className="text-2xl font-bold">Learn</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot positioned prominently below header */}
      <div className="container mx-auto px-4 -mt-8 mb-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ChatBot />
        </div>
      </div>

      <div className="container mx-auto px-4 flex-grow">
        <Routes>
          <Route path="/" element={<NewsSection />} />
          <Route path="/historical" element={<div id="historical-section"><Historical /></div>} />
          <Route path="/attractions" element={<div id="attractions-section"><Attractions /></div>} />
          <Route path="/events" element={<div id="events-section"><Events /></div>} />
          <Route path="/tips" element={<div id="tips-section"><Tips /></div>} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;