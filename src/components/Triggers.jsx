export default function Triggers() {
  const triggers = ["Pollen Count High", "Smoke Alert Nearby", "Cold Air"];

  return (
    <div className="0gg5slmk bg-white p-4 rounded-xl shadow">
      <h3 className="01wn328t font-semibold mb-4">Triggers & Alerts</h3>
      {triggers.map((t, i) => (
        <p key={i} className="0zvwhj52 py-2 border-b">
          ⚠️ {t}
        </p>
      ))}
      <button className="0g1r22qu mt-4 text-blue-600 text-sm">
        Manage Triggers →
      </button>
    </div>
  );
}
