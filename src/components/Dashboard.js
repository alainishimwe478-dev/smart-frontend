import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:00', humidity: 82, pollen: 45, aqi: 30 },
  { time: '09:00', humidity: 75, pollen: 88, aqi: 45 },
  { time: '12:00', humidity: 60, pollen: 72, aqi: 52 },
  { time: '15:00', humidity: 55, pollen: 40, aqi: 58 },
  { time: '18:00', humidity: 65, pollen: 25, aqi: 38 },
  { time: '21:00', humidity: 78, pollen: 15, aqi: 28 },
];

const StatCard = ({ title, value, trend, color, icon }) => (
  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-6">
      <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-xl`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
        {trend} vs Yesterday
      </span>
    </div>
    <h4 className="text-3xl font-black text-slate-900 mb-1">{value}</h4>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{title}</p>
  </div>
);

const Dashboard = () => {
  const [activeMetric, setActiveMetric] = useState('humidity');

  const metricConfig = {
    humidity: {
      color: '#4f46e5',
      gradientId: 'colorHum',
      label: 'Humidity %'
    },
    pollen: {
      color: '#f59e0b',
      gradientId: 'colorPol',
      label: 'Pollen Count'
    }
  };

  return (
    <div className="animate-fadeIn space-y-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Avg Humidity" value="68%" trend="-4%" color="blue" icon="fa-droplet" />
        <StatCard title="Pollen Count" value="High" trend="+12%" color="amber" icon="fa-wind" />
        <StatCard title="Air Quality" value="42" trend="-8%" color="emerald" icon="fa-mask-face" />
        <StatCard title="Inhaler Usage" value="1 Dose" trend="0%" color="indigo" icon="fa-pills" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">Environmental Trends</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Kigali • Last 24 Hours</p>
            </div>
            <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
               <button 
                 onClick={() => setActiveMetric('humidity')}
                 className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeMetric === 'humidity' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 Humidity
               </button>
               <button 
                 onClick={() => setActiveMetric('pollen')}
                 className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeMetric === 'pollen' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 Pollen
               </button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} 
                />
                <Tooltip 
                   cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                   contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                   itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeMetric} 
                  stroke={metricConfig[activeMetric].color} 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill={`url(#${metricConfig[activeMetric].gradientId})`} 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 font-outfit tracking-tight mb-2">Regional Risk</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Top Trigger Localities</p>
          </div>
          
          <div className="space-y-8 flex-1">
            {[
              { loc: 'Nyarugenge', risk: 85, color: '#f43f5e' },
              { loc: 'Kicukiro', risk: 62, color: '#f59e0b' },
              { loc: 'Gasabo', risk: 45, color: '#10b981' },
              { loc: 'Musanze', risk: 38, color: '#10b981' },
              { loc: 'Rubavu', risk: 78, color: '#f43f5e' }
            ].map((item, i) => (
              <div key={i} className="space-y-3 group cursor-default">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{item.loc}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: item.color }}>{item.risk}% RISK</span>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${item.risk}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 w-full py-5 bg-indigo-50 text-indigo-600 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-indigo-100/50 hover:shadow-xl">
            View Live Risk Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
