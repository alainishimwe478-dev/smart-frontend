import React, { useState, useRef } from 'react';
import { mockAppointments, mockPatients } from '../mockData';

function decode(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data, ctx, sampleRate, numChannels) {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState(mockAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [transcription, setTranscription] = useState([]);
  const [permissionError, setPermissionError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [newApp, setNewApp] = useState({
    patientName: '',
    time: '',
    type: 'Routine'
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const audioContextInRef = useRef(null);
  const audioContextOutRef = useRef(null);
  const streamRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());

  const handleSave = (e) => {
    e.preventDefault();
    if (!newApp.patientName || !newApp.time) return;

    const appointment = {
      id: `A${Date.now()}`,
      patientName: newApp.patientName,
      patientId: mockPatients.find(p => p.name === newApp.patientName)?.id || 'P000',
      date: new Date().toISOString().split('T')[0],
      time: newApp.time,
      type: newApp.type,
      status: 'Pending'
    };

    setAppointmentsList([appointment, ...appointmentsList]);
    setIsModalOpen(false);
    setNewApp({ patientName: '', time: '', type: 'Routine' });
  };

  const startVideoCall = async () => {
    if (isConnecting) return;
    setPermissionError(null);
    setIsConnecting(true);
    setTranscription(['Awaiting hardware authorization...']);

    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('MEDIA_NOT_SUPPORTED');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).catch(err => {
        if (err.name === 'NotAllowedError') throw new Error('ACCESS_DENIED');
        if (err.name === 'NotFoundError') throw new Error('NO_HARDWARE_FOUND');
        throw err;
      });

      setIsVideoCallActive(true);
      streamRef.current = stream;
      setTranscription(prev => [...prev, 'Hardware verified. Connecting...']);
      if (videoRef.current) videoRef.current.srcObject = stream;

      audioContextInRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key not configured');

      const ws = new WebSocket(`wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`);
      sessionRef.current = ws;

      ws.onopen = () => {
        setTranscription(prev => [...prev, 'Connected. AI Assistant ready.']);
        ws.send(JSON.stringify({
          setup: {
            model: 'models/gemini-2.0-flash-exp',
            generation_config: { response_modalities: ['AUDIO'] },
            system_instruction: { parts: [{ text: 'You are a clinical AI assistant for AsthmaShield Rwanda. Supporting pulmonologist for patient Alphonse Mutabazi (SpO2: 91%, High Pollen). Analyze visual signs and provide diagnostic support.' }] }
          }
        }));

        const source = audioContextInRef.current.createMediaStreamSource(stream);
        const processor = audioContextInRef.current.createScriptProcessor(4096, 1, 1);
        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) pcm16[i] = inputData[i] * 32768;
            ws.send(JSON.stringify({ realtime_input: { media_chunks: [{ data: encode(new Uint8Array(pcm16.buffer)), mime_type: 'audio/pcm' }] } }));
          }
        };
        source.connect(processor);
        processor.connect(audioContextInRef.current.destination);

        const intervalId = setInterval(() => {
          if (videoRef.current?.readyState >= 2 && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth || 640;
            canvasRef.current.height = videoRef.current.videoHeight || 480;
            ctx.drawImage(videoRef.current, 0, 0);
            canvasRef.current.toBlob(async (blob) => {
              if (blob && ws.readyState === WebSocket.OPEN) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result.split(',')[1];
                  ws.send(JSON.stringify({ realtime_input: { media_chunks: [{ data: base64, mime_type: 'image/jpeg' }] } }));
                };
                reader.readAsDataURL(blob);
              }
            }, 'image/jpeg', 0.5);
          }
        }, 1000);
        window.videoInterval = intervalId;
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        if (data.serverContent?.modelTurn?.parts) {
          const text = data.serverContent.modelTurn.parts.filter(p => p.text).map(p => p.text).join('');
          if (text) setTranscription(prev => [...prev, `AI: ${text}`]);

          const audioData = data.serverContent.modelTurn.parts.find(p => p.inlineData?.data)?.inlineData?.data;
          if (audioData && audioContextOutRef.current) {
            const ctx = audioContextOutRef.current;
            if (ctx.state === 'suspended') await ctx.resume();
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }
        }
      };

      ws.onerror = () => setTranscription(prev => [...prev, 'Connection error']);
      ws.onclose = () => setIsVideoCallActive(false);
      setIsConnecting(false);

    } catch (err) {
      setIsConnecting(false);
      setIsVideoCallActive(false);
      let msg = 'System Error: Could not initialize clinical stream.';
      if (err.message === 'ACCESS_DENIED') msg = 'Permission Denied: Camera/microphone access blocked. Reset permissions and retry.';
      else if (err.message === 'NO_HARDWARE_FOUND') msg = 'Hardware Error: No camera or microphone detected.';
      else if (err.message === 'MEDIA_NOT_SUPPORTED') msg = 'Compatibility Error: Browser does not support media streaming.';
      setPermissionError(msg);
    }
  };

  const stopVideoCall = () => {
    if (sessionRef.current) { try { sessionRef.current.close(); } catch(e) {} sessionRef.current = null; }
    if (window.videoInterval) clearInterval(window.videoInterval);
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (audioContextInRef.current) { audioContextInRef.current.close(); audioContextInRef.current = null; }
    if (audioContextOutRef.current) { audioContextOutRef.current.close(); audioContextOutRef.current = null; }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setIsVideoCallActive(false);
    setTranscription([]);
    setPermissionError(null);
    setIsConnecting(false);
  };

  return (
    <div className="animate-fadeIn space-y-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">Clinical Schedule</h2>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-2">Managing {appointmentsList.length} Active Consultations</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3"
          >
            <i className="fas fa-calendar-plus"></i> New Appointment
          </button>
          <button 
            onClick={isVideoCallActive ? stopVideoCall : startVideoCall}
            disabled={isConnecting}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center gap-3 disabled:opacity-50 ${
              isVideoCallActive ? 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700' : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
            }`}
          >
            {isConnecting ? <i className="fas fa-circle-notch animate-spin"></i> : <i className={`fas ${isVideoCallActive ? 'fa-phone-slash' : 'fa-video'}`}></i>}
            {isVideoCallActive ? 'End AI Session' : isConnecting ? 'Connecting...' : 'Start AI Consultation'}
          </button>
        </div>
      </div>

      {permissionError && (
        <div className="bg-rose-50 border border-rose-200 p-8 rounded-[2.5rem] flex items-start gap-6 text-rose-700 shadow-sm max-w-4xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0 text-rose-500">
            <i className="fas fa-hand"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-black text-sm uppercase tracking-widest mb-2">Hardware Access Required</h4>
            <p className="text-xs font-bold leading-relaxed mb-4">{permissionError}</p>
            <div className="flex gap-4">
              <button onClick={startVideoCall} className="px-6 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-colors">Retry Authorization</button>
              <button onClick={() => setPermissionError(null)} className="px-6 py-2 bg-white border border-rose-100 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Today's Timeline</h3>
            <div className="space-y-8">
              {appointmentsList.map((app, i) => (
                <div key={app.id} className="flex gap-8 group">
                  <div className="w-20 pt-1">
                    <p className="text-sm font-black text-slate-800">{app.time}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GMT+2</p>
                  </div>
                  <div className="relative flex-1">
                    {i !== appointmentsList.length - 1 && <div className="absolute left-[-1.5rem] top-8 bottom-[-2.5rem] w-px bg-slate-100"></div>}
                    <div className="absolute left-[-1.75rem] top-2 w-2 h-2 rounded-full border-2 border-indigo-600 bg-white z-10 group-hover:scale-150 transition-transform"></div>
                    
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group-hover:border-indigo-100 transition-all flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-800">{app.patientName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{app.type}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          app.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                          app.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                          app.status === 'Cancelled' ? 'bg-slate-50 text-slate-600' : 'bg-indigo-50 text-indigo-600'
                        }`}>
                          {app.status}
                        </span>
                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-sm transition-all border border-slate-100">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-100">
            <h3 className="text-2xl font-black mb-6">Quick Connect</h3>
            <p className="text-sm opacity-80 mb-10 leading-relaxed">Launch an instant video consultation with a patient currently in "Critical" status.</p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xs">JU</div>
                <div className="flex-1">
                  <p className="text-xs font-black">Jean Uwimana</p>
                  <p className="text-[10px] opacity-60">Status: Critical</p>
                </div>
                <button onClick={startVideoCall} className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <i className="fas fa-video"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Booking Requests</h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <i className="fas fa-user-clock"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-slate-800">New Request</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref #098-{i}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Accept</button>
                      <button className="px-3 py-2 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-colors">Decline</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isVideoCallActive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Telemetry Uplink</span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-black text-white uppercase">Live Diagnostic Feed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-xl flex flex-col h-[580px] border border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl">
                <i className="fas fa-brain"></i>
              </div>
              <div>
                <h3 className="text-white text-xl font-black">AI Copilot</h3>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Logic Stream v2.5</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {transcription.map((t, i) => (
                <div key={i} className={`p-5 rounded-3xl text-[11px] font-bold uppercase leading-relaxed ${t.startsWith('AI:') ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30' : 'bg-white/5 text-slate-500 italic'}`}>
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protected Case</p>
                  <p className="text-xs font-black text-white">Alphonse Mutabazi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Appointment</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Fill clinical booking details</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Select Patient</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer"
                  value={newApp.patientName}
                  onChange={(e) => setNewApp({...newApp, patientName: e.target.value})}
                  required
                >
                  <option value="">Choose a patient...</option>
                  {mockPatients.map(p => (
                    <option key={p.id} value={p.name}>{p.name} (Age: {p.age})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Scheduled Time</label>
                  <input 
                    type="time" 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={newApp.time}
                    onChange={(e) => setNewApp({...newApp, time: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Appt Type</label>
                  <select 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer"
                    value={newApp.type}
                    onChange={(e) => setNewApp({...newApp, type: e.target.value})}
                  >
                    <option>Routine</option>
                    <option>Follow-up</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
