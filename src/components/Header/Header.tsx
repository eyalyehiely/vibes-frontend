import { useState, useEffect } from 'react';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import SearchFriends from '../../pages/Home/SearchFriends';
import searchFriends from '../../utils/searchFriends';
import getUserDetails from '../../utils/crud/user/getUserDetails';
import { jwtDecode } from "jwt-decode";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [isToggling, setIsToggling] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false); // Tracks the current status of "search friends"
  const [loadingStatus, setLoadingStatus] = useState(true); // Indicates loading of initial status
  const [user, setUser] = useState<any>(null); // Tracks user details
  const token = localStorage.getItem("authTokens");
  const decodedToken = token ? jwtDecode(token) : {};
  const userId = decodedToken.user_id;


  useEffect(() => {
    const fetchUserDetails = async () => {
      await getUserDetails(token, setUser, userId);
      setLoadingStatus(false); // Set loading to false after fetching details
    };

    fetchUserDetails();
  }, [token, userId]);

  useEffect(() => {
    if (user && user.search_friends !== undefined) {
      setToggleStatus(user.search_friends);
    }
  }, [user]);

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
            {loadingStatus ? (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            ) : (
              <button
                onClick={handleToggle}
                className={`px-4 py-2 rounded text-white ${
                  toggleStatus ? 'bg-green-500' : 'bg-blue-500'
                } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isToggling}
              >
                {toggleStatus ? 'Searching Active' : 'Activate Search'}
              </button>
            )}

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