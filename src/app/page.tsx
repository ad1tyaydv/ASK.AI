"use client";
import { useState } from "react";
import ChatBox from "@/components/chatbox";
import MessageList from "@/components/messagelist";

export default function Home() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [menuOpen, setMenuOpen] = useState(false); // toggle menu

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", text: message }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-black relative">
      {/* Header with menu */}
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <button
          className="text-2xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold">Aditya AI</h1>
      </div>

      {/* Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-14 left-4 bg-white border shadow-lg rounded-lg w-48 z-50 p-2">
          <ul className="space-y-2 text-sm">
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">⚙️ Settings</li>
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">🧼 Clear Chat</li>
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">🚪 Logout</li>
          </ul>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
      </div>

      {/* ChatBox */}
      <div className="border-t p-4 sticky bottom-0 bg-white">
        <ChatBox onSend={handleSend} />
      </div>
    </div>
  );
}
