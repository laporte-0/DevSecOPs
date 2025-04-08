import { useState } from "react";
import { mockChats } from "../services/mockProjects";
import { ChatMessage } from "../pages/types";
import { SendHorizonal } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChats);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newUserMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    const botResponse: ChatMessage = {
      id: String(Date.now() + 1),
      sender: "bot",
      content:
        "🤖 Sorry, I'm in mock mode! I would normally analyze the logs and give you advice.",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newUserMsg, botResponse]);
    setInput("");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Chat Assistant</h1>
      <div className="bg-white border rounded-lg shadow-sm p-4 h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs block mt-1 text-gray-400 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about pipeline failures, errors, vulnerabilities..."
          className="flex-grow border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
