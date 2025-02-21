import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex items-start space-x-2 ${isBot ? 'bg-blue-50/50' : ''} p-2 rounded-lg text-sm`}>
      <div className={`p-1.5 rounded-lg ${isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
        {isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-xs font-medium text-gray-500">
          {isBot ? 'Dayton AI' : 'You'}
        </p>
        <p className="text-gray-800 leading-relaxed text-sm">{message.content}</p>
      </div>
    </div>
  );
};