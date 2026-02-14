
import React from 'react';
import LandingHeader from './LandingHeader';
import Features from './Features';
import SmartSensors from './SmartSensors';
import AIDoctor from './AIDoctor';
import About from './About';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden flex flex-col scroll-smooth">
      <LandingHeader onStart={onStart} />

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 pt-20 text-center max-w-5xl mx-auto">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-100 rounded-full blur-[120px] opacity-40 -z-10"></div>
        
        <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fadeIn">
          Next-Gen Asthma Management
        </span>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black font-outfit tracking-tight text-slate-950 mb-8 leading-[0.9] animate-fadeIn">
          Breathe easier <br /> 
          <span className="text-indigo-600">every single day.</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-12 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          AsthmaSense combines environmental monitoring with advanced AI to predict your triggers before they strike. 
          The smartest way to stay in control of your respiratory health.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fadeIn mb-24" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={onStart}
            className="px-12 py-7 bg-slate-950 text-white rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
          >
            Open Dashboard <i className="fas fa-arrow-right ml-3"></i>
          </button>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-7 bg-white border border-slate-200 text-slate-900 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
          >
            Explore Features
          </button>
        </div>
      </section>

      {/* Sub-sections */}
      <section id="features">
        <Features onStart={onStart} />
      </section>

      <section id="sensors">
        <SmartSensors onStart={onStart} />
      </section>

      <section id="doctor">
        <AIDoctor onStart={onStart} />
      </section>

      <section id="about">
        <About onStart={onStart} />
      </section>

      {/* Footer branding */}
      <footer className="relative z-10 p-20 text-center border-t border-slate-100 bg-white">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <i className="fas fa-lungs text-lg"></i>
          </div>
          <h1 className="text-xl font-black font-outfit tracking-tighter text-slate-900">AsthmaSense</h1>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          Kigali • San Francisco • London
        </p>
        <div className="mt-8 flex justify-center gap-8">
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Privacy Policy</a>
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Terms of Service</a>
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
