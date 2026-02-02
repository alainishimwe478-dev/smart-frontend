import React from "react";
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
  { day: "Mon", attacks: 1, meds: 2, steps: 5000 },
  { day: "Tue", attacks: 0, meds: 3, steps: 6200 },
  { day: "Wed", attacks: 2, meds: 1, steps: 4800 },
  { day: "Thu", attacks: 1, meds: 3, steps: 7000 },
  { day: "Fri", attacks: 0, meds: 3, steps: 8000 },
  { day: "Sat", attacks: 1, meds: 2, steps: 7500 },
  { day: "Sun", attacks: 0, meds: 3, steps: 6000 },
];

function Reports() {
  return (
    <div className="0r2jzt51 p-4 sm:p-8 space-y-8">
      <h2 className="07hmp76s text-2xl font-bold text-blue-700">
        Asthma Health Reports
      </h2>

      {/* Summary Cards */}
      <div className="096ooj19 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="00h0xduy bg-white shadow rounded-xl p-5">
          <h3 className="0tx55jfm text-gray-600">Total Attacks</h3>
          <p className="0sgq52kt text-3xl font-bold text-red-600">
            {weeklyData.reduce((a, b) => a + b.attacks, 0)}
          </p>
        </div>

        <div className="0z20gkja bg-white shadow rounded-xl p-5">
          <h3 className="0l7wlk4k text-gray-600">Medication Taken</h3>
          <p className="0i3utc5a text-3xl font-bold text-green-600">
            {weeklyData.reduce((a, b) => a + b.meds, 0)}
          </p>
        </div>

        <div className="0stysfpf bg-white shadow rounded-xl p-5">
          <h3 className="06n1c6h5 text-gray-600">Avg Daily Steps</h3>
          <p className="06p9ekrl text-3xl font-bold text-blue-600">
            {Math.round(
              weeklyData.reduce((a, b) => a + b.steps, 0) / weeklyData.length,
            )}
          </p>
        </div>
      </div>

      {/* Asthma Attacks Line Chart */}
      <div className="0peo0lfn bg-white shadow rounded-xl p-6">
        <h3 className="0aqs40cq font-semibold text-gray-700 mb-4">
          Weekly Asthma Attacks
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attacks"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Medication & Steps */}
      <div className="07ifuyaz grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="0z3xm8ut bg-white shadow rounded-xl p-6">
          <h3 className="0sued8br font-semibold text-gray-700 mb-4">
            Medication Usage
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="meds" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="02z2dkrk bg-white shadow rounded-xl p-6">
          <h3 className="0cnt9m5r font-semibold text-gray-700 mb-4">
            Daily Activity (Steps)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
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
