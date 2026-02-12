import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const data = [
  { time: '00:00', aqi: 15, humidity: 85 },
  { time: '04:00', aqi: 18, humidity: 90 },
  { time: '08:00', aqi: 35, humidity: 75 },
  { time: '12:00', aqi: 45, humidity: 60 },
  { time: '16:00', aqi: 40, humidity: 55 },
  { time: '20:00', aqi: 25, humidity: 70 },
  { time: '23:59', aqi: 18, humidity: 82 },
];

const provinceData = [
  { name: 'Kigali', val: 45 },
  { name: 'Northern', val: 12 },
  { name: 'Southern', val: 28 },
  { name: 'Eastern', val: 32 },
  { name: 'Western', val: 22 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget label="Real-time AQI" value="18" unit="Good" trend="down" color="emerald" icon="fa-wind" />
        <StatWidget label="PM2.5 Level" value="12" unit="μg/m³" trend="up" color="blue" icon="fa-smog" />
        <StatWidget label="Humidity" value="82" unit="%" trend="up" color="blue" icon="fa-droplet" />
        <StatWidget label="Pollen Index" value="Low" unit="Safe" trend="down" color="emerald" icon="fa-seedling" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-slate-800 font-outfit">24-Hour Trends</h3>
             <div className="flex gap-2">
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> AQI
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Humidity
                </span>
             </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAqi)" />
                <Area type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-8 font-outfit">Regional Comparison</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={provinceData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#475569'}} width={80} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px'}} />
                <Bar dataKey="val" radius={[0, 10, 10, 0]} barSize={20}>
                   {provinceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.val > 40 ? '#f43f5e' : entry.val > 25 ? '#fbbf24' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 space-y-2">
            <p className="text-xs text-slate-400 text-center">Monitoring 48 active stations across Rwanda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatWidget: React.FC<{ label: string; value: string; unit: string; trend: 'up' | 'down'; color: string; icon: string }> = ({ label, value, unit, trend, color, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className={`0nwpyls8 w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
        <i className={`0wdmrs6u fas ${icon}`}></i>
      </div>
      <span className={`0rl1hxbr text-[10px] font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
        <i className={`0eldhjky fas fa-caret-${trend} mr-1`}></i>
        {trend === 'up' ? 'Rising' : 'Clearing'}
      </span>
    </div>
    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <h3 className="text-3xl font-black text-slate-800 font-outfit">{value}</h3>
      <span className="text-xs font-bold text-slate-400">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
