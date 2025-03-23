import { useEffect, useRef, useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello, how can I assist you today?" },
    { id: 2, sender: "user", text: "I have a fever and sore throat." },
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Thanks for the information. I'll help you with that.",
        },
      ]);
    }, 800);
  };

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
};

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 m-4 h-[95vh] bg-base-100 p-6 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <h1 className="text-xl font-bold mb-4">🩺 Chat</h1>

      {/* Chat message area */}
      <div className="flex-1 bg-base-200 rounded-2xl p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-xs ${
                msg.sender === "user"
                  ? "bg-primary text-primary-content"
                  : "bg-base-300 text-base-content"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input + send button */}
      <div className="mt-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input w-11/12 bg-primary text-primary-content placeholder-primary-content font-medium rounded-xl pr-3"
          />
          <button
            className="btn btn-primary absolute right-1 top-1/2 -translate-y-1/2 rounded-xl px-4"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
