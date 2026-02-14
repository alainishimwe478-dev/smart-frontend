import React from 'react';
import { AppSection } from '../types';

const NavItem = ({ section, active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="font-bold text-sm tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-glow"></div>}
  </button>
);

const Sidebar = ({ activeSection, setActiveSection, onLogout, isAuthenticated }) => {
  return (
    <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-100 p-8">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-100">
          <i className="fas fa-shield-heart"></i>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 leading-none">Bio-Shield</h1>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Rwanda Network</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem section={AppSection.Home} active={activeSection === AppSection.Home} icon="fa-house" label="Home" onClick={() => setActiveSection(AppSection.Home)} />
        <NavItem section={AppSection.Dashboard} active={activeSection === AppSection.Dashboard} icon="fa-chart-pie" label="Analytics" onClick={() => setActiveSection(AppSection.Dashboard)} />
        <NavItem section={AppSection.MapForecast} active={activeSection === AppSection.MapForecast} icon="fa-map-location-dot" label="Geo-Risk Map" onClick={() => setActiveSection(AppSection.MapForecast)} />
        <NavItem section={AppSection.LiveAssistant} active={activeSection === AppSection.LiveAssistant} icon="fa-microphone-lines" label="AI Assistant" onClick={() => setActiveSection(AppSection.LiveAssistant)} />
        <NavItem section={AppSection.DoctorConnect} active={activeSection === AppSection.DoctorConnect} icon="fa-user-doctor" label="Doctor Link" onClick={() => setActiveSection(AppSection.DoctorConnect)} />
        <NavItem section={AppSection.Medication} active={activeSection === AppSection.Medication} icon="fa-pills" label="Medication" onClick={() => setActiveSection(AppSection.Medication)} />
        <NavItem section={AppSection.Notifications} active={activeSection === AppSection.Notifications} icon="fa-bell" label="Notifications" onClick={() => setActiveSection(AppSection.Notifications)} />
      </nav>

      <div className="mt-auto bg-slate-50 rounded-3xl p-6 border border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <i className="fas fa-leaf"></i>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Air Quality: Good</span>
        </div>
        <p className="text-xs text-slate-500 font-medium mb-4">Current AQI in Kigali is <strong className="text-slate-900">42</strong>. Stay outdoor safe.</p>
        <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
          View Detailed Stats
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
