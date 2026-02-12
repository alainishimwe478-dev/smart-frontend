import React, { useState } from "react";
// import { getAlerts, addAlert } from "../../services/doctorService";

function Alerts({ patient }) {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning", message: "Patient reported increased wheezing.", date: "2026-02-01T08:00" },
    { id: 2, type: "critical", message: "Oxygen saturation dropped below 90%.", date: "2026-02-02T14:00" },
    { id: 3, type: "info", message: "Medication reminder: Take inhaler twice daily.", date: "2026-02-03T10:00" },
  ]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const handleAdd = () => {
    if (!message) return;
    const newAlert = {
      id: Date.now(),
      type,
      message,
      date: new Date().toISOString(),
    };
    setAlerts([newAlert, ...alerts]);
    setMessage("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Alerts - {patient?.name}</h1>

      <div className="mb-4 flex gap-2">
        <select value={type} onChange={e => setType(e.target.value)} className="p-2 border rounded shadow focus:ring-2 focus:ring-blue-500">
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
        <input placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} className="p-2 border rounded shadow flex-1 focus:ring-2 focus:ring-blue-500"/>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition">Add</button>
      </div>

      <div className="space-y-2">
        {alerts.map(a => (
          <div key={a.id} className="bg-white p-3 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                a.type === 'critical' ? 'bg-red-100 text-red-800' :
                a.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {a.type.toUpperCase()}
              </span>
              <span className="text-gray-500 text-sm">{new Date(a.date).toLocaleString()}</span>
            </div>
            <p className="text-gray-800 mt-2">{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
