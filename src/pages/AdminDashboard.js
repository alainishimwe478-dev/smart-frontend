import { useEffect, useState } from "react";
import { FaUsers, FaUserMd, FaUserInjured, FaSearch, FaEye, FaPlus, FaUserCheck, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { getAllUsers, addUser, addDoctor, addPatient, assignPatient, updateUser, deleteUser } from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "user" });
  const [newDoctor, setNewDoctor] = useState({ email: "", password: "", name: "" });
  const [newPatient, setNewPatient] = useState({ email: "", password: "", name: "" });
  const [assignment, setAssignment] = useState({ patient_email: "", doctor_email: "" });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, user: null });
  const [editForm, setEditForm] = useState({ email: "", role: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

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

  // Edit user (opens modal)
  const handleEditUser = (user) => {
    setModal({ isOpen: true, user });
    setEditForm({ email: user.email, role: user.role });
  };

  // Close modal
  const closeModal = () => {
    setModal({ isOpen: false, user: null });
    setEditForm({ email: "", role: "" });
  };

  // Submit edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ oldEmail: modal.user.email, email: editForm.email, role: editForm.role });
      alert("User updated");
      loadUsers();
      closeModal();
    } catch (err) {
      alert("Failed to update user");
    }
  };

  // Delete user
  const handleDeleteUser = (email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) return;

    deleteUser(email)
      .then(() => {
        alert("User deleted");
        loadUsers();
      })
      .catch(() => alert("Failed to delete user"));
  };

  const totalUsers = users.length;
  const totalDoctors = users.filter(user => user.role === 'doctor').length;
  const totalPatients = users.filter(user => user.role === 'user').length;

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Users</h3>
                <p className="text-3xl font-bold text-white mt-2">{totalUsers}</p>
              </div>
              <FaUsers className="text-4xl text-white opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Doctors</h3>
                <p className="text-3xl font-bold text-white mt-2">{totalDoctors}</p>
              </div>
              <FaUserMd className="text-4xl text-white opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Patients</h3>
                <p className="text-3xl font-bold text-white mt-2">{totalPatients}</p>
              </div>
              <FaUserInjured className="text-4xl text-white opacity-80" />
        </div>
      </div>

{/* Edit User Modal */}
{modal.isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
      >
        <FaTimes />
      </button>

      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleEditSubmit} className="space-y-4">
        <input
          type="email"
          value={editForm.email}
          onChange={(e) =>
            setEditForm({ ...editForm, email: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={editForm.role}
          onChange={(e) =>
            setEditForm({ ...editForm, role: e.target.value })
          }
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Update User
        </button>
      </form>
    </div>
  </div>
)}
    </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b">
            <nav className="flex flex-wrap">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaUsers className="text-xs" />
                <span className="hidden sm:inline">All Users</span>
                <span className="sm:hidden">Users</span>
              </button>
              <button
                onClick={() => setActiveTab("addUser")}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "addUser"
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaPlus className="text-xs" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">User</span>
              </button>
              <button
                onClick={() => setActiveTab("addDoctor")}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "addDoctor"
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaUserMd className="text-xs" />
                <span className="hidden sm:inline">Add Doctor</span>
                <span className="sm:hidden">Doctor</span>
              </button>
              <button
                onClick={() => setActiveTab("addPatient")}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "addPatient"
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaUserInjured className="text-xs" />
                <span className="hidden sm:inline">Add Patient</span>
                <span className="sm:hidden">Patient</span>
              </button>
              <button
                onClick={() => setActiveTab("assign")}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === "assign"
                    ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaUserCheck className="text-xs" />
                <span className="hidden sm:inline">Assign Patient</span>
                <span className="sm:hidden">Assign</span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "users" && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by email or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <ul className="divide-y">
                  {filteredUsers.map((user, index) => {
                    let badgeColor = "bg-gray-300 text-gray-800"; // default user
                    if (user.role === "admin") badgeColor = "bg-blue-500 text-white";
                    else if (user.role === "doctor") badgeColor = "bg-green-500 text-white";
                    else if (user.role === "user") badgeColor = "bg-pink-500 text-white";

                    return (
                      <li
                        key={index}
                        className="py-2 flex justify-between items-center hover:bg-gray-50 px-2 rounded transition"
                      >
                        <span>{user.email}</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                          {/* Edit button */}
                          <button
                            onClick={() => handleEditUser(user)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm shadow"
                          >
                            <FaEdit className="inline mr-1" />
                            Edit
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
                          >
                            <FaTrash className="inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {activeTab === "addUser" && (
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                  Add User
                </button>
              </form>
            )}

            {activeTab === "addDoctor" && (
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                  Add Doctor
                </button>
              </form>
            )}

            {activeTab === "addPatient" && (
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                  Add Patient
                </button>
              </form>
            )}

            {activeTab === "assign" && (
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                  Assign
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
