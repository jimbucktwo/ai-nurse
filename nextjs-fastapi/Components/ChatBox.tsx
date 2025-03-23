import { useEffect, useRef, useState } from "react";
import OpenAI from "openai";

export default function ChatBox() {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true,});
  const [messages, setMessages] = useState<{ id: number; sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("chat_messages");
    const storedTime = localStorage.getItem("chat_timestamp");

    if (stored && storedTime) {
      const hoursPassed = (Date.now() - parseInt(storedTime)) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        setMessages(JSON.parse(stored));
      } else {
        localStorage.removeItem("chat_messages");
        localStorage.removeItem("chat_timestamp");
      }
    } else {
      // Default starting message
      setMessages([
        { id: 1, sender: "ai", text: "Hello, how can I assist you today?" },
      ]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    localStorage.setItem("chat_timestamp", Date.now().toString());
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
            role: "system",
            content:  `want you to act like an AI Nurse, I want you to ask me my age, gender and pain severity and then ask foer my symptoms and then possibly give a options of what my diagnosis could be.  Also ask them about how long are they feeling these symptoms or when did they might have noticed it. Also include the severity score to it maybe somehting like "Total Score Calculation:
            •    Low (1-3 points): Self-care (fluids, rest, monitor)
            •    Moderate (4-6 points): Schedule a virtual nurse consultation
            •    High (7-9 points): See a doctor within 24 hours
            •    Critical (10+ points): Urgent care or ER recommendation "
        You should use information provided by Mayo Clinic website (https://www.mayoclinic.org/diseases-conditions) or (https://www.mayoclinic.org/symptom-checker/select-symptom/itt-20009075) or (https://www.mayoclinic.org/drugs-supplements) get the most appropriate information.,
        `},
          {
              role: "user",
              content: input,
          },
      ],
  });
    // Simulate AI response and store history summary
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai",
        text: String(completion.choices[0].message.content), // Use the AI's response
      };
      setMessages((prev) => [...prev, aiResponse]);

      // Update chat summary for sidebar
      const summary = {
        name: "John Doe",
        age: 30,
        judgment: "Fever and sore throat",
      };
      const storedChats = JSON.parse(localStorage.getItem("chat_summaries") || "[]");
      storedChats.unshift(summary);
      localStorage.setItem("chat_summaries", JSON.stringify(storedChats.slice(0, 20)));
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
