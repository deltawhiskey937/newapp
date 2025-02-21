import React, { useState, useEffect } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { Message } from '../types';
import { MessageSquare, Sparkles } from 'lucide-react';
import { searchFacebookEvents } from '../services/facebook';
import axios from 'axios';

const systemPrompt = `You are GemCity OG, a highly knowledgeable AI assistant specializing in Dayton, Ohio. You have deep expertise in:

1. Local History
   - Wright Brothers and aviation history
   - Invention heritage
   - Industrial development
   - Native American history
   - Military history (Wright-Patterson AFB)

2. Culture & Entertainment
   - Arts and music scene
   - Festivals and events
   - Sports teams and venues
   - Theater and performing arts
   - Museums and galleries

3. Food & Dining
   - Local specialties (Dayton-style pizza)
   - Historic restaurants
   - Food trucks and markets
   - Craft breweries
   - Hidden gems

4. Practical Information
   - Transportation
   - Weather patterns
   - Local neighborhoods
   - Cost of living
   - Education institutions

Style Guide:
- Use a warm, friendly Midwestern tone
- Include specific details and local knowledge
- Share interesting facts and stories
- Provide actionable recommendations
- Use local terminology and nicknames`;

const DEEPSEEK_API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const isEventQuery = message.toLowerCase().includes('what') && 
        message.toLowerCase().includes('happening') &&
        (message.toLowerCase().includes('today') || 
         message.toLowerCase().includes('this week') || 
         message.toLowerCase().includes('this weekend') ||
         message.toLowerCase().includes('tomorrow'));

      let eventData = [];
      if (isEventQuery) {
        const timeframe = message.toLowerCase().includes('today') ? 'today' :
                         message.toLowerCase().includes('tomorrow') ? 'tomorrow' :
                         message.toLowerCase().includes('this weekend') ? 'upcoming' : 'week';
        
        eventData = await searchFacebookEvents(timeframe);
      }

      const userMessage: Message = { role: 'user', content: message };
      setMessages(prev => [...prev, userMessage]);

      const response = await axios.post(DEEPSEEK_API_ENDPOINT, {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { 
            role: "user", 
            content: isEventQuery ? 
              `${message}\n\nHere are some Facebook events in the area: ${JSON.stringify(eventData)}` : 
              message 
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response."
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      let errorMessage = "I apologize, but I'm having trouble connecting right now.";
      
      if (error?.response?.status === 401) {
        errorMessage = "Authentication failed. Please check the API key configuration.";
      } else if (error?.response?.status === 429) {
        errorMessage = "I've reached my rate limit. Please try again in a few moments.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-5 h-5" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">GemCity OG</h2>
            <p className="text-xs text-purple-100">Your Dayton Expert</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto p-3 space-y-3 bg-gray-50 max-h-[500px]">
        {messages.length === 0 && !error && (
          <div className="text-center text-gray-500 p-4">
            <p className="font-medium mb-2">Hey there, I'm GemCity OG! 👋</p>
            <p className="text-sm mb-3">Your local expert on all things Dayton. Ask me about:</p>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-50 p-2 rounded-lg text-purple-700 cursor-pointer hover:bg-purple-100 transition-colors">
                "What's happening this weekend?"
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-purple-700 cursor-pointer hover:bg-purple-100 transition-colors">
                "Tell me about the Wright Brothers"
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-purple-700 cursor-pointer hover:bg-purple-100 transition-colors">
                "Best pizza places in Dayton?"
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-400 text-sm">Thinking...</div>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-gray-200 bg-white">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export { ChatBot };