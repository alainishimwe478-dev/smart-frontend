import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { mockPatients } from '../mockData';

const practiceData = [
  { day: 'Mon', attacks: 12, usage: 45 },
  { day: 'Tue', attacks: 18, usage: 52 },
  { day: 'Wed', attacks: 8, usage: 38 },
  { day: 'Thu', attacks: 15, usage: 60 },
  { day: 'Fri', attacks: 25, usage: 88 },
  { day: 'Sat', attacks: 20, usage: 72 },
  { day: 'Sun', attacks: 10, usage: 42 },
];

const StatCard = ({ title, value, sub, color, icon }) => (
  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-50 text-${color}-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <h4 className="text-3xl font-black text-slate-900 mb-1">{value}</h4>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{title}</p>
    <p className={`text-[10px] font-black uppercase text-${color}-600`}>{sub}</p>
  </div>
);

const ClinicalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Terminate secure clinical session?")) {
      window.location.reload();
    }
  };

  return (
    <div className="animate-fadeIn space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">Clinical Overview</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Practice: Kigali Central Medical</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 mr-2">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://picsum.photos/id/${i+20}/100/100`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="team" />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black">+2</div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2"
            >
              <i className="fas fa-right-from-bracket"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              Initiate Emergency Broadcast
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Managed" value="1,284" sub="+12 this week" color="indigo" icon="fa-user-doctor" />
        <StatCard title="Critical Alerts" value="8" sub="Needs Attention" color="rose" icon="fa-triangle-exclamation" />
        <StatCard title="Avg SpO2" value="96.2%" sub="Normal Range" color="emerald" icon="fa-heart-pulse" />
        <StatCard title="Triggers (Pollen)" value="High" sub="Kigali Metro Area" color="amber" icon="fa-wind" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Attack Frequency</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-practice weekly summary</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-black uppercase text-slate-500 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={practiceData}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="attacks" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorAttacks)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Alerts</h3>
            <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Live</span>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            {mockPatients.filter(p => p.status !== 'Stable').map((patient) => (
              <div 
                key={patient.id} 
                onClick={() => navigate(`/patients/${patient.id}`)}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group"
              >
                <div className={`w-3 h-3 rounded-full animate-pulse ${patient.status === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">{patient.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{patient.location} • SpO2: {patient.oxygenLevel}%</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/patients')}
            className="mt-10 w-full py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            View Triage Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDashboard;
