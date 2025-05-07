"use client";
import { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    name: string;
  }
  
  interface Message {
    id: string;
    senderId: number;
    message: string;
    createdAt: string;
  }
  

export default function Message() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    // Mock users (replace with your user data)
    const users: User[] = [
      { id: 456, name: "User 456" },
      { id: 789, name: "User 789" },
      { id: 101, name: "User 101" },
    ];
  
    // Mock messages for demo (replace with WebSocket/fetched data)
    useEffect(() => {
      if (selectedUser) {
        setMessages([
          {
            id: "1",
            senderId: 123, // Current user
            message: "Hello!",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            senderId: selectedUser.id,
            message: `Hi from ${selectedUser.name}!`,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }, [selectedUser]);
  
    // Scroll to bottom when messages change
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    // Toggle sidebar on mobile
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    // Send message (placeholder)
    const sendMessage = () => {
      if (!input.trim() || !selectedUser) return;
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 123, // Current user
        message: input,
        createdAt: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    };
  
    return (
      <div className="flex h-screen gap-2">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-64 transition-transform duration-300 ease-in-out z-20`}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#059669]">Chats</h2>
          </div>
          <ul className="overflow-y-auto h-[calc(100vh-64px)]">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setIsSidebarOpen(false); // Close sidebar on mobile
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? "bg-[#059669] text-white shadow-sm rounded-sm" : "text-gray-800"
                }`}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-[#059669] text-white rounded-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
  
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="bg-[#059669] text-white p-4 flex items-center">
                <h1 className="text-lg font-semibold">Chat with {selectedUser.name}</h1>
              </div>
  
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === 123 ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.senderId === 123
                          ? "bg-[#059669] text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
  
              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
  
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    );
  } 