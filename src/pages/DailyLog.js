import React, { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

function DailyLog() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    wheezing: 0,
    coughing: 0,
    breathShortness: 0,
    peakFlow: "",
    medicationUsed: "",
    nightSymptoms: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateStatus = () => {
    const totalSymptoms =
      Number(formData.wheezing) +
      Number(formData.coughing) +
      Number(formData.breathShortness);

    if (totalSymptoms <= 2) return "Controlled";
    if (totalSymptoms <= 5) return "Warning";
    return "Critical";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const asthmaStatus = calculateStatus();
    setStatus(asthmaStatus);

    try {
      await fetch("http://localhost:8000/api/daily-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: asthmaStatus,
        }),
      });

      alert("Daily log saved successfully!");
    } catch (error) {
      alert("Error saving daily log");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          📝 Daily Asthma Log
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block font-medium">
              Wheezing (0-3)
            </label>
            <input
              type="number"
              min="0"
              max="3"
              name="wheezing"
              value={formData.wheezing}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Coughing (0-3)
            </label>
            <input
              type="number"
              min="0"
              max="3"
              name="coughing"
              value={formData.coughing}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Shortness of Breath (0-3)
            </label>
            <input
              type="number"
              min="0"
              max="3"
              name="breathShortness"
              value={formData.breathShortness}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Peak Flow */}
          <div>
            <label className="block font-medium">
              Peak Flow (L/min)
            </label>
            <input
              type="number"
              name="peakFlow"
              value={formData.peakFlow}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="Enter peak flow value"
            />
          </div>

          {/* Medication */}
          <div>
            <label className="block font-medium">
              Medication Used Today
            </label>
            <input
              type="text"
              name="medicationUsed"
              value={formData.medicationUsed}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g. Salbutamol 2 puffs"
            />
          </div>

          {/* Night Symptoms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="nightSymptoms"
              checked={formData.nightSymptoms}
              onChange={handleChange}
            />
            <label>Had night symptoms?</label>
          </div>

          {/* Status Display */}
          {status && (
            <div className={`p-3 rounded-lg text-white ${
              status === "Controlled"
                ? "bg-green-500"
                : status === "Warning"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}>
              <AlertCircle className="inline mr-2" />
              Asthma Status: {status}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 transition"
          >
            <Save size={18} />
            Save Daily Log
          </button>
        </form>
      </div>
    </div>
  );
}

export default DailyLog;
