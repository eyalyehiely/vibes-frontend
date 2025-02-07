
import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import EmojiPicker from "emoji-picker-react";
import { format } from "date-fns";
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [chatUsers, setChatUsers] = useState({});

  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  const token = localStorage.getItem("authTokens");
  const decodedToken = token ? jwtDecode(token) : {};
  const user_id = decodedToken.user_id;

  const fetchUserDetails = async (userId) => {
    try {
      const response = await getUserDetails(token, (userData) => {
        setChatUsers(prev => ({
          ...prev,
          [userId]: userData.username || userData.email || 'Unknown User'
        }));
      }, userId);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const getUserName = (userId) => {
    return chatUsers[userId] || 'Loading...';
  };

  useEffect(() => {
    if (token) {
      getUserDetails(token, setUser, user_id);
      userChats(setChats, token);
    }
  }, [token, user_id]);

  useEffect(() => {
    messages.forEach(msg => {
      if (!chatUsers[msg.sender]) {
        fetchUserDetails(msg.sender);
      }
    });
  }, [messages]);

  const groupMessagesByDate = (msgs) => {
    const groups = {};
    msgs.forEach(msg => {
      const date = format(new Date(msg.timestamp), 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!selectedChat) return;

    const connectWebSocket = () => {
      const wsURL = `wss://vibes-backend.up.railway.app/ws/chat/${selectedChat.id}/`;
      const ws = new WebSocket(wsURL);

      ws.onopen = () => {
        setIsConnected(true);
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
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-white shadow-sm p-4 md:hidden">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-600 hover:text-gray-800"
          >
            {showSidebar ? "✕" : "☰"}
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className={`${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 absolute md:relative z-10 w-full md:w-80 bg-white border-r h-full`}>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                Chats
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="md:hidden text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </h3>
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat);
                      setShowSidebar(false);
                      if (!chatUsers[chat.friend]) {
                        fetchUserDetails(chat.friend);
                      }
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors
                      ${selectedChat?.id === chat.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {getUserName(chat.friend)[0]?.toUpperCase()}
                      </div>
                      <p className="font-medium">{getUserName(chat.friend)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white">
            {selectedChat ? (
              <>
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {getUserName(selectedChat.friend)[0]?.toUpperCase()}
                    </div>
                    <p className="font-medium">{getUserName(selectedChat.friend)}</p>
                    <div className={`w-2 h-2 rounded-full ml-2 ${
                      isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {Object.entries(groupMessagesByDate(messages)).map(([date, dateMessages]) => (
                    <div key={date}>
                      <div className="flex justify-center my-4">
                        <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm">
                          {format(new Date(date), 'MMMM d, yyyy')}
                        </span>
                      </div>
                      {dateMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-4 flex ${
                            msg.sender === user_id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div className={`max-w-[75%] ${
                            msg.sender === user_id ? 'order-2' : ''
                          }`}>
                            <div className={`rounded-2xl p-4 ${
                              msg.sender === user_id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100'
                            }`}>
                              <p className="text-sm font-medium mb-1">
                                {msg.sender === user_id ? 'You' : getUserName(msg.sender)}
                              </p>
                              <p>{msg.content}</p>
                            </div>
                            <div className={`text-xs text-gray-500 mt-1 ${
                              msg.sender === user_id ? 'text-right' : 'text-left'
                            }`}>
                              {format(new Date(msg.timestamp), 'h:mm a')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>

                <form onSubmit={sendMessage} className="p-4 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-3 rounded-lg hover:bg-gray-100"
                    >
                      😊
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Messages;