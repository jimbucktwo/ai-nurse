"use client";
import { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import { useAuth } from "@clerk/nextjs";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export default function ChatBox() {
  const { userId } = useAuth();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [messages, setMessages] = useState<
    { id: number; sender: string; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      if (!reportGenerated && shouldTriggerAutoReport(messages)) {
        generateReport();
      }
    }, 90 * 1000); // 90 seconds
  };

  const shouldTriggerAutoReport = (msgs: { sender: string; text: string }[]) => {
    const aiMessages = msgs.filter((m) => m.sender === "ai").slice(-2);
    return aiMessages.some((m) =>
      /total score|recommendation|diagnosis/i.test(m.text)
    );
  };

  const generateReport = async () => {
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, conversation: messages }),
      });
      console.log(res);
      const result = await res.json();
      setReportGenerated(true);
      if (result.error) {
        console.log(result)
        console.error("❌ Report error:", result.error);
      } else {
        console.log("✅ Report generated:", result);
      }
    } catch (err) {
      console.error("❌ Auto-report error:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    resetInactivityTimer();

    const formattedMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `I want you to act like an AI Nurse, I want you to ask me my age, gender and pain severity and then ask foer my symptoms and then possibly give a options of what my diagnosis could be.  Also ask them about how long are they feeling these symptoms or when did they might have noticed it. Also include the severity score to it maybe somehting like "Total Score Calculation:
            •    Low (1-3 points): Self-care (fluids, rest, monitor)
            •    Moderate (4-6 points): Schedule a virtual nurse consultation
            •    High (7-9 points): See a doctor within 24 hours
            •    Critical (10+ points): Urgent care or ER recommendation "
        You should use information provided by Mayo Clinic website (https://www.mayoclinic.org/diseases-conditions) or (https://www.mayoclinic.org/symptom-checker/select-symptom/itt-20009075) or (https://www.mayoclinic.org/drugs-supplements) get the most appropriate information.,`
      },
      ...updatedMessages.map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages,
    });

    const aiResponse = {
      id: Date.now() + 1,
      sender: "ai",
      text: String(completion.choices[0].message.content),
    };
    const finalMessages = [...updatedMessages, aiResponse];
    setMessages(finalMessages);
    resetInactivityTimer();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 m-4 min-h-[80vh] bg-base-100 p-6 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <h1 className="text-xl font-bold mb-4">🩺 Chat</h1>

      {/* Chat messages */}
      <div className="flex-1 bg-base-200 rounded-2xl p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
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

      {/* Input field */}
      <div className="mt-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type here"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resetInactivityTimer();
            }}
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

      {/* Fallback Generate Report button */}
      {!reportGenerated && messages.length >= 6 && (
        <div className="mt-4 flex justify-center">
          <button className="btn btn-accent" onClick={generateReport}>
            📝 Generate Report
          </button>
        </div>
      )}
    </div>
  );
}
