import { apiRequest } from './api';

export const getVitals = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/vitals`);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    throw error;
  }
};

export const addVital = async (patientId, heartRate, oxygen) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/vitals`, {
      method: 'POST',
      body: JSON.stringify({
        heart_rate: heartRate,
        oxygen: oxygen,
      }),
    });
  } catch (error) {
    console.error('Error adding vital:', error);
    throw error;
  }
};

export const getPrescriptions = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/prescriptions`);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};

export const addPrescription = async (patientId, medicine, dose, frequency) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/prescriptions`, {
      method: "POST",
      body: JSON.stringify({
        medicine,
        dose,
        frequency,
      }),
    });
  } catch (error) {
    console.error('Error adding prescription:', error);
    throw error;
  }
};

export const getAlerts = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/alerts`);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const addAlert = async (patientId, type, message) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/alerts`, {
      method: "POST",
      body: JSON.stringify({
        type,
        message,
      }),
    });
  } catch (error) {
    console.error('Error adding alert:', error);
    throw error;
  }
};

export const getMessages = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/messages`);
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const addMessage = async (patientId, sender, text) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        sender,
        text,
      }),
    });
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

export const getAppointments = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/appointments`);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const addAppointment = async (patientId, date, reason) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/appointments`, {
      method: "POST",
      body: JSON.stringify({
        date,
        reason,
      }),
    });
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

export const getPatients = async () => {
  try {
    return await apiRequest('/doctor/patients');
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getDailyLogs = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/logs`);
  } catch (error) {
    console.error('Error fetching daily logs:', error);
    throw error;
  }
};

export const addDailyLog = async (patientId, symptoms, triggers, medication_taken) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/logs`, {
      method: "POST",
      body: JSON.stringify({
        symptoms,
        triggers,
        medication_taken,
      }),
    });
  } catch (error) {
    console.error('Error adding daily log:', error);
    throw error;
  }
};

export const getMedicalNotes = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/notes`);
  } catch (error) {
    console.error('Error fetching medical notes:', error);
    throw error;
  }
};

export const addMedicalNote = async (patientId, note) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/notes`, {
      method: "POST",
      body: JSON.stringify({
        note,
      }),
    });
  } catch (error) {
    console.error('Error adding medical note:', error);
    throw error;
  }
};

export const getReports = async (patientId) => {
  try {
    return await apiRequest(`/doctor/patients/${patientId}/reports`);
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
