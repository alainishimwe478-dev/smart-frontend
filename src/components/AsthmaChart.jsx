import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Apr 24", flow: 350 },
  { day: "Apr 25", flow: 380 },
  { day: "Apr 26", flow: 370 },
  { day: "Apr 27", flow: 400 },
  { day: "Apr 28", flow: 420 },
  { day: "Apr 29", flow: 440 },
  { day: "Apr 30", flow: 450 },
];

export default function AsthmaChart() {
  return (
    <div className="0s5sm10f bg-white p-4 rounded-xl shadow">
      <h3 className="0642wxyk font-semibold mb-4">Asthma Stats</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="flow" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
      <p className="0omzmfs6 text-sm text-gray-500 mt-2">
        Avg Peak Flow: <b>435 L/min</b>
      </p>
    </div>
  );
}
