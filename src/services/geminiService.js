// Base64 encoding/decoding utilities
export const encode = (data) => btoa(String.fromCharCode(...new Uint8Array(data)));

export const decode = (data) => Uint8Array.from(atob(data), c => c.charCodeAt(0));

// Audio decoding utility
export const decodeAudioData = async (audioData, audioContext, sampleRate, channels) => {
  const audioBuffer = audioContext.createBuffer(channels, audioData.length / channels, sampleRate);
  for (let channel = 0; channel < channels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = audioData[i * channels + channel] / 32768; // Convert from 16-bit PCM to float
    }
  }
  return audioBuffer;
};

// Create PCM blob from input data
export const createPcmBlob = (inputData) => {
  const pcmData = new Int16Array(inputData.length);
  for (let i = 0; i < inputData.length; i++) {
    pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768)); // Convert float to 16-bit PCM
  }
  return new Blob([pcmData], { type: 'audio/pcm' });
};

// System instruction for the AI assistant
export const SYSTEM_INSTRUCTION = `
You are a helpful AI assistant specialized in asthma management. Your role is to provide immediate, accurate information and support for asthma patients. You can help with:

1. **Symptom Assessment**: Help users identify and assess their asthma symptoms
2. **Medication Guidance**: Provide information about asthma medications, dosages, and when to take them
3. **Trigger Identification**: Help identify potential asthma triggers in their environment
4. **Emergency Response**: Guide users on what to do during an asthma attack
5. **Lifestyle Advice**: Offer tips for managing asthma in daily life
6. **Weather and Climate**: Provide information about how weather conditions might affect asthma
7. **General Health**: Answer questions about asthma-related health concerns

Always be empathetic, clear, and encouraging. If a situation seems like a medical emergency, advise the user to seek immediate medical attention. Remember that you are not a substitute for professional medical advice.

When responding, keep your answers concise but informative. Use simple language that anyone can understand.
`;
