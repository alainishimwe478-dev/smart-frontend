import React from 'react';

const DoctorSettings = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Manage Your Profile & Preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-black mx-auto mb-6">
            DR
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Dr. Emmanuel</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Pulmonologist</p>
          <button className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
            Edit Profile
          </button>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Account Information</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Full Name</label>
                <input type="text" value="Dr. Emmanuel Mugisha" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Email</label>
                <input type="email" value="emmanuel@asthmashield.rw" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Specialization</label>
                <input type="text" value="Pulmonologist" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Notifications</h3>
            <div className="space-y-6">
              {[
                { label: 'Critical Patient Alerts', checked: true },
                { label: 'Appointment Reminders', checked: true },
                { label: 'Lab Results Updates', checked: false },
                { label: 'System Updates', checked: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-black text-slate-800">{item.label}</span>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
