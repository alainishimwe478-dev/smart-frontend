import React from 'react';

const About = ({ onStart }) => {
  return (
    <div className="relative z-10 py-32 px-8 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          About Us
        </span>
        <h3 className="text-5xl md:text-7xl font-black font-outfit tracking-tight text-slate-950 mb-8">
          Built for <span className="text-indigo-600">better breathing</span>
        </h3>
        <p className="text-lg text-slate-500 leading-relaxed mb-12 max-w-3xl mx-auto">
          AsthmaShield is Rwanda's national asthma management network, created by healthcare professionals, data scientists, and engineers. Our mission is to empower patients across Rwanda with technology that predicts and prevents asthma attacks before they happen.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div>
            <p className="text-5xl font-black text-indigo-600 mb-2">10K+</p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Active Users</p>
          </div>
          <div>
            <p className="text-5xl font-black text-indigo-600 mb-2">95%</p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Prediction Accuracy</p>
          </div>
          <div>
            <p className="text-5xl font-black text-indigo-600 mb-2">24/7</p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Monitoring</p>
          </div>
        </div>
        <button onClick={onStart} className="px-12 py-6 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-950 transition-all">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default About;
