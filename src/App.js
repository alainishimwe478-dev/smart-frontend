import React, { useState } from 'react';
import { AppSection } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard.tsx';
import LiveAssistant from './components/LiveAssistant';
import ForecastSection from './components/ForecastSection';
import DoctorConnect from './components/DoctorConnect';

const App = () => {
  const [activeSection, setActiveSection] = useState(AppSection.Dashboard);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.Dashboard:
        return <Dashboard />;
      case AppSection.LiveAssistant:
        return <LiveAssistant />;
      case AppSection.Forecast:
        return <ForecastSection />;
      case AppSection.DoctorConnect:
        return <DoctorConnect />;
      case AppSection.About:
        return (
          <div className="max-w-3xl bg-white p-10 rounded-3xl shadow-sm border border-slate-100 animate-fadeIn">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">About Asthma & Climate</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-6">
                Asthma is a chronic respiratory condition that is significantly influenced by environmental triggers.
                Our system uses advanced AI and machine learning to correlate climate patterns, air quality data,
                and pollen indices to provide personalized risk assessments.
              </p>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Key Climate Triggers:</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="bg-rose-100 p-2 rounded-lg"><i className="fas fa-smog text-rose-600"></i></div>
                  <div>
                    <strong className="block text-slate-800">Particulate Matter (PM2.5/PM10)</strong>
                    <span className="text-sm text-slate-500">Fine particles that can penetrate deep into the lungs and cause inflammation.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg"><i className="fas fa-temperature-low text-blue-600"></i></div>
                  <div>
                    <strong className="block text-slate-800">Rapid Temperature Changes</strong>
                    <span className="text-sm text-slate-500">Sudden cold fronts can constrict airways, triggering symptoms.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg"><i className="fas fa-seedling text-green-600"></i></div>
                  <div>
                    <strong className="block text-slate-800">Seasonal Pollen</strong>
                    <span className="text-sm text-slate-500">Allergic triggers that increase during specific weather conditions like high winds.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
              <p className="text-sm text-blue-700 italic">
                Disclaimer: This application is for informational purposes only and does not constitute medical advice.
                Always follow your physician's prescribed asthma action plan.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <i className="fas fa-lungs text-blue-600 text-xl"></i>
          <span className="font-bold text-slate-800">Asthma Prediction</span>
        </div>
        <button className="text-slate-600">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      <main className="md:ml-64 p-4 md:p-8 pt-6">
        <div className="max-w-7xl mx-auto pb-12">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action for Assistant (Mobile) */}
      {activeSection !== AppSection.LiveAssistant && (
        <button
          onClick={() => setActiveSection(AppSection.LiveAssistant)}
          className="fixed bottom-6 right-6 md:right-10 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-110 z-30 md:hidden"
        >
          <i className="fas fa-microphone text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default App;
