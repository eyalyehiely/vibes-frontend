import React, { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import RecruiterDefaultLayout from '../components/RecruiterDefaultLayout';
import getRecruitersPerCompany from '../../Companies/functions/crud/recruiter/getRecruitersPerCompany';
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import {jwtDecode} from "jwt-decode";

const Messages = () => {
  checkRecruiterToken();
  const [recruiters, setRecruiters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeRecruiter, setActiveRecruiter] = useState(null);
  const messageEndRef = useRef(null);

  const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")).access : null;
  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.company_id;

  const socket = useRef(null); // WebSocket reference

  useEffect(() => {
    if (token) {
      getRecruitersPerCompany(token, setRecruiters, company_id);
    }

    // Initialize WebSocket connection
    socket.current = new WebSocket('ws://localhost:8000/ws/chat/'); // Use wss:// for production

    // Listen for messages from WebSocket server
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.current.close();
    };
  }, [token]);

  // Sending the message over WebSocket
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket.current && socket.current.readyState === WebSocket.OPEN) {
      const messageData = {
        recruiter_id: decodedToken.user_id,
        content: newMessage,
        company_id: company_id,
      };

      // Send the message to WebSocket server
      socket.current.send(JSON.stringify(messageData));

      // Optionally, add the sent message to the local message list
      setMessages([...messages, messageData]);
      setNewMessage('');
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <RecruiterDefaultLayout>
      <Breadcrumb pageName="Messages" />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          {/* Chat List */}
          <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            <div className="border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <h3 className="text-lg font-medium text-black dark:text-white">Active Conversations</h3>
            </div>
            <div className="flex flex-col overflow-auto p-5">
              {recruiters.map((recruiter) => (
                recruiter.id !== decodedToken.user_id && ( // Do not show logged-in recruiter
                  <div
                    key={recruiter.id}
                    className="flex items-center py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setActiveRecruiter(recruiter)}
                  >
                    <div className="h-11 w-11 rounded-full bg-gray-400"></div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-black dark:text-white">{recruiter.first_name}</h5>
                      <p className="text-sm">{recruiter.job_title}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex flex-col h-full xl:w-3/4">
            <div className="flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
              <div className="flex items-center">
                <div className="h-13 w-13 rounded-full bg-gray-400"></div>
                <div className="ml-3">
                  <h5 className="text-lg font-medium text-black dark:text-white">
                    {activeRecruiter ? activeRecruiter.first_name : "Select a recruiter"}
                  </h5>
                </div>
              </div>
              <DropdownDefault />
            </div>

            <div className="flex-1 overflow-auto p-6">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.recruiter_id === decodedToken.user_id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded p-4 ${msg.recruiter_id === decodedToken.user_id ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t border-stroke">
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 p-3"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="ml-3 p-3 bg-primary text-white rounded-lg">
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