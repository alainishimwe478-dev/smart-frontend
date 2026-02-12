import React, { useEffect, useState } from "react";

function DailyLogs({ patient }) {
  // Dummy data
  const [logs, setLogs] = useState([
    { id: 1, date: "2026-02-01T08:00", note: "Mild wheezing at night." },
    { id: 2, date: "2026-02-03T14:00", note: "Prescribed inhaler dosage increased." },
    { id: 3, date: "2026-02-05T10:00", note: "Patient reported shortness of breath after exercise." },
  ]);
  const [note, setNote] = useState("");

  const handleAdd = async () => {
    if (!note.trim()) return;
    const newLog = {
      id: logs.length + 1,
      date: new Date().toISOString(),
      note: note,
    };
    setLogs([...logs, newLog]);
    setNote("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daily Logs - {patient?.name}</h1>

      <div className="mb-4 flex gap-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add new log..."
          className="flex-1 p-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {logs.map((l) => (
          <div key={l.id} className="bg-white p-3 rounded-xl shadow">
            <p className="text-gray-500 text-sm">{new Date(l.date).toLocaleString()}</p>
            <p className="text-gray-800">{l.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyLogs;
