import React from 'react';

const SmartSensors = ({ onStart }) => {
  return (
    <div className="relative z-10 py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Smart Technology
          </span>
          <h3 className="text-5xl md:text-7xl font-black font-outfit tracking-tight text-slate-950 mb-8">
            Environmental sensors that <span className="text-indigo-600">protect you</span>
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Our IoT-enabled sensors continuously monitor your environment for asthma triggers including air quality, pollen, dust, temperature, and humidity levels.
          </p>
          <button onClick={onStart} className="px-12 py-6 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
            View Dashboard
          </button>
        </div>
        <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-wind text-green-600"></i>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Air Quality</p>
                <p className="text-2xl font-black text-slate-900">Good</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-tint text-blue-600"></i>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Humidity</p>
                <p className="text-2xl font-black text-slate-900">45%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <i className="fas fa-thermometer-half text-orange-600"></i>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Temperature</p>
                <p className="text-2xl font-black text-slate-900">22°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSensors;
