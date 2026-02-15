import React from 'react';

const LandingHeader = ({ onStart }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <i className="fas fa-lungs text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-black font-outfit tracking-tighter text-slate-900">AsthmaShield</h1>
            <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Rwanda National Network</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">Home</button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">Features</button>
          <button onClick={() => document.getElementById('sensors')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">Sensors</button>
          <button onClick={() => document.getElementById('doctor')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">AI Doctor</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600">About</button>
        </div>
        <button onClick={onStart} className="px-8 py-4 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
          Login
        </button>
      </nav>
    </header>
  );
};

export default LandingHeader;
