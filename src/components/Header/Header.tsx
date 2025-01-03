import  { useState } from 'react';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import SearchFriends from '../../pages/Home/SearchFriends';
import searchFriends from '../../utils/searchFriends';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [isToggling, setIsToggling] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const token = localStorage.getItem("authTokens");

  const handleToggle = async () => {
    if (isToggling) return; // Prevent multiple clicks
    setIsToggling(true);

    try {
      await searchFriends(token, setToggleStatus, setIsToggling);
    } catch (error) {
      console.error('Error toggling search friend:', error);
      alert('An error occurred while processing your request.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-999 flex w-full bg-gray drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
      dir="rtl"
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="relative block h-5.5 w-5.5">
                {/* Hamburger icon */}
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white ${
                    props.sidebarOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white mt-1 transform transition-transform ${
                    props.sidebarOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-black dark:bg-white mt-1 transform transition-transform ${
                    props.sidebarOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

      

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Search Friends */}
            <SearchFriends />

            {/* Toggle Button */}
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded text-white ${
                toggleStatus ? 'bg-green-500' : 'bg-blue-500'
              } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isToggling}
            >
              {toggleStatus ? 'Searching Active' : 'Activate Search'}
            </button>

            {/* Notification Menu */}
            <DropdownNotification />
          </ul>

          {/* User Area */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;