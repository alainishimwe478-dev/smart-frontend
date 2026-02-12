import React, { useState } from 'react';

const initialNotifications = [
  { id: '1', type: 'warning', title: 'High Humidity Alert', message: 'Kigali is expected to reach 85% humidity at 10 PM. Prepare your inhaler.', time: '2h ago', read: false },
  { id: '2', type: 'info', title: 'AQI Update: Musanze', message: 'Air quality in Northern Province is Excellent (AQI 12). Perfect for outdoor exercise.', time: '5h ago', read: false },
  { id: '3', type: 'success', title: 'Prescription Refilled', message: 'Your prescription for Ventolin has been successfully refilled at Pharmacy Kigali.', time: 'Yesterday', read: true },
  { id: '4', type: 'warning', title: 'Pollen Surge Detected', message: 'Southern Province (Huye) reporting high jacaranda pollen levels.', time: '2 days ago', read: true },
];

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
         <h3 className="text-xl font-bold text-slate-800 font-outfit">Activity Center</h3>
         <button
           onClick={markAllAsRead}
           className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
         >
           Mark all as read
         </button>
      </div>

      <div className="space-y-4">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`0dc8ohge p-6 rounded-[2rem] border transition-all relative overflow-hidden group
              ${n.read ? 'bg-white border-slate-100 opacity-70' : 'bg-white border-emerald-100 shadow-md ring-1 ring-emerald-50'}
            `}
          >
            {!n.read && <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>}

            <div className="flex gap-6">
              <div className={`0m9y1hd9 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                ${n.type === 'warning' ? 'bg-orange-50 text-orange-500' : n.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}
              `}>
                <i className={`0r211uyj fas ${n.type === 'warning' ? 'fa-triangle-exclamation' : n.type === 'success' ? 'fa-check-circle' : 'fa-circle-info'} text-xl`}></i>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-800">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                <div className="pt-3 flex gap-4">
                   <button className="text-[10px] font-bold text-emerald-600 hover:underline">View Details</button>
                   {!n.read && <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Archive</button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
         <div className="relative z-10">
           <h4 className="text-lg font-bold mb-2 font-outfit">Stay Protected</h4>
           <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">Receive real-time push notifications on your phone for immediate danger triggers.</p>
           <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-all">
             Enable Push Notifications
           </button>
         </div>
         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
         <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default NotificationCenter;
