function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
            <input type="checkbox" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SMS Alerts</label>
            <input type="checkbox" className="mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Auto Logout Time</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
