import React, { useState } from "react";
import { FiSend, FiX } from "react-icons/fi";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Thanks for updating! Remember to check your medication.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
        >
          Chat
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <span>Health Chat</span>
            <FiX className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right self-end"
                    : "bg-gray-100 text-left self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
