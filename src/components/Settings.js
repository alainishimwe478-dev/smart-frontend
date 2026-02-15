import React from 'react';

const Settings = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Personalize your AsthmaShield workspace</p>
      </div>

      <div className="max-w-4xl space-y-10">
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-24 h-24 rounded-3xl bg-indigo-50 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <img src="https://picsum.photos/id/64/200/200" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Dr. Jean Bosco</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Lead Pulmonologist • Rwanda Health Board</p>
              <button className="mt-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">Change Photo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
              <input type="text" value="Jean Bosco Nshimyumuremyi" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Medical ID</label>
              <input type="text" value="R-PUL-8827-2024" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <input type="email" value="j.bosco@kigalihealth.rw" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Workphone</label>
              <input type="tel" value="+250 788 123 456" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Clinical Preferences</h3>
          <div className="space-y-6">
            {[
              { label: 'Critical Alert Notifications', desc: 'Push notifications for patient SpO2 < 92%', initial: true },
              { label: 'AI Diagnostic Copilot', desc: 'Use Gemini 3.0 to suggest clinical paths', initial: true },
              { label: 'Automatic Triage', desc: 'Prioritize queue based on biometric risk', initial: false },
              { label: 'Weekly Performance Report', desc: 'Detailed summary of practice outcomes', initial: true },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                <div className="max-w-md">
                  <h4 className="text-sm font-black text-slate-800">{pref.label}</h4>
                  <p className="text-xs text-slate-400 font-medium">{pref.desc}</p>
                </div>
                <button className={`w-14 h-8 rounded-full relative transition-all ${pref.initial ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${pref.initial ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-4 pb-10">
          <button className="px-10 py-5 bg-slate-100 text-slate-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
            Discard Changes
          </button>
          <button className="px-10 py-5 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
