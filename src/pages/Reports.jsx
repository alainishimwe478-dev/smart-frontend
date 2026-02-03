import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const weeklyData = [
  { day: "Mon", attacks: 1, meds: 2, steps: 5000, aqi: 2 },
  { day: "Tue", attacks: 0, meds: 3, steps: 6200, aqi: 1 },
  { day: "Wed", attacks: 2, meds: 1, steps: 4800, aqi: 4 },
  { day: "Thu", attacks: 1, meds: 3, steps: 7000, aqi: 3 },
  { day: "Fri", attacks: 0, meds: 3, steps: 8000, aqi: 1 },
  { day: "Sat", attacks: 1, meds: 2, steps: 7500, aqi: 2 },
  { day: "Sun", attacks: 0, meds: 3, steps: 6000, aqi: 1 },
];

function Reports() {
  const [riskLevel, setRiskLevel] = useState("");
  const [riskMessage, setRiskMessage] = useState("");

  useEffect(() => {
    calculateRisk();
  }, []);

  const calculateRisk = () => {
    const totalAttacks = weeklyData.reduce((a, b) => a + b.attacks, 0);
    const avgMeds =
      weeklyData.reduce((a, b) => a + b.meds, 0) / weeklyData.length;
    const avgSteps =
      weeklyData.reduce((a, b) => a + b.steps, 0) / weeklyData.length;
    const avgAQI =
      weeklyData.reduce((a, b) => a + b.aqi, 0) / weeklyData.length;

    let score = 0;

    if (totalAttacks >= 4) score += 3;
    else if (totalAttacks >= 2) score += 2;

    if (avgMeds < 2) score += 2;
    if (avgSteps < 6000) score += 1;
    if (avgAQI >= 4) score += 3;
    else if (avgAQI >= 3) score += 2;

    if (score >= 6) {
      setRiskLevel("High Risk");
      setRiskMessage(
        "High probability of asthma flare-ups. Consult a doctor and avoid polluted areas.",
      );
    } else if (score >= 3) {
      setRiskLevel("Moderate Risk");
      setRiskMessage(
        "Moderate risk detected. Maintain medication and monitor air quality.",
      );
    } else {
      setRiskLevel("Low Risk");
      setRiskMessage(
        "Your asthma is well controlled. Keep following your routine.",
      );
    }
  };

  return (
    <div className="0lgw67jl p-4 sm:p-8 space-y-10">
      <h2 className="0a8bto1n text-2xl font-bold text-blue-700">
        Advanced Asthma Reports
      </h2>

      {/* AI Risk Prediction */}
      <div
        className={`0behvc78 rounded-xl p-6 shadow text-white ${
          riskLevel === "High Risk"
            ? "bg-red-600"
            : riskLevel === "Moderate Risk"
              ? "bg-yellow-500"
              : "bg-green-600"
        }`}
      >
        <h3 className="0erze7b8 text-xl font-semibold mb-2">
          AI Asthma Risk Prediction
        </h3>
        <p className="0qi2nzdl text-3xl font-bold">{riskLevel}</p>
        <p className="0yhpctg9 mt-2">{riskMessage}</p>
      </div>

      {/* Air Quality vs Asthma Attacks */}
      <div className="0fdv4ov3 bg-white rounded-xl shadow p-6">
        <h3 className="0kuvi4y9 font-semibold text-gray-700 mb-4">
          Air Quality vs Asthma Attacks
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#f97316"
              strokeWidth={3}
              name="Air Quality Index"
            />
            <Line
              type="monotone"
              dataKey="attacks"
              stroke="#ef4444"
              strokeWidth={3}
              name="Asthma Attacks"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Supporting Charts */}
      <div className="09fhptcj grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="0k16u2px bg-white rounded-xl shadow p-6">
          <h3 className="0pbtrtkq font-semibold mb-4">Medication Adherence</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="meds" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="0b94fmm1 bg-white rounded-xl shadow p-6">
          <h3 className="0w8erg5a font-semibold mb-4">
            Daily Activity (Steps)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Reports;
