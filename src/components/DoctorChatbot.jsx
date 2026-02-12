import React, { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

function DoctorChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "doctor",
      text: "Hello 👋 I’m your doctor assistant. How can I help you?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    const doctorReply = {
      sender: "doctor",
      text:
        "Thanks for reaching out. A doctor will review your condition shortly.",
    };

    setChat([...chat, userMsg, doctorReply]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="0i28d5vc fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <MessageCircle />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="0z433vkr fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col z-50">
          <div className="0i0rz2fc flex items-center justify-between p-3 bg-blue-600 text-white rounded-t-xl">
            <h3 className="0vi776c8 font-semibold">Chat with Doctor</h3>
            <X
              className="0m7wvdfp cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="0l1au6s8 flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`0ye2l84g p-2 rounded-lg text-sm max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="08ibufyp p-3 flex gap-2 border-t">
            <input
              type="text"
              value={message}
              placeholder="Type your message..."
              className="0k2yjmlf flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="0bm41xk9 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorChatbot;
