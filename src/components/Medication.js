import React from 'react';

const Medication = () => {
  return (
    <div className="animate-fadeIn space-y-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-black text-slate-900 font-outfit">Current Routine</h2>
             <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                <i className="fas fa-plus"></i>
             </button>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Salbutamol Inhaler', type: 'Rescue', doses: 'As needed', status: 'Ready', icon: 'fa-wind', color: 'indigo' },
              { name: 'Montelukast Sodium', type: 'Preventer', doses: '1 Pill • Bedtime', status: 'Taken', icon: 'fa-tablets', color: 'emerald' },
              { name: 'Fluticasone Propionate', type: 'Controller', doses: '2 Puffs • Morning', status: 'Due Now', icon: 'fa-lungs', color: 'rose' }
            ].map((med, i) => (
              <div key={i} className="flex items-center justify-between p-8 rounded-[3rem] bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-6">
                   <div className={`w-16 h-16 rounded-3xl bg-${med.color}-50 text-${med.color}-600 flex items-center justify-center text-2xl shadow-inner`}>
                      <i className={`fas ${med.icon}`}></i>
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-slate-900">{med.name}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{med.type} • {med.doses}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ring-1 ${
                     med.status === 'Taken' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 'bg-rose-50 text-rose-600 ring-rose-100'
                   }`}>
                      {med.status}
                   </span>
                   {med.status === 'Due Now' && (
                     <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline underline-offset-4">Log Dose</button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
           <div className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl shadow-indigo-200">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black font-outfit">Adherence Streak</h3>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white text-xl">
                    <i className="fas fa-fire"></i>
                 </div>
              </div>
              <div className="flex items-end gap-4 mb-8">
                 <span className="text-8xl font-black leading-none font-outfit">12</span>
                 <span className="text-xl font-bold text-indigo-200 pb-3">Days Perfect</span>
              </div>
              <p className="text-indigo-100 font-medium mb-12">
                Your lung function has improved by 14% since you started maintaining this streak. Keep it up!
              </p>
              <div className="grid grid-cols-7 gap-2">
                 {[1,1,1,1,1,1,0].map((s, i) => (
                   <div key={i} className={`h-12 rounded-xl flex items-center justify-center text-[10px] font-black ${s ? 'bg-white text-indigo-600' : 'bg-white/10 text-white/40 border border-white/10'}`}>
                      {['M','T','W','T','F','S','S'][i]}
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-10">
              <div className="w-24 h-24 rounded-full border-8 border-indigo-600 flex items-center justify-center shrink-0">
                 <span className="text-2xl font-black text-indigo-600">82%</span>
              </div>
              <div>
                 <h4 className="text-lg font-black text-slate-900 mb-2">Refill Progress</h4>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                   Your inhaler is estimated at <strong>12 puffs remaining</strong>. We've notified CHUK Pharmacy for your refill.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Medication;
