import React from 'react';
import { AppSection } from '../types';

const Header = ({ user, activeSection, setActiveSection, onLogout, isAuthenticated }) => {
  const navItems = [
    { section: AppSection.Home, icon: 'fa-home', label: 'Home' },
    { section: AppSection.Dashboard, icon: 'fa-chart-line', label: 'Dashboard' },
    { section: AppSection.MapForecast, icon: 'fa-map', label: 'Map' },
    { section: AppSection.LiveAssistant, icon: 'fa-microphone', label: 'Assistant' },
    { section: AppSection.DoctorConnect, icon: 'fa-user-doctor', label: 'Doctor' },
    { section: AppSection.Medication, icon: 'fa-pills', label: 'Medication' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black text-indigo-600">Smart Asthma</h1>
          {isAuthenticated && (
            <nav className="hidden md:flex gap-2">
              {navItems.map(item => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSection === item.section
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <i className={`fas ${item.icon} mr-2`}></i>
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-700">{user.name}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
