import React, { useState } from "react";
import { FiSave, FiTrash2 } from "react-icons/fi";

function DailyLog() {
  const [date, setDate] = useState("");
  const [attacks, setAttacks] = useState("");
  const [steps, setSteps] = useState("");
  const [meds, setMeds] = useState("");
  const [logs, setLogs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || attacks === "" || steps === "" || meds === "") {
      alert("Please fill all fields");
      return;
    }
    const newLog = { id: Date.now(), date, attacks, steps, meds };
    setLogs([newLog, ...logs]);
    setDate("");
    setAttacks("");
    setSteps("");
    setMeds("");
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Daily Log</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Asthma Attacks</label>
          <input
            type="number"
            min="0"
            value={attacks}
            onChange={(e) => setAttacks(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of attacks"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Steps Taken</label>
          <input
            type="number"
            min="0"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of steps"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Medication Taken</label>
          <input
            type="number"
            min="0"
            value={meds}
            onChange={(e) => setMeds(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of doses"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          <FiSave /> Save Log
        </button>
      </form>

      {/* Log History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Date</th>
              <th className="py-3 px-4 text-left text-gray-700">Asthma Attacks</th>
              <th className="py-3 px-4 text-left text-gray-700">Steps</th>
              <th className="py-3 px-4 text-left text-gray-700">Medication</th>
              <th className="py-3 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No logs yet.
                </td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{log.date}</td>
                <td className="py-3 px-4">{log.attacks}</td>
                <td className="py-3 px-4">{log.steps}</td>
                <td className="py-3 px-4">{log.meds}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyLog;
