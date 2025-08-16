"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import ChatBox from "@/components/chatbox";
import MessageList from "@/components/messagelist";

export default function Home() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);

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
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <button className="text-2xl font-bold">☰</button>
        <h1 className="text-lg font-semibold">Chat App</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

          <SignedOut>
      <div className="flex items-center justify-center h-full bg-gray-100">
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-indigo-600 text-white text-sm rounded-lg shadow hover:bg-indigo-700 transition">
            🚀 Sign in to Aditya.AI to start chatting
          </button>
        </SignInButton>
      </div>
    </SignedOut>


      <SignedIn>
        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} />
        </div>

        <div className="border-t p-4 sticky bottom-0 bg-white">
          <ChatBox onSend={handleSend} />
        </div>
      </SignedIn>
    </div>
  );
}
