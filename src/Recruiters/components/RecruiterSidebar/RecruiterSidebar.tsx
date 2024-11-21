import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
// import Logo from '../../../images/logo/logo.svg'  ;
import Rights from "../../../components/Rights";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiPagesLine } from "react-icons/ri";
import RecruiterPicHandling  from '../../pages/Home/RecruiterPicHandling'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } rounded-lg shadow-lg`}
      // style={{ backgroundColor: '#9755a4' }}
    >

      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        {/* <NavLink to="/recruiter/home">
          <img src={Logo} alt="Logo" />
        </NavLink> */}

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
        
      </div>
      <RecruiterPicHandling />

      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-3 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-3 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/recruiter/home"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <RxDashboard size={20}/>
                  Dashboard
                </NavLink>
              </li>

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <MdOutlineCalendarMonth size={20}/>

                  Calendar
                </NavLink>
              </li>

              {/* <!-- Menu Item Tables --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/recruiter/my_colleagues' || pathname.includes('my_colleagues')
                }
              >
                {(handleClick) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/recruiter/my_colleagues"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/recruiter/my_colleagues' || pathname.includes('my_colleagues')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={() => {
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <LiaUserFriendsSolid size={20}/>
                        My colleagues
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Pages --> */}
              <SidebarLinkGroup
              activeCondition={pathname === '/recruiter/jobs' || pathname.includes('recruiter/jobs')}
            >
              {(handleClick) => {
                return (
                  <React.Fragment>
                    <NavLink
                      to="/recruiter/jobs"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname === '/recruiter/jobs' ||
                        pathname.includes('recruiter/jobs')
                          ? 'bg-graydark dark:bg-meta-4'
                          : ''
                      }`}
                      onClick={() => {
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                      }}
                    >
                      <RiPagesLine size={20}/>
                      My Jobs
                    </NavLink>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>


            <SidebarLinkGroup
              activeCondition={pathname === '/recruiter/tags' || pathname.includes('recruiter/jobs')}
            >
              {(handleClick) => {
                return (
                  <React.Fragment>
                    <NavLink
                      to="/recruiter/tags"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname === '/recruiter/tags' ||
                        pathname.includes('recruiter/tags')
                          ? 'bg-graydark dark:bg-meta-4'
                          : ''
                      }`}
                      onClick={() => {
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                      }}
                    >
                      <RiPagesLine size={20}/>
                      My Tags
                    </NavLink>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
            </ul>
          </div>


          {/* <!-- Support Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Messages --> */}
              <li>
                <NavLink
                  to="/recruiter/messages"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('messages') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <CiMail size={20}/>
                  Messages
                  <span className="absolute right-14 top-1/2 -translate-y-1/2 rounded bg-purple-500 py-1 px-2.5 text-xs font-medium text-white">
                    5
                  </span>
                  <span className="absolute right-4 block rounded bg-purple-500 py-1 px-2 text-xs font-medium text-white">
                    Pro
                  </span>
                </NavLink>
              </li>
              {/* <!-- Menu Item Messages --> */}
              <li>
                <NavLink
                  to="/recruiter/contact_us"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('messages') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <CiMail size={20}/>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
        <Rights/>
      </div>
    </aside>
  );
};

export default Sidebar;
