import React, { useState } from "react";

export default function Sidebar() {
  const [chatList, setChatList] = useState([
    { id: 1, title: "Checkup - Jan 10" },
    { id: 2, title: "Fever + Cough" },
    { id: 3, title: "Migraine Notes" },
  ]);

  const [activeChat, setActiveChat] = useState(chatList[0]?.id || null);

  const handleNewChat = () => {
    const newId = chatList.length + 1;
    const newChat = {
      id: newId,
      title: `New Chat #${newId}`,
    };
    setChatList([newChat, ...chatList]);
    setActiveChat(newId);
  };

  return (
    <aside className="w-64 max-w-[18rem] h-[95vh] m-4 bg-base-200 p-4 flex flex-col border border-base-300 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">💬 Patients Today</h2>

      <div className="flex-1 overflow-y-auto">
        <ul className="menu rounded-box">
          {chatList.map((chat) => (
            <li key={chat.id}>
              <a
                className={`truncate rounded-lg ${
                  activeChat === chat.id ? "bg-primary text-primary-content" : "hover:bg-base-300"
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                {chat.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary w-full rounded-xl" onClick={handleNewChat}>
          + New Chat
        </button>
      </div>
    </aside>
  );
}