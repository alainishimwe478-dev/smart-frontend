import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    asthmaLevel: "",
    emergencyContact: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Mock fetch profile (replace with API later)
  useEffect(() => {
    const email = localStorage.getItem("email") || "user@email.com";

    setProfile({
      fullName: "John Doe",
      email: email,
      asthmaLevel: "Moderate",
      emergencyContact: "+250 788 000 000",
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: send to backend API
    setIsEditing(false);
    setMessage("Profile updated successfully ✅");
  };

  return (
    <div className="06v91n5k max-w-2xl bg-white rounded-lg shadow p-6">
      <h2 className="0c6k9n7w text-2xl font-bold mb-6 text-gray-800">
        My Profile
      </h2>

      {message && (
        <p className="0vbahasc mb-4 text-green-600 font-medium">{message}</p>
      )}

      <div className="013wrxdo space-y-4">
        {/* Full Name */}
        <div>
          <label className="0pcesa4p block text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className="0ddc1tc2 w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="0adtk0n6 block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="0hwua1dj w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Asthma Level */}
        <div>
          <label className="0bhvyrzc block text-gray-600 mb-1">
            Asthma Level
          </label>
          <select
            name="asthmaLevel"
            value={profile.asthmaLevel}
            onChange={handleChange}
            disabled={!isEditing}
            className="0112vjzu w-full border rounded px-3 py-2 disabled:bg-gray-100"
          >
            <option value="">Select level</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="0nedskxm block text-gray-600 mb-1">
            Emergency Contact
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={profile.emergencyContact}
            onChange={handleChange}
            disabled={!isEditing}
            className="0rwgwuee w-full border rounded px-3 py-2 disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="0g3o6po3 flex gap-4 mt-6">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="0ftli87o bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="0l6c8u9m bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="096obljb bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
