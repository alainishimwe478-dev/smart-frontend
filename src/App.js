import React, { useState, useEffect } from 'react';
import { AppSection } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MapForecast from './components/MapForecast';
import LiveAssistant from './components/LiveAssistant';
import DoctorConnect from './components/DoctorConnect';
import Medication from './components/Medication';
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
        window.location.hash = isAuthenticated ? AppSection.Dashboard : AppSection.Login;
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
        return <Home setActiveSection={navigate} userName={user.name} isAuthenticated={isAuthenticated} />;
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
      case AppSection.Login:
        return <Login onLogin={handleLogin} />;
      default:
        return <Dashboard />;
    }
  };

  if (activeSection === AppSection.Login && !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
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
        <Header 
          user={user} 
          activeSection={activeSection} 
          setActiveSection={navigate} 
          onLogout={handleLogout} 
          isAuthenticated={isAuthenticated}
        />
        
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
