import { useState } from "react";

export default function DoctorChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;
    setMessages([...messages, { sender: "user", text }]);
    setText("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Chat with Doctor</h2>

      <div className="h-64 overflow-y-auto border rounded p-3 mb-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Start chatting with your doctor...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
