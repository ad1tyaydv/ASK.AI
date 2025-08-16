import { FaRobot } from "react-icons/fa";

interface MessageListProps {
  messages: { role: "user" | "ai"; text: string }[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4 mt-4 flex flex-col">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* AI Avatar */}
          {msg.role === "ai" && (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center text-sm font-bold">
              <FaRobot />
            </div>
          )}

          <div
            className={`relative max-w-[75%] p-4 rounded-2xl shadow-md ${
              msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
            {/* Tail for bubble */}
            <div
              className={`absolute bottom-0 w-3 h-3 rotate-45 ${
                msg.role === "user"
                  ? "right-[-6px] bg-blue-500"
                  : "left-[-6px] bg-gray-100"
              }`}
            />
          </div>

          {/* User Avatar */}
          {msg.role === "user" && (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white flex items-center justify-center text-sm font-bold">
              🙋‍♂️
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
