import React, { useState } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2023-10-05", time: "10:00 AM", type: "Follow-up", status: "confirmed" },
    { id: 2, patient: "Jane Smith", date: "2023-10-07", time: "2:00 PM", type: "Consultation", status: "on_the_way" },
    { id: 3, patient: "Bob Johnson", date: "2023-10-10", time: "11:00 AM", type: "Emergency", status: "arrived" },
  ]);

  const updateStatus = (id, newStatus) => {
    // Mock API call
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: newStatus } : appt));
    // In real app, call API: await fetch(`/api/appointments/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
  };

  const getNextAction = (status) => {
    switch (status) {
      case 'confirmed': return { label: 'On the Way', nextStatus: 'on_the_way' };
      case 'on_the_way': return { label: 'Arrived', nextStatus: 'arrived' };
      case 'arrived': return { label: 'Start Service', nextStatus: 'in_progress' };
      case 'in_progress': return { label: 'Complete', nextStatus: 'provider_completed' };
      default: return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Patient</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const nextAction = getNextAction(appointment.status);
              return (
                <tr key={appointment.id} className="border-b">
                  <td className="py-2">{appointment.patient}</td>
                  <td className="py-2">{appointment.date}</td>
                  <td className="py-2">{appointment.time}</td>
                  <td className="py-2">{appointment.type}</td>
                  <td className="py-2 capitalize">{appointment.status.replace('_', ' ')}</td>
                  <td className="py-2">
                    {nextAction && (
                      <button
                        onClick={() => updateStatus(appointment.id, nextAction.nextStatus)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      >
                        {nextAction.label}
                      </button>
                    )}
                    <button className="text-blue-600 hover:underline mr-4">Reschedule</button>
                    <button className="text-red-600 hover:underline">Cancel</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
