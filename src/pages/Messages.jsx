
import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import getUserDetails from "../utils/crud/user/getUserDetails";
import sendChatMessage from "../utils/chat/sendChatMessage";
import fetchMessages from "../utils/chat/fetchMessages";
import userChats from "../utils/chat/userChats";
import EmojiPicker from "emoji-picker-react";

const Messages = () => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]); // List of open chats
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null); // Selected chat room
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar visibility
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Emoji picker visibility

  const token = localStorage.getItem("authTokens");
  const decodedToken = token ? jwtDecode(token) : {};
  const user_id = decodedToken.user_id;
  const dropdownRef = useRef(null);

  // Fetch user details
  useEffect(() => {
    if (token) {
      getUserDetails(token, setUser, user_id);
    }
  }, [token, user_id]);

  // Update friends when user changes
  useEffect(() => {
    if (user && user.friends) {
      setFriends(user.friends);
    }
  }, [user]);

  // Fetch open chats
  useEffect(() => {
    if (token) {
      userChats(setChats, token);
    }
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fetchChatMessages = async (chat_room_id) => {
    try {
      await fetchMessages(setMessages, token, chat_room_id);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages.");
    }
  };

  const selectChat = async (chat) => {
    setSelectedChat(chat);
    setMessages([]); // Clear current messages before fetching new ones
    toast.success(`Opened chat with ${chat.friend}`);

    // Fetch all messages for the selected chat room
    await fetchChatMessages(chat.id);
    setShowDropdown(false);
    setShowSidebar(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }
    if (!selectedChat) {
      toast.error("Please select a chat to send a message.");
      return;
    }

    const messageData = {
      chat_room: selectedChat.id,
      sender: user_id,
      receiver: selectedChat.friend,
      content: newMessage,
    };

    try {
      await sendChatMessage(messageData, token);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: user.username, content: newMessage },
      ]);
      setNewMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <DefaultLayout>
      {/* Toggle Button for Sidebar */}
      <button
        className="rounded-md bg-primary p-2 text-white sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      <div className="bg-gray-50 h-[calc(100vh-186px)] sm:h-[calc(100vh-174px)]">
        <div className="flex h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Sidebar */}
          <div
            className={`${
              showSidebar ? "block" : "hidden"
            } h-full flex-col border-r border-stroke bg-white dark:border-strokedark dark:bg-boxdark-2 sm:flex sm:w-1/2 lg:w-1/3 xl:w-1/4`}
          >
            <div className="flex items-center justify-between border-b border-stroke px-6 py-5 dark:border-strokedark">
              <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                צ'אטים פתוחים
              </h3>
              {/* Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="rounded-full bg-primary p-2 text-white hover:bg-opacity-90"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  +
                </button>
                {showDropdown && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-boxdark-2">
                    <ul className="py-2">
                      {friends.length > 0 ? (
                        friends.map((friend, index) => (
                          <li
                            key={index}
                            className="hover:bg-gray-100 cursor-pointer px-4 py-2 dark:hover:bg-strokedark"
                            onClick={() => selectChat(friend)}
                          >
                            {friend.first_name}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 px-4 py-2">אין חברים</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Open Chats */}
            <div className="space-y-2 p-4">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer rounded-md bg-white px-4 py-2 dark:bg-boxdark-2 dark:hover:bg-strokedark"
                  onClick={() => selectChat(chat)}
                >
                  <h5 className="text-sm font-medium text-black dark:text-white">
                    {chat.friend}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex h-full flex-1 flex-col border-l border-stroke dark:border-strokedark">
            <div className="no-scrollbar bg-gray-50 flex-1 space-y-3.5 overflow-auto px-6 py-7.5 dark:bg-boxdark-2">
              {selectedChat ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[500px] ${
                      msg.sender === user?.username
                        ? "ml-auto text-right"
                        : "text-left"
                    }`}
                  >
                    <p className="text-gray-700 mb-2.5 text-sm font-medium dark:text-white">
                      {msg.sender}
                    </p>
                    <div
                      className={`${
                        msg.sender === user?.username || msg.sender === user_id
                          ? "ml-auto rounded-br-none bg-blue-600 text-right text-white"
                          : "mr-auto rounded-tl-none bg-black text-left text-white"
                      } mb-2.5 rounded-2xl px-5 py-3`}
                    >
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  בחר צ'אט כדי להציג הודעות
                </p>
              )}
            </div>

            {selectedChat && (
              <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
                <form
                  className="flex items-center space-x-4.5"
                  onSubmit={sendMessage}
                >
                  <input
                    type="text"
                    placeholder="הקלד משהו כאן..."
                    className="bg-gray-100 h-13 w-full rounded-md border pl-5 pr-16 text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      😊
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-16">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-5 py-2 text-white"
                  >
                    שלח
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Messages;
