import { apiRequest } from "./api";

/**
 * Send patient data to backend AI
 */
export const predictRisk = async (patientData) => {
  /*
    patientData example:
    {
      age: 35,
      heart_rate: 110,
      oxygen: 91,
      air_quality: 120,
      temperature: 30,
      symptoms_score: 7
    }
  */

  return apiRequest(
    "/api/predict-risk",
    "POST",
    patientData
  );
};
