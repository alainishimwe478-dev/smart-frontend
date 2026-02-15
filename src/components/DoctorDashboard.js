import React, { useState } from 'react';
import ClinicalDashboard from './ClinicalDashboard';
import PatientRegistry from './PatientRegistry';
import Appointments from './Appointments';
import LabResults from './LabResults';
import DoctorSettings from './DoctorSettings';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('clinical');

  const tabs = [
    { id: 'clinical', label: 'Clinical Dashboard', icon: 'fa-chart-line' },
    { id: 'registry', label: 'Patient Registry', icon: 'fa-users' },
    { id: 'appointments', label: 'Appointments', icon: 'fa-calendar-check' },
    { id: 'labs', label: 'Lab Results', icon: 'fa-flask' },
    { id: 'settings', label: 'Settings', icon: 'fa-gear' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'clinical':
        return <ClinicalDashboard />;
      case 'registry':
        return <PatientRegistry />;
      case 'appointments':
        return <Appointments />;
      case 'labs':
        return <LabResults />;
      case 'settings':
        return <DoctorSettings />;
      default:
        return <ClinicalDashboard />;
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[3rem] text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
            <i className="fas fa-user-doctor"></i>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Doctor Dashboard</h1>
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">AsthmaShield Medical Portal</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default DoctorDashboard;
