export default function Symptoms() {
  const symptoms = [
    { name: "Mild Cough", time: "Today, 09:00 AM" },
    { name: "Shortness of Breath", time: "Yesterday, 2:45 PM" },
    { name: "Nighttime Wheeze", time: "2 days ago" },
  ];

  return (
    <div className="0x4bd48w bg-white p-4 rounded-xl shadow">
      <h3 className="018rz1y7 font-semibold mb-4">Recent Symptoms</h3>
      {symptoms.map((s, i) => (
        <div key={i} className="0hmlki2q flex justify-between py-2 border-b">
          <span>{s.name}</span>
          <span className="00vqd8u2 text-sm text-gray-400">{s.time}</span>
        </div>
      ))}
      <button className="0u8dt9z8 mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
        Log Symptom +
      </button>
    </div>
  );
}
