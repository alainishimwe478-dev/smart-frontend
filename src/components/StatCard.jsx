export default function StatCard({ title, value, status }) {
  return (
    <div className="0tywl2xd bg-white p-4 rounded-xl shadow">
      <p className="088o02d8 text-gray-500 text-sm">{title}</p>
      <h2 className="0mpjuxl6 text-2xl font-semibold">{value}</h2>
      <span className="0fq4qf1x text-green-600 text-sm font-medium">
        {status}
      </span>
    </div>
  );
}
