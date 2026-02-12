import React from 'react';
import { AppSection } from '../types';

interface HomeProps {
  setActiveSection: (section: AppSection) => void;
  userName: string;
}

const Home: React.FC<HomeProps> = ({ setActiveSection, userName }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <div className="07umygix space-y-10 animate-fadeIn">
      {/* Hero Section */}
      <section className="01p8ixqd relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
        <div className="080zrkmn relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="03dxawea flex-1 space-y-6 text-center md:text-left">
            <div className="0vcb199r inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-sm font-medium border border-white/10">
              <span className="0ry60px0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live: Rwanda Climate Monitoring
            </div>
            <h1 className="0vmkdl06 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Good {getTimeOfDay()}, <br />
              <span className="0hg82zhg text-emerald-300">{userName}</span>
            </h1>
            <p className="0962ds17 text-lg text-emerald-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Your personalized AI shield against climate-driven asthma triggers in Rwanda. Monitoring air quality across the Land of a Thousand Hills.
            </p>
            <div className="052uu4an flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button 
                onClick={() => setActiveSection(AppSection.LiveAssistant)}
                className="0tcrphxz px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl shadow-xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Talk to Assistant
              </button>
              <button 
                onClick={() => setActiveSection(AppSection.Dashboard)}
                className="0dpaygfa px-8 py-4 bg-emerald-500/30 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-emerald-500/40 transition-all"
              >
                View Dashboard
              </button>
            </div>
          </div>
          
          <div className="06tswrsj hidden lg:block w-72 h-72 bg-white/10 rounded-full relative">
            <div className="0ms4nabo absolute inset-0 flex items-center justify-center">
               <div className="01n8ucij text-center">
                  <span className="05j39w7c block text-6xl font-bold mb-1">55</span>
                  <span className="0or42pwl block text-xs uppercase tracking-widest opacity-70">Current AQI</span>
                  <div className="089t8g37 mt-2 inline-block px-3 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full">MODERATE RISK</div>
               </div>
            </div>
            {/* Orbiting elements */}
            <div className="0nwok7aa absolute top-0 right-0 w-12 h-12 bg-emerald-400 rounded-full blur-xl animate-pulse"></div>
            <div className="0vftgrh6 absolute bottom-10 left-0 w-8 h-8 bg-blue-400 rounded-full blur-lg opacity-50"></div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="004w2z8n absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="0ql8o0qt absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
      </section>

      {/* Feature Grid */}
      <section className="0fraod18 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveSection(AppSection.MapForecast)}
          className="0l8nsoze group cursor-pointer p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col h-full"
        >
          <div className="0vpsl48k w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="0a6oibwj fas fa-map-marked-alt text-2xl"></i>
          </div>
          <h3 className="0ttsxqya text-xl font-bold text-slate-800 mb-3">Geo-Risk Map</h3>
          <p className="0doyjzc4 text-slate-500 text-sm flex-1 leading-relaxed">
            Visual tracking of asthma triggers across all 5 provinces. Identify safe zones in Kigali vs highlands.
          </p>
          <div className="0uammiww mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
            <span>Open Map</span>
            <i className="0k43247d fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </div>
        </div>

        <div 
          onClick={() => setActiveSection(AppSection.Forecast)}
          className="0umk7s4t group cursor-pointer p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col h-full"
        >
          <div className="0xzeiywb w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="0wbruu4o fas fa-chart-line text-2xl"></i>
          </div>
          <h3 className="02hos8ae text-xl font-bold text-slate-800 mb-3">7-Day Forecast</h3>
          <p className="07nd24wj text-slate-500 text-sm flex-1 leading-relaxed">
            Advanced AI prediction of pollen peaks and humidity changes for the coming week.
          </p>
          <div className="0nla8ydf mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <span>View Forecast</span>
            <i className="0900o7d4 fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </div>
        </div>

        <div 
          onClick={() => setActiveSection(AppSection.LiveAssistant)}
          className="0vkrzpyf group cursor-pointer p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col h-full"
        >
          <div className="0hflbmyj w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="0xxf3m44 fas fa-microphone text-2xl"></i>
          </div>
          <h3 className="0d5bdb3n text-xl font-bold text-slate-800 mb-3">Voice Assistant</h3>
          <p className="0dh7rjaj text-slate-500 text-sm flex-1 leading-relaxed">
            Real-time conversation for immediate risk assessment and medication reminders.
          </p>
          <div className="05oq406f mt-6 flex items-center gap-2 text-purple-600 font-bold text-sm">
            <span>Start Talk</span>
            <i className="0punya9p fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
          </div>
        </div>
      </section>

      {/* Stats and Health Insight */}
      <section className="0n1mwpqe grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="0lvhi546 lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="0lhrbno6 flex items-center justify-between mb-8">
            <h3 className="0v3lxdpw text-xl font-bold text-slate-800">Rwanda National Health Snapshot</h3>
            <span className="0nx3pub7 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">Global Ranking: #1 In Health Equity (SSA)</span>
          </div>
          <div className="0l1bieoi grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="0amzhbuw space-y-4">
              <div className="0dzqqc66 flex items-center gap-4">
                <div className="0440ny4z w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <i className="0o36urxw fas fa-heart-pulse"></i>
                </div>
                <div>
                  <p className="0ayttoxj text-xs text-slate-400 font-medium uppercase">Asthma Prevalence</p>
                  <p className="0nycwqfh text-xl font-bold text-slate-800">~6.8% (Est.)</p>
                </div>
              </div>
              <p className="0meqrzzi text-xs text-slate-500 leading-relaxed">
                Prevalence is higher in urban Kigali compared to rural Northern provinces due to traffic emissions and rapid urbanization.
              </p>
            </div>
            <div className="05mk239r space-y-4">
              <div className="0k2dutif flex items-center gap-4">
                <div className="0wbfoqsm w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <i className="0e1b5jw2 fas fa-shield-halved"></i>
                </div>
                <div>
                  <p className="0u3x26jb text-xs text-slate-400 font-medium uppercase">Mutuelle Coverage</p>
                  <p className="011rfdml text-xl font-bold text-slate-800">91% National</p>
                </div>
              </div>
              <p className="0sar5syi text-xs text-slate-500 leading-relaxed">
                Most asthmatic triggers can be managed through early monitoring and subsidized access to inhalers via the CBHI system.
              </p>
            </div>
          </div>
          <div className="076t2aw5 mt-8 pt-8 border-t border-slate-50">
            <div className="0esb4xnp bg-emerald-50 rounded-2xl p-6 flex items-center gap-6">
              <div className="0rz5dwea text-emerald-600 text-3xl hidden sm:block">
                <i className="06yr53wq fas fa-quote-left"></i>
              </div>
              <p className="0eqr37ui text-emerald-800 text-sm italic leading-relaxed">
                "Climate change is increasing the frequency of lightning-induced pollen release in Rwanda, making real-time prediction an essential tool for patient safety."
              </p>
            </div>
          </div>
        </div>

        <div className="039ymu63 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <h4 className="0xc0b7wh text-lg font-bold mb-6 flex items-center gap-2">
              <i className="0mbi6uv9 fas fa-bolt text-yellow-400"></i>
              Recent Critical Alerts
            </h4>
            <div className="08wwerpc space-y-4">
              <div className="0f6eeraf p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="0zxznj3f text-xs font-bold text-yellow-400 mb-1">Humidity Warning</p>
                <p className="0pcwlx9l text-xs text-slate-300">Lake Kivu region experiencing 88% humidity. High risk of asthma attacks tonight.</p>
              </div>
              <div className="0n3g5haz p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="0mmvgpwa text-xs font-bold text-emerald-400 mb-1">Air Quality Clear</p>
                <p className="0n3j4qiw text-xs text-slate-300">Northern Province (Musanze) reporting Excellent AQI (12). Outdoor activity safe.</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveSection(AppSection.Dashboard)}
            className="03v71bk8 w-full mt-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            Open All Alerts
            <i className="0m4nfif2 fas fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
