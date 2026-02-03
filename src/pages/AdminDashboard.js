import { useEffect, useState } from "react";
import { getAllUsers, addUser, addDoctor, addPatient, assignPatient } from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "user" });
  const [newDoctor, setNewDoctor] = useState({ email: "", password: "", name: "" });
  const [newPatient, setNewPatient] = useState({ email: "", password: "", name: "" });
  const [assignment, setAssignment] = useState({ patient_email: "", doctor_email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      alert("User added");
      setNewUser({ email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) {
      alert("Failed to add user");
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await addDoctor(newDoctor);
      alert("Doctor added");
      setNewDoctor({ email: "", password: "", name: "" });
      loadUsers();
    } catch (err) {
      alert("Failed to add doctor");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await addPatient(newPatient);
      alert("Patient added");
      setNewPatient({ email: "", password: "", name: "" });
      loadUsers();
    } catch (err) {
      alert("Failed to add patient");
    }
  };

  const handleAssignPatient = async (e) => {
    e.preventDefault();
    try {
      await assignPatient(assignment);
      alert("Patient assigned");
      setAssignment({ patient_email: "", doctor_email: "" });
    } catch (err) {
      alert("Failed to assign patient");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {/* Users List */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index} className="border-b py-2">
                {user.email} - {user.role}
              </li>
            ))}
          </ul>
        </div>

        {/* Add User */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add User
            </button>
          </form>
        </div>

        {/* Add Doctor */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
          <form onSubmit={handleAddDoctor} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newDoctor.password}
              onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Doctor
            </button>
          </form>
        </div>

        {/* Add Patient */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add Patient</h2>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newPatient.password}
              onChange={(e) => setNewPatient({ ...newPatient, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Patient
            </button>
          </form>
        </div>

        {/* Assign Patient */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Assign Patient to Doctor</h2>
          <form onSubmit={handleAssignPatient} className="space-y-4">
            <input
              type="email"
              placeholder="Patient Email"
              value={assignment.patient_email}
              onChange={(e) => setAssignment({ ...assignment, patient_email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Doctor Email"
              value={assignment.doctor_email}
              onChange={(e) => setAssignment({ ...assignment, doctor_email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Assign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
