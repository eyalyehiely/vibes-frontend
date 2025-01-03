
import React, { ReactNode, useEffect, useState } from "react";
import SideBar from "./Sidebar/SideBar";
import Header from "./Header/Header";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setSidebarOpen(true); // Always open sidebar for larger screens
    }
  }, []);

  return (
    <div
      className="h-screen w-screen grid grid-cols-[auto,1fr] overflow-hidden"
      dir="rtl"
    >
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col overflow-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        {/* <main className="flex-1 p-4 bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 overflow-auto"> */}
        <main className="flex-1 p-4 bg-gradient-to-r from-white-100 via-gray-100 to-black-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
