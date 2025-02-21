import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Collection and Use</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information that you provide directly to us when using our services. This may include:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>Information you provide when interacting with our AI chatbot</li>
                <li>Usage data and interaction patterns</li>
                <li>Technical information about your device and internet connection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Data Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to request the deletion of your personal data from our systems. To exercise this right:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 font-medium mb-2">Data Deletion Requests</p>
                <p className="text-gray-600">
                  Send your request to:{' '}
                  <a href="mailto:datadeletion@gemcityai.com" className="text-blue-600 hover:text-blue-800 font-medium">
                    datadeletion@gemcityai.com
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please include your device information and approximate dates of usage to help us locate and remove your data.
                  We will process your request within 30 days and notify you once completed.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service integrates with various third-party services including:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>OpenAI for AI chat functionality</li>
                <li>Facebook Graph API for events information</li>
                <li>Google AdSense for advertisement delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@gemcityai.com" className="text-blue-600 hover:text-blue-800">
                  privacy@gemcityai.com
                </a>
              </p>
            </section>

            <section className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}