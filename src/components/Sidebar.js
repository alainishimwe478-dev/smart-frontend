import React from 'react';
import { AppSection } from '../types';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: AppSection.Dashboard, icon: 'fa-chart-line', label: 'Dashboard' },
    { id: AppSection.Forecast, icon: 'fa-cloud-sun', label: 'Risk Forecast' },
    { id: AppSection.LiveAssistant, icon: 'fa-microphone', label: 'Voice Assistant' },
    { id: AppSection.DoctorConnect, icon: 'fa-video', label: 'Doctor Connect' },
    { id: AppSection.About, icon: 'fa-circle-info', label: 'Health Info' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-20">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <i className="fas fa-lungs text-white text-xl"></i>
        </div>
        <h1 className="font-bold text-slate-800 leading-tight">Smart Asthma<br /><span className="text-blue-600 text-sm">Weather System</span></h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${item.icon} w-5`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Health Status</p>
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-semibold">Monitoring Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
