import React, { useState } from 'react';

const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'emmanuel@shield.rw',
    phone: '+250 788 123 456',
    location: user.location,
    emergencyContact: '+250 788 999 888'
  });
  const [profileImage, setProfileImage] = useState('https://ui-avatars.com/api/?name=' + user.name + '&background=4f46e5&color=fff&size=200');
  const fileInputRef = React.useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="animate-fadeIn pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 font-outfit mb-2">Profile & Settings</h2>
        <p className="text-slate-500 font-medium">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-8 mb-10 pb-8 border-b border-slate-100">
              <div className="relative group">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-indigo-100 shadow-xl"
                />
                <button
                  onClick={triggerFileInput}
                  className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="fas fa-camera text-white text-2xl"></i>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{formData.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{formData.email}</p>
                <button 
                  onClick={triggerFileInput}
                  className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-100 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-upload"></i>
                  Change Photo
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-8">Personal Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-widest">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-bold"
                />
              </div>

              <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Environmental Alerts', desc: 'Get notified about air quality and triggers' },
                { label: 'Medication Reminders', desc: 'Daily reminders for your medication schedule' },
                { label: 'Doctor Appointments', desc: 'Upcoming consultation notifications' },
                { label: 'Health Tips', desc: 'Weekly asthma management tips' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50">
                  <div>
                    <p className="font-black text-slate-900 text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-3xl mb-6">
              <i className="fas fa-shield-heart"></i>
            </div>
            <h3 className="text-2xl font-black mb-4">Health Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-100">Risk Level</span>
                <span className="text-sm font-black">{user.riskLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-100">Adherence</span>
                <span className="text-sm font-black">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-100">Last Check-up</span>
                <span className="text-sm font-black">2 weeks ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all text-left px-6">
                <i className="fas fa-key mr-3"></i>
                Change Password
              </button>
              <button className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all text-left px-6">
                <i className="fas fa-download mr-3"></i>
                Download Health Data
              </button>
              <button className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-100 transition-all text-left px-6">
                <i className="fas fa-trash mr-3"></i>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
