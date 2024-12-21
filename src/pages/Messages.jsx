
// import React, { useEffect, useState, useRef } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import toast from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";
// import EmojiPicker from "emoji-picker-react";
// import getUserDetails from "../utils/crud/user/getUserDetails";
// import fetchMessages from "../utils/chat/fetchMessages";
// import userChats from "../utils/chat/userChats";

// const Messages = () => {
//   const [user, setUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);

//   const socketRef = useRef(null);
//   const messageEndRef = useRef(null);

//   const token = localStorage.getItem("authTokens");
//   const decodedToken = token ? jwtDecode(token) : {};
//   const user_id = decodedToken.user_id;

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Fetch user details and chats
//   useEffect(() => {
//     if (token) {
//       getUserDetails(token, setUser, user_id);
//       userChats(setChats, token);
//     }
//   }, [token, user_id]);

//   // WebSocket connection management
//   useEffect(() => {
//     if (!selectedChat) return;

//     const connectWebSocket = () => {
//       const wsURL = `wss://vibes-backend.up.railway.app/ws/chat/${selectedChat.id}/`;
//       const ws = new WebSocket(wsURL);

//       ws.onopen = () => {
//         console.log("WebSocket connected!");
//         setIsConnected(true);

//         // Send token after connection
//         ws.send(JSON.stringify({ type: "authenticate", token }));

//         // Fetch previous messages
//         fetchMessages(setMessages, token, selectedChat.id);
//       };

//       ws.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           if (data.type === "chat_message") {
//             setMessages((prevMessages) => [
//               ...prevMessages,
//               {
//                 sender: data.sender_id,
//                 content: data.message,
//                 timestamp: data.timestamp,
//               },
//             ]);
//           }
//         } catch (error) {
//           console.error("Error parsing message:", error);
//           toast.error("Error receiving message");
//         }
//       };

//       ws.onclose = () => {
//         console.log("WebSocket disconnected!");
//         setIsConnected(false);
//         // Attempt to reconnect after 3 seconds
//         setTimeout(connectWebSocket, 3000);
//       };

//       ws.onerror = (error) => {
//         console.error("WebSocket error:", error);
//         toast.error("Connection error. Retrying...");
//       };

//       socketRef.current = ws;
//     };

//     connectWebSocket();

//     // Cleanup on unmount or chat change
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         setIsConnected(false);
//       }
//     };
//   }, [selectedChat, token]);

//   const sendMessage = (e) => {
//     e.preventDefault();

//     if (!newMessage.trim()) {
//       toast.error("Message cannot be empty!");
//       return;
//     }

//     if (!socketRef.current || !isConnected || !selectedChat) {
//       toast.error("Not connected. Please wait...");
//       return;
//     }

//     try {
//       const messageData = {
//         type: "chat_message",
//         message: newMessage.trim(),
//         sender: user_id,
//         receiver: selectedChat.friend,
//       };

//       socketRef.current.send(JSON.stringify(messageData));

//       // Optimistically add the message to the UI
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           sender: user.username,
//           content: newMessage.trim(),
//           timestamp: new Date().toISOString(),
//         },
//       ]);

//       setNewMessage("");
//       setShowEmojiPicker(false);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast.error("Failed to send message. Please try again.");
//     }
//   };

//   const onEmojiClick = (emojiObject) => {
//     setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
//   };

//   return (
//     <DefaultLayout>
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <div className="w-1/4 border-r p-4 overflow-y-auto">
//           <h3 className="text-xl font-bold mb-4">Chats</h3>
//           {chats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => setSelectedChat(chat)}
//               className={`p-3 cursor-pointer hover:bg-gray-100 rounded ${
//                 selectedChat?.id === chat.id ? "bg-gray-100" : ""
//               }`}
//             >
//               <p className="font-medium">{chat.friend}</p>
//             </div>
//           ))}
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col">
//           {/* Messages */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {selectedChat ? (
//               <>
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`mb-4 ${
//                       msg.sender === user?.username
//                         ? "text-right"
//                         : "text-left"
//                     }`}
//                   >
//                     <div
//                       className={`inline-block p-3 rounded-lg ${
//                         msg.sender === user?.username
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200"
//                       }`}
//                     >
//                       <p className="text-sm font-medium mb-1">
//                         {msg.sender === user?.username
//                           ? "You"
//                           : selectedChat.friend}
//                       </p>
//                       <p>{msg.content}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </>
//             ) : (
//               <p className="text-center text-gray-500 mt-10">
//                 Select a chat to view messages
//               </p>
//             )}
//           </div>

//           {/* Message Input */}
//           {selectedChat && (
//             <form onSubmit={sendMessage} className="p-4 border-t">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 p-2 border rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                   className="p-2 rounded hover:bg-gray-100"
//                 >
//                   😊
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   disabled={!isConnected}
//                 >
//                   Send
//                 </button>
//               </div>
//               {showEmojiPicker && (
//                 <div className="absolute bottom-20 right-4">
//                   <EmojiPicker onEmojiClick={onEmojiClick} />
//                 </div>
//               )}
//             </form>
//           )}
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default Messages;

import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import EmojiPicker from "emoji-picker-react";
import getUserDetails from "../utils/crud/user/getUserDetails";
import fetchMessages from "../utils/chat/fetchMessages";
import userChats from "../utils/chat/userChats";

const Messages = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  const token = localStorage.getItem("authTokens");
  const decodedToken = token ? jwtDecode(token) : {};
  const user_id = decodedToken.user_id;

  // Auto-scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch user details and chats
  useEffect(() => {
    if (token) {
      getUserDetails(token, setUser, user_id);
      userChats(setChats, token);
    }
  }, [token, user_id]);

  // WebSocket connection management
  useEffect(() => {
    if (!selectedChat) return;

    const connectWebSocket = () => {
      const wsURL = `wss://vibes-backend.up.railway.app/ws/chat/${selectedChat.id}/`;
      const ws = new WebSocket(wsURL);

      ws.onopen = () => {
        console.log("WebSocket connected!");
        setIsConnected(true);

        // Fetch previous messages
        fetchMessages(setMessages, token, selectedChat.id);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "chat_message") {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: data.sender_id,
                content: data.message,
                timestamp: data.timestamp,
              },
            ]);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
          toast.error("Error receiving message");
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected!");
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("Connection error. Retrying...");
      };

      socketRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        setIsConnected(false);
      }
    };
  }, [selectedChat, token]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    if (!socketRef.current || !isConnected || !selectedChat) {
      toast.error("Not connected. Please wait...");
      return;
    }

    try {
      const messageData = {
        type: "chat_message",
        message: newMessage.trim(),
        sender: user_id,
        receiver: selectedChat.friend,
      };

      socketRef.current.send(JSON.stringify(messageData));

      // Optimistically add the message to the UI
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: user_id,
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);

      setNewMessage("");
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <DefaultLayout>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Chats</h3>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 cursor-pointer hover:bg-gray-100 rounded ${
                selectedChat?.id === chat.id ? "bg-gray-100" : ""
              }`}
            >
              <p className="font-medium">{chat.friend}</p>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedChat ? (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.sender === user_id ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.sender === user_id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">
                        {msg.sender === user_id ? "You" : selectedChat.friend}
                      </p>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                Select a chat to view messages
              </p>
            )}
          </div>

          {/* Message Input */}
          {selectedChat && (
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  😊
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={!isConnected}
                >
                  Send
                </button>
              </div>
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Messages;