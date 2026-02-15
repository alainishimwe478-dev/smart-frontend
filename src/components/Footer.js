import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-slate-100 pt-32 pb-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                <i className="fas fa-lungs text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-black font-outfit tracking-tighter text-slate-900">AsthmaShield</h1>
                <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mt-1">Rwanda National Network</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
              Rwanda's national asthma management network, empowering respiratory health through high-precision environmental sensors and AI intelligence.
            </p>
            <div className="flex gap-4">
              {['fa-twitter', 'fa-linkedin-in', 'fa-instagram', 'fa-github'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                  <i className={`fab ${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Product</h4>
            <ul className="space-y-4">
              {['Smart Alerts', 'Risk Mapping', 'Sensor Hub', 'Mobile App', 'AI Consultations'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 font-bold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Company</h4>
            <ul className="space-y-4">
              {['Our Mission', 'Team', 'Careers', 'Press Kit', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 hover:text-indigo-600 font-bold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Stay Updated</h4>
            <p className="text-sm text-slate-500 font-medium mb-6">Join 50k+ others getting weekly respiratory health insights.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            © 2024 AsthmaShield • Rwanda National Network
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Security', 'Sitemap'].map((legal) => (
              <a key={legal} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                {legal}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
