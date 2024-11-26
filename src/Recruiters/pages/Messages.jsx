// Messages.js
import React, { useEffect, useState, useRef } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DropdownDefault from "../components/chat/ChatMenu";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import getRecruiterChatRooms from "../functions/crud/chat/getRecruiterChatRooms";
import getChatRoomMessages from "../functions/crud/chat/getChatRoomMessages";
import getTalentDetails from "../../Talents/functions/crud/getTalentDetails";
import { jwtDecode } from "jwt-decode";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [activeChatRoom, setActiveChatRoom] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);
  const socket = useRef(null);
  const retryCountRef = useRef(0);

  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const token = authTokens ? authTokens.access : null;
  console.log("Access Token:", token);
  const decodedToken = jwtDecode(token);
  console.log("decodedToken:", decodedToken);

  const recruiter_id = decodedToken.user_id;

  const maxRetryCount = 5;

  const createWebSocketRoom = (roomId) => {
    if (socket.current) {
      socket.current.close();
    }

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://localhost:8080/ws/chat/${roomId}/?token=${encodeURIComponent(
      token
    )}`;

    socket.current = new WebSocket(wsUrl);

    socket.current.onopen = () => {
      console.log("WebSocket connected");
      retryCountRef.current = 0;
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "typing") {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.current.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      if (retryCountRef.current < maxRetryCount) {
        retryCountRef.current += 1;
        setTimeout(() => {
          if (activeChatRoom) {
            createWebSocketRoom(activeChatRoom.id);
          }
        }, 1000);
      } else {
        console.log("Max reconnection attempts reached.");
      }
    };
  };

  // Load recruiter chat rooms
  useEffect(() => {
    if (token) {
      (async () => {
        const rooms = await getRecruiterChatRooms(recruiter_id, token);
        const chatRoomsWithTalents = await Promise.all(
          rooms.map(async (room) => {
            const talentDetails = await getTalentDetails(token, room.talent);
            return { ...room, talentDetails };
          })
        );
        setChatRooms(chatRoomsWithTalents);
      })();
    }
  }, [token, recruiter_id]);

  // Load messages for the first chat room after chatRooms are loaded
  useEffect(() => {
    if (chatRooms.length > 0) {
      const firstChatRoom = chatRooms[0];
      setActiveChatRoom(firstChatRoom);
      (async () => {
        const messages = await getChatRoomMessages(firstChatRoom.id, token);
        setMessages(messages);
      })();
    }
  }, [chatRooms, token]);

  // Initialize WebSocket when activeChatRoom changes
  useEffect(() => {
    if (activeChatRoom) {
      createWebSocketRoom(activeChatRoom.id);
      // Fetch messages for the selected chat room
      (async () => {
        const messages = await getChatRoomMessages(activeChatRoom.id, token);
        setMessages(messages);
      })();
    }
  }, [activeChatRoom, token]);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        const messageData = {
          sender: recruiter_id,
          receiver: activeChatRoom.talentDetails.id,
          content: newMessage,
        };

        // Optimistically update the UI
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage(""); // Clear the input field after sending

        // Send message via WebSocket
        socket.current.send(JSON.stringify(messageData));
      } else {
        console.log("WebSocket is not connected or message is empty.");
      }
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(
        JSON.stringify({
          type: "typing",
          sender: recruiter_id,
        })
      );
    }
  };

  return (
    <RecruiterDefaultLayout>
      <Breadcrumb pageName="Messages" />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            <div className="border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <h3 className="text-lg font-medium text-black dark:text-white">
                Active Conversations
              </h3>
            </div>
            <div className="flex flex-col overflow-auto p-5">
              {chatRooms.map((chatRoom) => (
                <div
                  key={chatRoom.id}
                  className={`hover:bg-gray-200 flex cursor-pointer items-center px-4 py-2 ${
                    activeChatRoom?.id === chatRoom.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setActiveChatRoom(chatRoom)}
                >
                  <div className="bg-gray-400 h-11 w-11 rounded-full"></div>
                  <div className="ml-3">
                    <p className="text-sm">
                      {`${chatRoom.talentDetails.first_name || ""} ${
                        chatRoom.talentDetails.last_name || ""
                      }`.trim() || "Talent"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col xl:w-3/4">
            <div className="flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
              <div className="flex items-center">
                <div className="bg-gray-400 h-13 w-13 rounded-full"></div>
                <div className="ml-3">
                  <h5 className="text-lg font-medium text-black dark:text-white">
                    {activeChatRoom
                      ? `${activeChatRoom.talentDetails.first_name || ""} ${
                          activeChatRoom.talentDetails.last_name || ""
                        }`.trim() || "Talent"
                      : "Select a conversation"}
                  </h5>
                </div>
              </div>
              <DropdownDefault />
            </div>

            <div className="flex-1 overflow-auto p-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === recruiter_id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded p-4 ${
                      msg.sender === recruiter_id
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-gray-500">Typing...</div>}
              <div ref={messageEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex items-center border-t border-stroke p-4"
            >
              <input
                type="text"
                className="border-gray-300 flex-1 rounded-md border p-3"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleTyping}
              />
              <button
                type="submit"
                className="ml-3 rounded-lg bg-primary p-3 text-white"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
};

export default Messages;
