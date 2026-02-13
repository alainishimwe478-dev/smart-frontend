import React from 'react';
import { AppSection } from '../types';

const Home = ({ setActiveSection, userName, isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-6">Smart Asthma Management</h1>
        <p className="text-xl mb-12 opacity-90">AI-powered asthma care for Rwanda</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl">
            <i className="fas fa-map-location-dot text-4xl mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
            <p className="text-sm opacity-80">Track environmental triggers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl">
            <i className="fas fa-user-doctor text-4xl mb-4"></i>
            <h3 className="text-xl font-bold mb-2">Doctor Connect</h3>
            <p className="text-sm opacity-80">Instant medical support</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl">
            <i className="fas fa-microphone text-4xl mb-4"></i>
            <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
            <p className="text-sm opacity-80">Voice-guided care</p>
          </div>
        </div>
        
        <button
          onClick={() => setActiveSection(isAuthenticated ? AppSection.Dashboard : AppSection.Login)}
          className="px-12 py-5 bg-white text-indigo-600 font-black rounded-3xl hover:shadow-2xl transition-all"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default Home;
