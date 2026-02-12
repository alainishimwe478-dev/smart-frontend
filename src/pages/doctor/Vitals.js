import React, { useState } from "react";

function Vitals({ patient }) {
  // Dummy data
  const [vitals, setVitals] = useState([
    { id: 1, heart_rate: 110, oxygen: 91, date: "2026-02-01T08:00" },
    { id: 2, heart_rate: 98, oxygen: 95, date: "2026-02-02T08:00" },
    { id: 3, heart_rate: 105, oxygen: 93, date: "2026-02-03T08:00" },
  ]);
  const [heartRate, setHeartRate] = useState("");
  const [oxygen, setOxygen] = useState("");

  const handleAdd = async () => {
    if (!heartRate || !oxygen) return;
    const newVital = {
      id: vitals.length + 1,
      heart_rate: Number(heartRate),
      oxygen: Number(oxygen),
      date: new Date().toISOString(),
    };
    setVitals([...vitals, newVital]);
    setHeartRate(""); setOxygen("");
  };

  return (
    <div>
      <h1>Vitals for {patient?.name}</h1>
      <div className="mb-4">
        <input
          placeholder="Heart Rate"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          placeholder="Oxygen"
          value={oxygen}
          onChange={(e) => setOxygen(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleAdd} className="bg-green-600 text-white py-2 px-4 rounded">
          Add Vitals
        </button>
      </div>

      <ul>
        {vitals.map((v) => (
          <li key={v.id}>
            Date: {new Date(v.date).toLocaleString()} — HR: {v.heart_rate}, O₂: {v.oxygen}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vitals;
