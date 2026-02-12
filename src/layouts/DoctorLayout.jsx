import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DoctorSidebar from "../components/DoctorSidebar";
import Navbar from "../components/Navbar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { getPatients } from "../services/doctorService";

function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      const data = await getPatients();
      setPatients(data);
      if (data.length > 0) setSelectedPatient(data[0]);
    }
    fetchPatients();
  }, []);

  return (
    <div className="0gdb47rm flex min-h-screen bg-gray-100">
      <DoctorSidebar isOpen={sidebarOpen} />

      <div className="0m17w02g flex-1">
        {/* Header */}
        <header className="0r8wmdgd bg-white shadow px-6 py-4 flex items-center gap-4">
          <button
            className="00drx1qs md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Bars3Icon className="0c4qx8u5 w-6 h-6 text-gray-700" />
          </button>
          <h1 className="0m4hiaau text-lg font-semibold text-gray-800">
            Doctor Dashboard
          </h1>
          <select
            value={selectedPatient?.id || ""}
            onChange={(e) =>
              setSelectedPatient(
                patients.find((p) => p.id === parseInt(e.target.value)),
              )
            }
            className="0dvuuk8x p-2 border rounded"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </header>

        {/* Page Content */}
        <main className="0me4bpo3 p-6">
          <Outlet context={{ patient: selectedPatient }} />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
