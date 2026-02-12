import React, { useState } from "react";

enum AppSection {
  Dashboard,
  LiveAssistant,
  MapForecast,
  DoctorConnect,
  Notifications,
}

const userName = "Alain";

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

interface FeatureCardProps {
  icon?: string;
  color?: string;
  title: string;
  desc: string;
  badge?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, color, title, desc, badge, onClick }) => (
  <div
    className="p-6 rounded-2xl shadow-md border border-slate-100 cursor-pointer hover:shadow-lg transition"
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      {badge && <span className="text-xs bg-rose-500 text-white px-2 py-1 rounded">{badge}</span>}
    </div>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState(AppSection.Dashboard);

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-sm font-medium border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live: Rwanda Climate Monitoring
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-outfit">
              Good {getTimeOfDay()}, <br />
              <span className="text-emerald-300">{userName}</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveSection(AppSection.LiveAssistant)}
                className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl shadow-xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Talk to Assistant
              </button>
              <button
                onClick={() => setActiveSection(AppSection.Dashboard)}
                className="px-8 py-4 bg-emerald-100/20 text-white font-bold rounded-2xl border border-white/20 hover:bg-emerald-100/30 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Background Decor */}

      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          color="blue"
          title="Geo-Risk Map"
          desc="Identify safe zones in Kigali vs highlands provinces."
          onClick={() => setActiveSection(AppSection.MapForecast)}
        />
        <FeatureCard
          icon="fa-user-doctor"
          color="indigo"
          title="Connected Doctor"
          desc="Direct telehealth link for emergency consultations."
          badge="ACTIVE"
          onClick={() => setActiveSection(AppSection.DoctorConnect)}
        />
        <FeatureCard
          icon="fa-bell"
          color="rose"
          title="Notifications"
          desc="Real-time alerts for humidity and pollen surges."
          badge="3 NEW"
          onClick={() => setActiveSection(AppSection.Notifications)}
        />
        <FeatureCard
          icon="fa-microphone"
          color="purple"
          title="Voice Assistant"
          desc="AI-driven assessment and medication reminders."
          onClick={() => setActiveSection(AppSection.LiveAssistant)}
        />
      </section>

      {/* Rwanda National Health Snapshot */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-bold text-slate-800 font-outfit">
              Rwanda National Health Snapshot
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Global Ranking: #1 In Health Equity (SSA)
            </span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-3 font-outfit">
            <i className="fas fa-bolt text-yellow-400"></i>
            Recent Critical Alerts
          </h4>
          <button
            onClick={() => setActiveSection(AppSection.Notifications)}
            className="w-full mt-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>View All Alerts</span>
            <i className="fas fa-arrow-right text-[10px] transition-transform"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
