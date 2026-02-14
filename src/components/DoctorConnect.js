import React, { useState, useRef, useEffect } from 'react';

const DoctorConnect = () => {
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setInCall(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Please allow camera and microphone access to start video call');
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  return (
    <div className="animate-fadeIn pb-20">
      {!inCall ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 font-outfit mb-8">Clinical Specialists</h2>
            <div className="space-y-6">
              {[
                { name: 'Dr. Jeanne d\'Arc', role: 'Pulmonologist', hospital: 'CHUK', img: '15' },
                { name: 'Dr. Karasira Eric', role: 'General Practitioner', hospital: 'King Faisal', img: '22' },
                { name: 'Dr. Mutoni Alice', role: 'Respiratory Therapist', hospital: 'Military Hospital', img: '45' }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-8 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                   <div className="flex items-center gap-8">
                      <img src={`https://picsum.photos/100/100?random=${doc.img}`} className="w-20 h-20 rounded-[2rem] object-cover shadow-xl" alt={doc.name} />
                      <div>
                         <h4 className="text-xl font-black text-slate-900">{doc.name}</h4>
                         <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{doc.role} • {doc.hospital}</p>
                      </div>
                   </div>
                   <button
                     onClick={startCall}
                     className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                   >
                     Start Consultation
                   </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-12 rounded-[4rem] text-white flex flex-col">
             <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-3xl mb-8">
                <i className="fas fa-video"></i>
             </div>
             <h3 className="text-3xl font-black font-outfit mb-6">Immediate Care</h3>
             <p className="text-indigo-100 leading-relaxed font-medium mb-12">
               Experiencing severe symptoms? Connect with our emergency on-call specialist at CHUK immediately.
             </p>
             <button className="mt-auto w-full py-6 bg-white text-indigo-600 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-4">
                <i className="fas fa-phone"></i>
                Emergency Hotline
             </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-[4rem] overflow-hidden aspect-video relative group shadow-2xl">
           <video 
             ref={remoteVideoRef}
             autoPlay 
             playsInline
             className="w-full h-full object-cover"
           />
           <img src="https://picsum.photos/1280/720?random=15" className="w-full h-full object-cover opacity-60" alt="Doctor Video" />
           
           <div className="absolute top-10 left-10 flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                 <i className="fas fa-video"></i>
              </div>
              <div>
                 <p className="text-white font-black text-sm">Dr. Jeanne d'Arc</p>
                 <p className="text-[10px] text-indigo-400 font-bold uppercase">Connected • 04:22</p>
              </div>
           </div>

           <div className="absolute bottom-10 inset-x-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={toggleMute}
                className={`w-16 h-16 rounded-full backdrop-blur-md text-white border border-white/20 transition-all ${
                  isMuted ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                 <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>
              <button
                onClick={endCall}
                className="w-20 h-20 rounded-full bg-rose-500 text-white shadow-2xl shadow-rose-900/40 hover:bg-rose-600 transition-all"
              >
                 <i className="fas fa-phone-slash text-xl"></i>
              </button>
              <button 
                onClick={toggleVideo}
                className={`w-16 h-16 rounded-full backdrop-blur-md text-white border border-white/20 transition-all ${
                  isVideoOff ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                 <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
              </button>
           </div>

           <div className="absolute bottom-10 right-10 w-48 h-32 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800">
              <video 
                ref={localVideoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
              {isVideoOff && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <i className="fas fa-user text-4xl text-slate-600"></i>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20"></div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DoctorConnect;
