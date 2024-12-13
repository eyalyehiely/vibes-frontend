import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoStarOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiLogout, CiMail, CiStar, CiUser } from "react-icons/ci";
import Rights from '../Rights'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    title: "תפריט",
    items: [
      { path: "/", label: "ראשי", icon: <RxDashboard size={20} /> },
      { path: "/profile", label: "פרופיל", icon: <CiUser size={20} /> },
      { path: "/favorites", label: "המסלולים שלי", icon: <IoStarOutline size={20} /> },
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
        path: "/login",
        action: () => {
          localStorage.removeItem('authTokens');
          // Optionally, you can redirect or perform additional actions here.
          window.location.href = "/login"; // Redirect to the login page after logout
        },
        label: "התנתק",
        icon: <CiLogout size={20} />,
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
      className={`fixed right-0 top-0 z-40 h-full bg-black text-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "250px" }}
      dir="rtl"
    >
      <div className="p-4">
        <h1 className="text-right text-lg font-bold">Vibez</h1>
      </div>
      <div className="px-4 mt-10">
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
                    <span className="text-right" onClick={item.action}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Rights/>
    </aside>
  );
};

export default SideBar;
