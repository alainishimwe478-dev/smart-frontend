import React, { useState } from "react";

function Messages({ patient }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "patient", text: "I felt shortness of breath this morning", date: "2026-02-01T09:00" },
    { id: 2, sender: "doctor", text: "Please use your inhaler as prescribed", date: "2026-02-01T10:00" },
    { id: 3, sender: "patient", text: "Okay, thank you!", date: "2026-02-01T10:15" },
  ]);

  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "doctor",
      text,
      date: new Date().toISOString(),
    };
    setMessages([newMsg, ...messages]);
    setText("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages - {patient?.name || 'No Patient Selected'}</h1>

      <div className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-xl shadow ${m.sender === "doctor" ? "bg-blue-50" : "bg-gray-50"}`}
          >
            <span className="font-semibold">{m.sender}</span>: {m.text}
            <div className="text-gray-500 text-xs">{new Date(m.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
