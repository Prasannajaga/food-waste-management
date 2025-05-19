"use client";
import { baseHttp, chatHttp } from "@/axios/apiService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react"; 
import { formatDate, titleCase } from "@/sharedComponents/service";
import { SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface User {
  user_id: number;
  name: string;
  last_message: string;
}

interface Message {
  chat_id: string;
  owner_id: number;
  message: string;
  created_at: string;
}


export default function Message() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userData, setUser] = useState<User | null | any>(null);
  const { data } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() =>{
    subscribeTopics();
  }, [])

  function subscribeTopics(){
    try {
         const user = JSON.parse(localStorage.getItem('user') ?? "{}");
        if(user){  
          console.log();
          
          const ws = new WebSocket(`ws://localhost:3001/chat/${user.id}`);
      
          ws.onopen = () => {
            console.log("WebSocket connected");
          };
      
          ws.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log("messages ", message);
            setMessages((prev) => [...prev, message]);
          };
      
          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
          };
      
          ws.onclose = () => {
            console.log("WebSocket closed");
          };
      
          return () => {
            ws.close();
          }; 
        } 
    } catch (error) {
        console.log("error" , error);
    }
  }

  useEffect(() => {
  messagesEndRef.current?.scrollTo({
    top: messagesEndRef.current.scrollHeight,
    behavior: "smooth"
  }); 
}, [messages, selectedUser]);

  useEffect(() => {
    if (data?.user) {
      const d = {
        ...data.user,
        user_id: (data.user as any).id
      }
      setUser(d);  
      getUsers(d);
    }

  }, [data]);


  async function getUsers({user_id}:any) {
    const response = await chatHttp.get("/user/"+ user_id);
    setUserList(response.data); 
  }


  async function getUserChats(receiver_id: number = 0, sender_id: number) {
    const response = await chatHttp.get(`/messages?receiver_id=${receiver_id}&sender_id=${sender_id}`);
    if (response.data) {
      const data = response.data.messages ?? [];
      if(data.length > 0){
        console.log(data);
        setMessages(data);
      }
    }
  } 

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onSelectUser = (user : any) => {
    setSelectedUser(user);
    setMessages([]);
    getUserChats(user?.user_id , userData?.user_id);
  };

  // Send message (placeholder)
  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;
    const payload: any = {
      "sender_id": userData?.user_id,
      "receiver_id": selectedUser?.user_id,
      "messages": input
    }
    const response = await chatHttp.post("/create", payload); 
    if(response.data.status){
      const newMessage = response.data.data;  
      setMessages([...messages, newMessage]);
      setInput("");
      getUsers(userData);
      // setUserList(prev => {
      //   return prev.map(x => {          
      //     if(selectedUser.user_id === payload.receiver_id){
      //       x.last_message = newMessage.message;
      //     }
      //     return x;
      //   })
      // });
    }

  };

  return (
    <div className="container mx-auto bg-gray-50 shadow-md h-[calc(100vh-100px)] rounded-xl flex border">
      {/* Sidebar */}
      <section className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-64 transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-4 border-b border-gray-200 rounded-t-md">
          <h2 className="text-lg font-semibold text-[#059669] ">Chats</h2>
        </div>
        <Input placeholder="Search user ..." className="w-[92%] ml-2 mt-2 shadow-sm"></Input>
        <ul className="overflow-y-auto h-[calc(100vh-64px)] p-2">
          {userList.map((user, index) => (
            <li
              key={user.user_id} title={user?.last_message}
              onClick={() => {onSelectUser(user); setIsSidebarOpen(false);  }}  
              className={`flex rounded-sm items-start gap-2 p-4 cursor-pointer hover:bg-gray-300/50  transition-all duration-100 border-b ${selectedUser?.user_id === user.user_id ? "bg-gray-300/50 shadow-sm" : "text-gray-800"}`}
            >
              <Avatar id="profile" className="w-[45px] h-[45px] shadow-md">
                  <AvatarImage className="rounded-full" src={`https://i.pravatar.cc/${100 + index}`} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <label htmlFor="profile">{titleCase(user.name)}</label>
                <small className="text-gray-500 text-ellipsis max-w-32 whitespace-nowrap overflow-hidden">{user?.last_message}</small>
              </div> 
            </li>
          ))}
        </ul>
      </section>

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-[#059669] text-white rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-primary rounded-t-md text-white p-4 flex items-center">
              <h1 className="text-lg font-semibold">{titleCase(selectedUser.name)}</h1>
            </div>

            {/* Messages */}
            <div ref={messagesEndRef} className="flex-1 p-4 overflow-y-auto bg-white">
              {messages?.map((msg , index) => (
                <div  key={msg.chat_id} className={`flex ${msg.owner_id === userData?.user_id ? "justify-end" : "justify-start"} mb-4`}>
                  <div className={`flex gap-2 max-w-lg p-2 rounded-lg ${msg.owner_id === userData?.user_id
                        ? "bg-primary/90 text-white"
                        : "bg-gray-200 text-gray-800"
                      }`}
                  > 
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs whitespace-nowrap mt-1 opacity-75">
                      {formatDate(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))} 
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
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-bg"
                />
                <button
                  onClick={sendMessage}
                  className="px-2 py-2 bg-primary text-white rounded-lg hover:bg-[#047857] transition-colors shadow-sm"
                >
                  <SendHorizontal />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </section>

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