import React from 'react';

const Features = ({ onStart }) => {
  return (
    <div className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          Core Features
        </span>
        <h3 className="text-5xl md:text-7xl font-black font-outfit tracking-tight text-slate-950 mb-6">
          Everything you need to <br />
          <span className="text-indigo-600">manage asthma</span>
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-12 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
            <i className="fas fa-chart-line text-2xl text-indigo-600"></i>
          </div>
          <h4 className="text-2xl font-black font-outfit mb-4 text-slate-900">Real-Time Monitoring</h4>
          <p className="text-slate-500 leading-relaxed">Track air quality, temperature, humidity, and allergen levels in real-time with our smart sensors.</p>
        </div>

        <div className="bg-white p-12 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
            <i className="fas fa-brain text-2xl text-indigo-600"></i>
          </div>
          <h4 className="text-2xl font-black font-outfit mb-4 text-slate-900">AI Predictions</h4>
          <p className="text-slate-500 leading-relaxed">Advanced machine learning predicts asthma triggers before they happen, keeping you one step ahead.</p>
        </div>

        <div className="bg-white p-12 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8">
            <i className="fas fa-user-md text-2xl text-indigo-600"></i>
          </div>
          <h4 className="text-2xl font-black font-outfit mb-4 text-slate-900">Doctor Connect</h4>
          <p className="text-slate-500 leading-relaxed">Instant access to healthcare professionals and personalized treatment recommendations.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
