import React, { useState } from "react";
import { FiPlus, FiCheck, FiTrash2 } from "react-icons/fi";

function Medication() {
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [medications, setMedications] = useState([]);

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!medName || !dosage) {
      alert("Please enter medication name and dosage");
      return;
    }
    const newMed = {
      id: Date.now(),
      name: medName,
      dosage,
      taken: false,
    };
    setMedications([newMed, ...medications]);
    setMedName("");
    setDosage("");
  };

  const toggleTaken = (id) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const handleDelete = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Medication Tracker</h2>

      {/* Add Medication Form */}
      <form
        onSubmit={handleAddMedication}
        className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Medication Name</label>
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="e.g., Inhaler"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Dosage</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g., 2 puffs"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          <FiPlus /> Add Medication
        </button>
      </form>

      {/* Medication List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Medication</th>
              <th className="py-3 px-4 text-left text-gray-700">Dosage</th>
              <th className="py-3 px-4 text-left text-gray-700">Taken</th>
              <th className="py-3 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {medications.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No medications added.
                </td>
              </tr>
            )}
            {medications.map((med) => (
              <tr key={med.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{med.name}</td>
                <td className="py-3 px-4">{med.dosage}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleTaken(med.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      med.taken
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiCheck /> {med.taken ? "Yes" : "No"}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(med.id)}
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

export default Medication;
