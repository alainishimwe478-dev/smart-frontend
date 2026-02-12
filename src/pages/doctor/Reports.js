function Reports() {
  const reports = [
    { id: 1, title: "Monthly Patient Summary", date: "2023-10-01", type: "Summary" },
    { id: 2, title: "Asthma Control Trends", date: "2023-09-28", type: "Analytics" },
    { id: 3, title: "Medication Adherence Report", date: "2023-09-25", type: "Compliance" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="py-2">{report.title}</td>
                <td className="py-2">{report.date}</td>
                <td className="py-2">{report.type}</td>
                <td className="py-2">
                  <button className="text-blue-600 hover:underline mr-4">View</button>
                  <button className="text-green-600 hover:underline">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
