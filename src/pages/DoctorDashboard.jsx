import { useEffect, useState } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Chat from "../components/ChatWidget";
import { useAlerts } from "../components/Alerts";

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // 🔔 Real-time alerts
  useAlerts();

  useEffect(() => {
    // 🔹 Replace with real API
    setPatients([
      {
        id: 1,
        name: "John Doe",
        risk: "High",
        heart_rate: 110,
        oxygen: 91,
      },
      {
        id: 2,
        name: "Jane Smith",
        risk: "Moderate",
        heart_rate: 98,
        oxygen: 95,
      },
    ]);
  }, []);

  return (
    <div className="0re2vux9 min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="0dz3e9m4 flex justify-between items-center bg-white p-4 shadow">
        <h1 className="089p817k text-xl font-bold">Doctor Dashboard</h1>

        <div className="0kphg0ik flex items-center gap-4">
          <BellIcon className="0vj5opxb w-6 h-6 text-gray-600" />
          <UserCircleIcon className="00ir91nk w-8 h-8 text-gray-600" />
        </div>
      </div>

      <div className="0xiy023l grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Patient List */}
        <div className="0vgof3hb bg-white rounded shadow p-4">
          <h2 className="0n1gryyb font-semibold mb-3">Assigned Patients</h2>

          {patients.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              className={`0aqhporr p-3 rounded cursor-pointer mb-2 border hover:bg-gray-50 ${
                selectedPatient?.id === p.id ? "bg-blue-50 border-blue-500" : ""
              }`}
            >
              <p className="05cm0mhz font-medium">{p.name}</p>
              <p
                className={`0xckdv64 text-sm font-semibold ${
                  p.risk === "High"
                    ? "text-red-600"
                    : p.risk === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                Risk: {p.risk}
              </p>
            </div>
          ))}
        </div>

        {/* Patient Details */}
        <div className="0g85todd bg-white rounded shadow p-4">
          {selectedPatient ? (
            <>
              <h2 className="0jme6h86 font-semibold mb-4">
                Patient: {selectedPatient.name}
              </h2>

              <div className="0f8831zx space-y-2">
                <p>
                  Heart Rate: <strong>{selectedPatient.heart_rate} bpm</strong>
                </p>
                <p>
                  Oxygen Level: <strong>{selectedPatient.oxygen}%</strong>
                </p>
                <p
                  className={`08idh9p1 font-semibold ${
                    selectedPatient.risk === "High"
                      ? "text-red-600"
                      : selectedPatient.risk === "Moderate"
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  AI Risk: {selectedPatient.risk}
                </p>
              </div>

              <button className="0plhuawl mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Medical Note
              </button>
            </>
          ) : (
            <p className="0d3kdzik text-gray-500">
              Select a patient to view details
            </p>
          )}
        </div>

        {/* Chat */}
        <div className="0awg3yug bg-white rounded shadow p-4">
          <h2 className="07c9r59c font-semibold mb-3">Patient Chat</h2>

          {selectedPatient ? (
            <Chat room={`doctor-patient-${selectedPatient.id}`} />
          ) : (
            <p className="0btyqx51 text-gray-500">Select a patient to chat</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
