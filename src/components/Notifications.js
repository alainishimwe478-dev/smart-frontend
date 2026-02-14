import React, { useState } from 'react';

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, type: 'critical', icon: 'fa-triangle-exclamation', title: 'High Risk Area Alert', message: 'Avoid Nyarugenge district today. Humidity at 88% with high pollen count. Risk level: 85%. Stay indoors if possible.', location: 'Nyarugenge', time: '5 min ago', read: false },
    { id: 2, type: 'critical', icon: 'fa-location-dot', title: 'Danger Zone Warning', message: 'Rubavu area has critical air quality (AQI: 78). Wood smoke and mountain moisture detected. Do not visit this area today.', location: 'Rubavu', time: '15 min ago', read: false },
    { id: 3, type: 'warning', icon: 'fa-wind', title: 'Moderate Risk Location', message: 'Kicukiro district showing elevated pollen levels (62% risk). Limit outdoor activities and carry your rescue inhaler.', location: 'Kicukiro', time: '1 hour ago', read: false },
    { id: 4, type: 'info', icon: 'fa-pills', title: 'Medication Reminder', message: 'Time to take your evening dose of Montelukast Sodium.', time: '2 hours ago', read: true },
    { id: 5, type: 'success', icon: 'fa-check-circle', title: 'Safe Zone Update', message: 'Gasabo and Musanze districts are safe today with low risk levels (38-45%). Good air quality for outdoor activities.', location: 'Gasabo, Musanze', time: '3 hours ago', read: true },
    { id: 6, type: 'warning', icon: 'fa-map-marked-alt', title: 'Route Advisory', message: 'Your usual route through Nyarugenge has high humidity. Consider alternative path through Gasabo district instead.', location: 'Route Alert', time: '4 hours ago', read: true },
    { id: 7, type: 'info', icon: 'fa-user-doctor', title: 'Doctor Appointment', message: 'Dr. Jeanne d\'Arc is available for consultation tomorrow at 2 PM at CHUK Hospital.', time: '1 day ago', read: true }
  ]);

  const getTypeStyles = (type) => {
    switch(type) {
      case 'critical': return 'bg-rose-50 border-rose-200 text-rose-600';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-600';
      case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-600';
      default: return 'bg-indigo-50 border-indigo-200 text-indigo-600';
    }
  };

  return (
    <div className="animate-fadeIn pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 font-outfit mb-2">Notifications</h2>
        <p className="text-slate-500 font-medium">Stay updated with your asthma management alerts</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className={`bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-all ${!notif.read ? 'ring-2 ring-indigo-100' : ''}`}
          >
            <div className="flex items-start gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 ${getTypeStyles(notif.type)}`}>
                <i className={`fas ${notif.icon}`}></i>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-slate-900">{notif.title}</h4>
                    {notif.location && (
                      <div className="flex items-center gap-2 mt-1">
                        <i className="fas fa-map-marker-alt text-xs text-rose-500"></i>
                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{notif.location}</span>
                      </div>
                    )}
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{notif.message}</p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{notif.time}</span>
                  {!notif.read && (
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-colors">
          Load More Notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
