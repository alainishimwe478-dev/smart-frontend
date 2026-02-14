import React, { useState, useRef } from 'react';

function encode(bytes) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
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

const LiveAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  
  const audioContextRef = useRef(null);
  const outputAudioContextRef = useRef(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set());
  const sessionRef = useRef(null);

  const startAssistant = async () => {
    setStatus('connecting');
    setError('');

    // Check for API key - use environment variable or fallback
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyDH2ODf5wYfz7LHuYVvpAC4OyG9a59g1-8';
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setError('API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file');
      setStatus('idle');
      return;
    }

    try {
      // Dynamic import of Google GenAI
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are AsthmaShield AI, a helpful medical assistant specialized in asthma management for patients in Rwanda. Help users assess environmental risks (humidity, dust, smoke) and manage symptoms. Be concise, empathetic, and professional.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('Session opened');
            setIsActive(true);
            setStatus('listening');

            const source = audioContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: blob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.inputTranscription) {
               setTranscriptions(prev => [...prev, { type: 'user', text: message.serverContent?.inputTranscription?.text || '' }]);
            }
            if (message.serverContent?.outputTranscription) {
               setTranscriptions(prev => [...prev, { type: 'ai', text: message.serverContent?.outputTranscription?.text || '' }]);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              setStatus('speaking');
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              };
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onerror: (e) => {
            console.error('Live Error', e);
            setError('Connection error occurred');
          },
          onclose: () => {
            setIsActive(false);
            setStatus('idle');
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start assistant', err);
      setError(err.message || 'Failed to start assistant');
      setStatus('idle');
    }
  };

  const stopAssistant = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    setIsActive(false);
    setStatus('idle');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-20">
      <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
        
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl">
                <i className="fas fa-lungs"></i>
             </div>
             <div>
                <h2 className="text-3xl font-black text-slate-900 font-outfit leading-none">AsthmaShield AI</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Specialized Pulmonology Assistant</p>
             </div>
          </div>
          <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 ${
            isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
          }`}>
             <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
             {isActive ? status : 'Offline'}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm font-medium">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-6 mb-12 scroll-smooth px-4">
           {transcriptions.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 text-4xl">
                   <i className="fas fa-microphone"></i>
                </div>
                <p className="text-slate-400 text-sm font-medium max-w-xs">
                  Try saying: "Help me check the air quality for my asthma" or "How do I use my rescue inhaler?"
                </p>
             </div>
           )}
           {transcriptions.map((t, i) => (
             <div key={i} className={`flex ${t.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-6 rounded-3xl text-sm font-medium leading-relaxed ${
                  t.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                   {t.text}
                </div>
             </div>
           ))}
        </div>

        <div className="flex flex-col items-center gap-6">
           <div className="relative">
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full border-4 border-indigo-100 animate-ping opacity-20"></div>
                </div>
              )}
              <button
                onClick={isActive ? stopAssistant : startAssistant}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 z-10 relative ${
                  isActive ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                <i className={`fas ${isActive ? 'fa-stop' : 'fa-microphone'}`}></i>
              </button>
           </div>
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
             {isActive ? 'Click to Stop Session' : 'Start Asthma Consultation'}
           </p>
        </div>

        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full blur-[120px] opacity-40"></div>
      </div>
    </div>
  );
};

export default LiveAssistant;
