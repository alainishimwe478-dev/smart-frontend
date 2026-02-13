import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(id || 'Emmanuel');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-outfit">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=2000"
          alt="Rwanda Highlands"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-indigo-900/40"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-indigo-500/20">
                <i className="fas fa-lungs"></i>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white leading-none">AsthmaShield</h1>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-1">Rwanda National Network</p>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Protecting Every <br />
              <span className="text-indigo-400">Breath in Rwanda.</span>
            </h2>
            <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-md">
              The specialized clinical shield for asthma management. Connect to real-time environmental triggers and national pulmonologists instantly.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4 text-white/60">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                <i className="fas fa-check-circle text-emerald-400"></i>
              </div>
              <span className="text-sm font-bold">Real-time Asthma Trigger Data</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                <i className="fas fa-check-circle text-emerald-400"></i>
              </div>
              <span className="text-sm font-bold">24/7 Respiratory AI Support</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                <i className="fas fa-check-circle text-emerald-400"></i>
              </div>
              <span className="text-sm font-bold">Direct Specialist Integration</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 p-12 lg:p-20 bg-white/5 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <h3 className="text-3xl font-black text-white mb-2">Patient Access</h3>
              <p className="text-slate-400 font-medium">Log in with your Shield ID to enter the clinic.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">AsthmaShield ID / Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <i className="fas fa-fingerprint"></i>
                  </div>
                  <input
                    type="text"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="emmanuel.user@shield.rw"
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Password</label>
                  <button type="button" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Forgot?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/40 hover:bg-indigo-500 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch animate-spin"></i>
                ) : (
                  <>
                    <span>Enter AsthmaShield</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </button>

              <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Demo Credentials</p>
                <p className="text-xs text-slate-400 font-medium">ID: <span className="text-indigo-300">emmanuel@shield.rw</span> • Pass: <span className="text-indigo-300">any</span></p>
              </div>
            </form>

            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 w-full">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">New to Network?</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <button className="text-white font-bold hover:text-indigo-400 transition-all flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <i className="fas fa-hospital-user text-xs"></i>
                </span>
                Register at CHUK / Local Hospital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
