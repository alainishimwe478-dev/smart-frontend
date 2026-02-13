import React, { useState } from 'react';

const RwandaMap = ({ activeProvince, onSelect }) => {
  const provinces = [
    { id: 'Kigali', d: 'M100 80 L180 80 L180 140 L100 140 Z', color: '#6366f1', risk: 'Moderate' },
    { id: 'North', d: 'M50 20 L250 20 L200 80 L100 80 Z', color: '#10b981', risk: 'Low' },
    { id: 'South', d: 'M50 140 L150 140 L120 280 L20 280 Z', color: '#f43f5e', risk: 'Critical' },
    { id: 'East', d: 'M180 80 L300 100 L280 250 L150 140 Z', color: '#f59e0b', risk: 'High' },
    { id: 'West', d: 'M10 50 L100 80 L100 140 L50 140 L20 250 Z', color: '#f43f5e', risk: 'High' },
  ];

  return (
    <svg viewBox="0 0 320 300" className="w-full h-full">
      {provinces.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill={activeProvince === p.id ? p.color : '#e2e8f0'}
          stroke="#fff"
          strokeWidth="2"
          className="cursor-pointer transition-all hover:opacity-80"
          onClick={() => onSelect(p.id)}
        />
      ))}
    </svg>
  );
};

const MapForecast = () => {
  const [selectedProvince, setSelectedProvince] = useState('Kigali');

  const provinceInfo = {
    'Kigali': { temp: '24°C', humidity: '65%', aqi: 42, triggers: ['Dust', 'Vehicle Emissions'] },
    'North': { temp: '18°C', humidity: '78%', aqi: 25, triggers: ['Cold Air', 'Fog'] },
    'South': { temp: '22°C', humidity: '82%', aqi: 68, triggers: ['High Humidity', 'Wood Smoke'] },
    'East': { temp: '28°C', humidity: '55%', aqi: 55, triggers: ['Pollen', 'Heat'] },
    'West': { temp: '20°C', humidity: '88%', aqi: 48, triggers: ['Mountain Moisture', 'Pollen'] },
  };

  const info = provinceInfo[selectedProvince];

  return (
    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-5 gap-10 pb-20">
      <div className="lg:col-span-3 bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10">
           <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current View</span>
              <h3 className="text-4xl font-black text-indigo-600 font-outfit leading-none">{selectedProvince}</h3>
           </div>
        </div>
        
        <div className="w-full h-[500px] flex items-center justify-center">
          <RwandaMap activeProvince={selectedProvince} onSelect={setSelectedProvince} />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Humidity</p>
              <p className="text-2xl font-black text-slate-900">{info.humidity}</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">AQI Index</p>
              <p className="text-2xl font-black text-slate-900">{info.aqi}</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Temperature</p>
              <p className="text-2xl font-black text-slate-900">{info.temp}</p>
           </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl shadow-indigo-200">
          <h4 className="text-2xl font-black font-outfit mb-6">Localized Guidance</h4>
          <p className="text-indigo-100 mb-10 leading-relaxed font-medium">
            In {selectedProvince}, {info.triggers.join(' and ')} are the primary asthma triggers today. 
          </p>
          <div className="space-y-4">
             {info.triggers.map((t, i) => (
               <div key={i} className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <i className="fas fa-triangle-exclamation"></i>
                  </div>
                  <span className="font-bold text-sm">Limit Exposure: {t}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-xl font-black text-slate-900 font-outfit">Nearby Help</h4>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Find Hospital</button>
           </div>
           <div className="space-y-6">
              {[
                { name: 'District Hospital', dist: '1.2km', status: 'Ready' },
                { name: 'Community Clinic', dist: '0.4km', status: 'Active' },
                { name: 'Pharmacy K-Town', dist: '0.2km', status: 'Open' }
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <i className="fas fa-location-crosshairs"></i>
                     </div>
                     <div>
                        <p className="font-black text-slate-800 text-sm">{h.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{h.dist} away</p>
                     </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapForecast;
