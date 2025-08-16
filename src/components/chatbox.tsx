"use client";
import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";

interface ChatBoxProps {
  onSend: (message: string) => void;
}

export default function ChatBox({ onSend }: ChatBoxProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 w-full max-w-md">
        <input
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 text-sm"
          onClick={handleSend}
        >
          <FaArrowCircleUp />
        </button>
      </div>
    </div>
  );
}
