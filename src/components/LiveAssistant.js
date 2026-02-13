import React from 'react';

const LiveAssistant = () => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black text-slate-900 mb-8">AI Assistant</h2>
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
        <div className="text-center py-20">
          <i className="fas fa-microphone text-6xl text-indigo-600 mb-6"></i>
          <p className="text-slate-600 font-bold">Voice assistant coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
