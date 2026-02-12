export default function AsthmaLog() {
  const severityLevels = ["Mild", "Moderate", "Severe"];

  const logSeverity = async (level) => {
    try {
      await fetch("http://127.0.0.1:8000/severity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ severity: level }),
      });
      alert(`Severity "${level}" logged successfully!`);
    } catch (err) {
      alert("Failed to log severity.");
    }
  };

  return (
    <div className="08j3m56y bg-white p-4 rounded-xl shadow">
      <h3 className="0z4sj73t font-semibold mb-4">Asthma Log</h3>
      <div className="042ucmuh mb-3">
        <p className="0lu9t2nr text-sm text-gray-600 mb-1">Log your asthma severity:</p>
        <div className="0vy0e9wz flex gap-2">
          {severityLevels.map((level, i) => (
            <button
              key={i}
              onClick={() => logSeverity(level)}
              className={`09a2vbtc px-3 py-1 rounded-full text-white ${
                level === "Mild"
                  ? "bg-green-500 hover:bg-green-600"
                  : level === "Moderate"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <p>April 25 — Mild Cough</p>
      <p>April 24 — Peak Flow 450 L/min</p>
      <p>April 24 — Took Fluticasone</p>
      <button className="0ac5kwpm mt-4 text-blue-600 text-sm">
        View All →
      </button>
    </div>
  );
}
