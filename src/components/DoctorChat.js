import { useState, useEffect } from "react";

const suggestedQuestions = [
  "Doctor, how is my asthma going?",
  "Is my asthma under control?",
  "I’ve been wheezing lately, is that normal?",
  "Can I continue using my inhaler the same way?",
  "What should I avoid to prevent asthma attacks?",
];

export default function DoctorChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Optional doctor greeting
  useEffect(() => {
    setMessages([
      {
        sender: "doctor",
        text: "Hello 👋 How have you been feeling with your asthma recently?",
      },
    ]);
  }, []);

  // Send message to backend
  const sendMessage = async (msgText) => {
    if (!msgText) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: msgText }]);
    setText("");
    setIsTyping(true); // doctor starts typing

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText }),
      });

      const data = await response.json();

      // Add doctor reply
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "doctor",
          text: "⚠️ Doctor is unavailable right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false); // doctor stops typing
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Chat with Doctor</h2>

      {/* Chat messages */}
      <div className="h-64 overflow-y-auto border rounded p-3 mb-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="text-left mb-2">
            <span className="inline-block px-3 py-2 rounded-lg text-sm bg-gray-200 text-gray-600 animate-pulse">
              Doctor is typing...
            </span>
          </div>
        )}
      </div>

      {/* Suggested questions */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-2">Suggested asthma questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={() => sendMessage(text)}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
