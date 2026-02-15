import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ClinicalDashboard from './components/ClinicalDashboard';
import PatientDetail from './components/PatientDetail';
import PatientRegistry from './components/PatientRegistry';
import Appointments from './components/Appointments';
import LabResults from './components/LabResults';
import DoctorSettings from './components/DoctorSettings';

const Sidebar = () => (
  <div className="fixed left-0 top-0 h-screen w-20 md:w-72 bg-white border-r border-slate-100 flex flex-col p-6 z-50 overflow-y-auto">
    <div className="flex items-center gap-3 mb-12">
      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl">
        <i className="fas fa-lungs-virus"></i>
      </div>
      <div className="hidden md:block">
        <h1 className="text-xl font-black tracking-tight">AsthmaShield</h1>
        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Medical Pro</p>
      </div>
    </div>

    <nav className="flex-1 space-y-2">
      {[
        { icon: 'fa-chart-pie', label: 'Clinical Dashboard', path: '/' },
        { icon: 'fa-users', label: 'Patient Registry', path: '/patients' },
        { icon: 'fa-calendar-check', label: 'Appointments', path: '/calendar' },
        { icon: 'fa-microscope', label: 'Lab Results', path: '/labs' },
        { icon: 'fa-gear', label: 'Settings', path: '/settings' },
      ].map((item, i) => (
        <NavLink 
          key={i} 
          to={item.path}
          className={({ isActive }) => `
            flex items-center gap-4 p-4 rounded-2xl transition-all group
            ${isActive 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}
          `}
        >
          <div className="w-6 text-center text-lg">
            <i className={`fas ${item.icon}`}></i>
          </div>
          <span className="hidden md:block font-bold text-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="mt-8">
      <div className="bg-indigo-50 p-6 rounded-[2rem] hidden md:block">
        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Support Unit</p>
        <p className="text-xs font-bold text-slate-600 mb-4">Emergency hotline for specialists.</p>
        <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
          Call Dispatch
        </button>
      </div>
      <div className="flex items-center gap-3 mt-8 p-2">
        <img src="https://picsum.photos/id/64/100/100" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
        <div className="hidden md:block">
          <p className="text-xs font-black">Dr. Jean Bosco</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Pulmonologist</p>
        </div>
      </div>
    </div>
  </div>
);

const DoctorApp = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <main className="pl-20 md:pl-72 min-h-screen">
          <div className="max-w-7xl mx-auto p-8 lg:p-12">
            <Routes>
              <Route path="/" element={<ClinicalDashboard />} />
              <Route path="/patients" element={<PatientRegistry />} />
              <Route path="/patients/:id" element={<PatientDetail />} />
              <Route path="/calendar" element={<Appointments />} />
              <Route path="/labs" element={<LabResults />} />
              <Route path="/settings" element={<DoctorSettings />} />
              <Route path="*" element={<ClinicalDashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default DoctorApp;
