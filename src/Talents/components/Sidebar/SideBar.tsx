import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiMail, CiUser } from "react-icons/ci";
import UserPicHandling from '../UserPicHandling'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    title: "תפריט",
    items: [
      { path: "/talent/home", label: "ראשי", icon: <RxDashboard size={20} /> },
      { path: "/talent/profile", label: "פרופיל", icon: <CiUser size={20} /> },
    ],
  },
  {
    title: "תמיכה",
    items: [
      { path: "/talent/messages", label: "הודעות", icon: <CiMail size={20} /> },
      {
        path: "/faqs",
        label: "שאלות נפוצות",
        icon: <IoIosInformationCircleOutline size={20} />,
      },
      {
        path: "/talent/contactus",
        label: "צור קשר",
        icon: <CiMail size={20} />,
      },
    ],
  },
];

const SideBar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        sidebarOpen &&
        window.innerWidth <= 768
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed right-0 top-0 z-40 h-full bg-blue-800 text-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "250px" }}
      dir="rtl"
    >
      <div className="p-4">
        <h1 className="text-right text-lg font-bold">סיידבר</h1>
      </div>
      <UserPicHandling/>
      <div className="px-4">
        {menuGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-gray-400 mb-4 text-right text-sm font-semibold">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-4 rounded-md p-2 transition-colors ${
                      pathname === item.path
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span className="text-right">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
