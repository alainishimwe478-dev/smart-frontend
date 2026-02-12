import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Prescriptions() {
  const { patient } = useOutletContext();
  // Dummy data
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medicine: "Inhaler", dose: "2 puffs", frequency: "Twice daily" },
    { id: 2, medicine: "Antihistamine", dose: "10mg", frequency: "Once daily" },
    { id: 3, medicine: "Corticosteroid", dose: "5mg", frequency: "Once daily" },
  ]);
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleAdd = async () => {
    if (!medicine || !dose || !frequency) return;
    const newPrescription = {
      id: prescriptions.length + 1,
      medicine,
      dose,
      frequency,
    };
    setPrescriptions([...prescriptions, newPrescription]);
    setMedicine(""); setDose(""); setFrequency("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Prescriptions - {patient?.name}</h1>

      <div className="mb-4 flex gap-2">
        <input placeholder="Medicine" value={medicine} onChange={e => setMedicine(e.target.value)} className="p-2 border rounded shadow w-32 focus:ring-2 focus:ring-blue-500"/>
        <input placeholder="Dose" value={dose} onChange={e => setDose(e.target.value)} className="p-2 border rounded shadow w-24 focus:ring-2 focus:ring-blue-500"/>
        <input placeholder="Frequency" value={frequency} onChange={e => setFrequency(e.target.value)} className="p-2 border rounded shadow w-24 focus:ring-2 focus:ring-blue-500"/>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition">Add</button>
      </div>

      <div className="space-y-2">
        {prescriptions.map(p => (
          <div key={p.id} className="bg-white p-3 rounded-xl shadow flex justify-between">
            <span>{p.medicine}</span>
            <span>{p.dose}</span>
            <span>{p.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prescriptions;
