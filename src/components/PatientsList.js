import React, { useState, useEffect, useMemo } from "react";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Dummy patient data
    setPatients([
      { id: 1, name: "John Doe", risk: "High", heart_rate: 110, oxygen: 91 },
      { id: 2, name: "Jane Smith", risk: "Moderate", heart_rate: 98, oxygen: 95 },
      { id: 3, name: "Mark Lee", risk: "Low", heart_rate: 80, oxygen: 98 },
      { id: 4, name: "Alice Johnson", risk: "Moderate", heart_rate: 102, oxygen: 92 },
      { id: 5, name: "Robert Brown", risk: "High", heart_rate: 115, oxygen: 88 },
    ]);
  }, []);

  const filteredPatients = useMemo(() => {
    let filtered = patients.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    return filtered;
  }, [patients, searchQuery, sortOrder]);

  // Helper to get gradient per risk level
  const riskGradient = (risk) => {
    switch (risk) {
      case "High":
        return "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 animate-pulse";
      case "Moderate":
        return "bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600";
      case "Low":
        return "bg-gradient-to-r from-green-300 to-green-500 hover:from-green-400 hover:to-green-600";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Patients</h2>

      {/* Search and sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {/* Patients grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPatients.map((p) => (
          <div
            key={p.id}
            className={`p-5 rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 text-white ${riskGradient(
              p.risk
            )}`}
          >
            <p className="text-lg font-bold">{p.name}</p>
            <p className="text-sm mt-2">
              ❤️ Heart Rate: <span className="font-semibold">{p.heart_rate} bpm</span>
            </p>
            <p className="text-sm">
              🫁 Oxygen: <span className="font-semibold">{p.oxygen}%</span>
            </p>
            <span
              className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                p.risk === "High"
                  ? "bg-red-200 text-red-800"
                  : p.risk === "Moderate"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              Risk: {p.risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientsList;
