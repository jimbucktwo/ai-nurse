"use client"

import React, { useState, useEffect } from "react";

export default function ChatDrawer() {
  interface Chat {
    name: string;
    age: number;
    judgment: string;
  }

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("chat_summaries");
    if (stored) {
      setChatList(JSON.parse(stored));
    }
  }, []);

  return (
    <aside className="w-64 max-w-[18rem] h-[90vh] bg-base-200 p-4 flex flex-col border-r border-base-300 rounded-r-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 ml-4">Report History</h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="menu rounded-box">
            <li>
              <div
                className={`rounded-lg p-3 cursor-pointer ${
                  activeChat === true? "bg-primary text-primary-content" : "hover:bg-base-300"
                }`}
                onClick={() => {}}
              >
                <p className="font-semibold">March 23rd</p>
                <p className="text-sm text-gray-500">Age: 25</p>
              </div>
            </li>
        </ul>
      </div>
    </aside>
  );
}
