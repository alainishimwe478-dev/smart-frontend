export const getClinicalInsight = async (patientData) => {
  try {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
    
    if (!apiKey) {
      return "API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.";
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Act as a senior Pulmonologist. Analyze this patient data: ${JSON.stringify(patientData)}. 
Provide a concise clinical summary (max 100 words), potential triggers based on Rwanda's high pollen season, and a recommended action plan. 
Format as a professional medical report.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 500,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "Unable to generate clinical insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate clinical insights at this time.";
  }
};
