import React, { useState, useEffect } from 'react';
import { AppSection } from './types';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MapForecast from './components/MapForecast';
import LiveAssistant from './components/LiveAssistant';
import DoctorConnect from './components/DoctorConnect';
import Medication from './components/Medication';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Login from './components/Login';

const App = () => {
  const [activeSection, setActiveSection] = useState(AppSection.Home);
  const [user, setUser] = useState({
    name: 'Emmanuel',
    location: 'Kigali, Rwanda',
    riskLevel: 'Moderate'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (Object.values(AppSection).includes(hash)) {
        setActiveSection(hash);
      } else if (!window.location.hash) {
        window.location.hash = isAuthenticated ? AppSection.Dashboard : AppSection.Home;
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  const navigate = (section) => {
    window.location.hash = section;
    setActiveSection(section);
  };

  const handleLogin = (id) => {
    setIsAuthenticated(true);
    setUser(prev => ({ ...prev, name: id.split('@')[0] || 'Emmanuel' }));
    navigate(AppSection.Dashboard);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate(AppSection.Login);
  };

  const renderContent = () => {
    if (!isAuthenticated && activeSection !== AppSection.Login && activeSection !== AppSection.Home) {
        return <Login onLogin={handleLogin} />;
    }

    switch (activeSection) {
      case AppSection.Home:
        return <Home onStart={() => navigate(AppSection.Login)} />;
      case AppSection.Dashboard:
        return <Dashboard />;
      case AppSection.MapForecast:
        return <MapForecast />;
      case AppSection.LiveAssistant:
        return <LiveAssistant />;
      case AppSection.DoctorConnect:
        return <DoctorConnect />;
      case AppSection.Medication:
        return <Medication />;
      case AppSection.Notifications:
        return <Notifications />;
      case AppSection.Profile:
        return <Profile user={user} />;
      case AppSection.Login:
        return <Login onLogin={handleLogin} />;
      default:
        return <Dashboard />;
    }
  };

  if (activeSection === AppSection.Login && !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (activeSection === AppSection.Home) {
    return <Home onStart={() => navigate(AppSection.Login)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {isAuthenticated && activeSection !== AppSection.Login && (
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={navigate} 
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {isAuthenticated && activeSection !== AppSection.Login && (
          <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate(AppSection.Profile)}
              className="flex items-center gap-4 hover:bg-slate-50 px-4 py-2 rounded-2xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <i className="fas fa-user-circle text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.location}</p>
              </div>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(AppSection.Notifications)}
                className="relative w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[8px] text-white font-black flex items-center justify-center">3</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2"
              >
                <i className="fas fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
