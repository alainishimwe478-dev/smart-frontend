export const mockPatients = [
  { id: 'P001', name: 'Jean Uwimana', age: 34, status: 'Critical', oxygenLevel: 88, inhalerUsage: 8, location: 'Nyarugenge' },
  { id: 'P002', name: 'Marie Mukamana', age: 28, status: 'Warning', oxygenLevel: 92, inhalerUsage: 5, location: 'Kicukiro' },
  { id: 'P003', name: 'Patrick Nkusi', age: 45, status: 'Stable', oxygenLevel: 97, inhalerUsage: 2, location: 'Gasabo' },
  { id: 'P004', name: 'Grace Umutoni', age: 52, status: 'Warning', oxygenLevel: 91, inhalerUsage: 6, location: 'Musanze' },
  { id: 'P005', name: 'David Habimana', age: 39, status: 'Stable', oxygenLevel: 96, inhalerUsage: 3, location: 'Rubavu' },
  { id: 'P006', name: 'Sarah Ingabire', age: 31, status: 'Critical', oxygenLevel: 86, inhalerUsage: 9, location: 'Nyarugenge' },
];

export const mockAppointments = [
  { id: 'A001', patientName: 'Jean Uwimana', patientId: 'P001', date: '2024-01-15', time: '09:00', type: 'Follow-up', status: 'Confirmed' },
  { id: 'A002', patientName: 'Marie Mukamana', patientId: 'P002', date: '2024-01-15', time: '10:30', type: 'Emergency', status: 'Pending' },
  { id: 'A003', patientName: 'Patrick Nkusi', patientId: 'P003', date: '2024-01-16', time: '14:00', type: 'Routine', status: 'Confirmed' },
  { id: 'A004', patientName: 'Grace Umutoni', patientId: 'P004', date: '2024-01-17', time: '11:00', type: 'Follow-up', status: 'Cancelled' },
];

export const mockLabResults = [
  { id: 'L001', patientName: 'Jean Uwimana', patientId: 'P001', testType: 'Spirometry', date: '2024-01-10', result: 'Abnormal', fev1: '62%' },
  { id: 'L002', patientName: 'Marie Mukamana', patientId: 'P002', testType: 'Blood Test', date: '2024-01-12', result: 'Normal', fev1: 'N/A' },
  { id: 'L003', patientName: 'Patrick Nkusi', patientId: 'P003', testType: 'Spirometry', date: '2024-01-11', result: 'Normal', fev1: '88%' },
];
