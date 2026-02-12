import React, { useState } from "react";
// import { getPatients } from "../../services/doctorService";

function MyPatients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", risk_level: "High" },
    { id: 2, name: "Jane Smith", risk_level: "Medium" },
    { id: 3, name: "Bob Johnson", risk_level: "Low" },
    { id: 4, name: "Alice Brown", risk_level: "High" },
  ]);

  return (
    <div>
      <h1>All Patients</h1>
      <ul>
        {patients.map(p => (
          <li key={p.id}>{p.name} — Risk: {p.risk_level}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyPatients;
