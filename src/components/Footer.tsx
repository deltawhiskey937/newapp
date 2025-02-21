import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <span>© {new Date().getFullYear()} GemCity AI</span>
        </div>
      </div>
    </footer>
  );
}