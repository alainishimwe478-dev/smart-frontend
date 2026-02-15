import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PatientDetail = () => {
  const { id } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAIInsights = async () => {
    setLoading(true);
    setTimeout(() => {
      setInsight("Clinical Analysis:\n\n• SpO2 at 91% indicates mild hypoxemia requiring monitoring\n• High inhaler usage (12 doses) suggests poor asthma control\n• Current environmental triggers (high pollen, 82% humidity) are significant risk factors\n\nRecommendations:\n1. Consider adjusting controller medication dosage\n2. Schedule follow-up within 48 hours\n3. Patient education on trigger avoidance\n4. Monitor for signs of exacerbation");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-colors mb-4">
        <i className="fas fa-arrow-left"></i> Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-4xl font-black">
                AM
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Alphonse Mutabazi</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Patient ID: #ASH-{id}882</p>
                <div className="flex gap-2 mt-4">
                  <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest">High Risk</span>
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">Nyarugenge</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Device Telemetry</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Blood Oxygen (SpO2)</span>
                  <span className="text-lg font-black text-rose-600">91%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Peak Flow Rate</span>
                  <span className="text-lg font-black text-slate-800">420 L/min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600">Inhaler Doses</span>
                  <span className="text-lg font-black text-amber-600">12 (Critical)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Patient History</h4>
              <div className="space-y-4">
                {[
                  { date: 'Oct 12', event: 'Emergency Room Visit' },
                  { date: 'Sep 28', event: 'Medication Refill' },
                  { date: 'Aug 15', event: 'Routine Follow-up' }
                ].map((h, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <span className="text-[10px] font-black text-indigo-600 uppercase w-12">{h.date}</span>
                    <span className="text-xs font-bold text-slate-700">{h.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] space-y-8">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-xl font-black">Gemini Clinical Assistant</h3>
            </div>
            
            <div className="min-h-[200px] bg-white/10 rounded-3xl p-6 mb-6 text-sm font-medium leading-relaxed">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 py-10">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">Analyzing Patient Telemetry...</p>
                </div>
              ) : insight ? (
                <div className="whitespace-pre-wrap">{insight}</div>
              ) : (
                <p className="opacity-60 text-center py-10">Request a clinical analysis for this patient based on current triggers.</p>
              )}
            </div>

            <button 
              onClick={fetchAIInsights}
              disabled={loading}
              className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Run Diagnostics Analysis'}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h4>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-600 transition-all">
                <span className="text-[10px] font-black uppercase group-hover:text-white">Video Consultation</span>
                <i className="fas fa-video text-slate-300 group-hover:text-white"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-600 transition-all">
                <span className="text-[10px] font-black uppercase group-hover:text-white">Adjust Prescription</span>
                <i className="fas fa-capsules text-slate-300 group-hover:text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
