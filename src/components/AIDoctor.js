import React from 'react';

const AIDoctor = ({ onStart }) => {
  return (
    <div className="relative z-10 py-32 px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-white rounded-3xl p-12 border border-slate-100">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8">
            <i className="fas fa-robot text-3xl text-white"></i>
          </div>
          <h4 className="text-3xl font-black font-outfit mb-6 text-slate-900">AI-Powered Assistant</h4>
          <p className="text-slate-500 leading-relaxed mb-6">
            Get instant answers to your asthma questions, personalized advice, and emergency guidance 24/7.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <i className="fas fa-check-circle text-indigo-600 mt-1"></i>
              <p className="text-slate-600">Symptom analysis and recommendations</p>
            </div>
            <div className="flex items-start gap-3">
              <i className="fas fa-check-circle text-indigo-600 mt-1"></i>
              <p className="text-slate-600">Medication reminders and tracking</p>
            </div>
            <div className="flex items-start gap-3">
              <i className="fas fa-check-circle text-indigo-600 mt-1"></i>
              <p className="text-slate-600">Emergency protocol guidance</p>
            </div>
          </div>
        </div>
        <div>
          <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            AI Healthcare
          </span>
          <h3 className="text-5xl md:text-7xl font-black font-outfit tracking-tight text-slate-950 mb-8">
            Your personal <span className="text-indigo-600">AI doctor</span>
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Connect with our AI-powered healthcare assistant for instant medical guidance, or schedule appointments with real doctors for comprehensive care.
          </p>
          <button onClick={onStart} className="px-12 py-6 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
            Talk to AI Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIDoctor;
