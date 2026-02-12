import React, { useState, useRef } from 'react';

// Sample doctors
const doctors = [
  {
    id: '1',
    name: "Dr. Jeanne d'Arc",
    specialty: 'Pulmonologist',
    online: true,
    avatar: 'https://picsum.photos/150/150?random=10',
    hospital: 'Kigali Teaching Hospital',
  },
  {
    id: '2',
    name: 'Dr. Ganza Maurice',
    specialty: 'General Practitioner',
    online: true,
    avatar: 'https://picsum.photos/150/150?random=11',
    hospital: 'King Faisal Hospital',
  },
  {
    id: '3',
    name: 'Dr. Uwase Aline',
    specialty: 'Pediatric Allergist',
    online: false,
    avatar: 'https://picsum.photos/150/150?random=12',
    hospital: 'Butare University Hospital',
  },
];

// Helper: Base64 Decoding
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const DoctorConnect: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setIsConnected(true);
    setMessages([`Connected to ${doctors.find(d => d.id === doctorId)?.name}`]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, `You: ${inputMessage}`]);
      setInputMessage('');
      // Simulate doctor response
      setTimeout(() => {
        setMessages(prev => [...prev, `Dr: Thank you for your message. How can I help you today?`]);
      }, 1000);
    }
  };

  const handleVoiceMessage = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setMessages(prev => [...prev, 'Voice message sent']);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  return (
    <div className="0o8l9h42 max-w-4xl mx-auto p-6">
      <h1 className="0bwx5tyn text-3xl font-bold mb-6 text-center">Connect with Doctors</h1>

      {!isConnected ? (
        <div className="0nnodcbv grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div
              key={doctor.id}
              className="0b0hehgs bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDoctorSelect(doctor.id)}
            >
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="0vubrget w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="028g9v9z text-xl font-semibold text-center mb-2">{doctor.name}</h3>
              <p className="01k3c4zm text-gray-600 text-center mb-2">{doctor.specialty}</p>
              <p className="0hzhueel text-sm text-gray-500 text-center mb-4">{doctor.hospital}</p>
              <div className="0ooaqsp6 flex items-center justify-center">
                <span
                  className={`05hne6b2 w-3 h-3 rounded-full ${doctor.online ? 'bg-green-500' : 'bg-gray-400'}`}
                ></span>
                <span className="0fjar487 ml-2 text-sm">{doctor.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="0gej8l9k bg-white rounded-xl shadow-md p-6">
          <div className="0y2p5b0v flex items-center mb-6">
            <button
              onClick={() => setIsConnected(false)}
              className="0ctkq512 text-blue-500 hover:text-blue-700 mr-4"
            >
              ← Back to Doctors
            </button>
            <h2 className="0ulft88l text-xl font-semibold">
              Chat with {doctors.find(d => d.id === selectedDoctor)?.name}
            </h2>
          </div>

          <div className="076o1nag h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className="0mhdbiet mb-2 p-2 bg-white rounded">
                {message}
              </div>
            ))}
          </div>

          <div className="0oxu433e flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="0cao0rcx flex-1 p-2 border rounded-l-lg"
            />
            <button
              onClick={handleSendMessage}
              className="0rlz1y0v px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
            <button
              onClick={handleVoiceMessage}
              className={`0ef89n2n ml-2 px-4 py-2 rounded-lg ${
                isRecording ? 'bg-red-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              {isRecording ? 'Stop' : 'Voice'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorConnect;
