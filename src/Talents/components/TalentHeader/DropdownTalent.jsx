import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logOut from "../../functions/auth/logOut";
import getTalentDetails from "../../functions/crud/getTalentDetails";
import { CiBoxList, CiLogout, CiUser } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

function DropdownTalent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [talent, setTalent] = useState({});

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const talent_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getTalentDetails(token, setTalent, talent_id);
    }
  }, [token]);

  const firstName = talent?.first_name
    ? talent.first_name.charAt(0).toUpperCase() +
      talent.first_name.slice(1).toLowerCase()
    : "User";

  const lastName = talent?.last_name
    ? talent.last_name.charAt(0).toUpperCase() +
      talent.last_name.slice(1).toLowerCase()
    : "";

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if the ESC key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {firstName} {lastName}
          </span>
          <span className="block text-xs">{talent.job_type}</span>
        </span>
        <span className="h-14 w-14 rounded-full">
          <img
            src={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
              talent.profile_picture
            }`}
            alt="User"
            className="rounded-full"
          />
        </span>

        <MdKeyboardArrowDown size={18} />
      </Link>

      {/* Dropdown */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/talent/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <CiUser className="text-purple-500" size={24} />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <CiBoxList className="text-purple-500" size={24} />
              My Searchings
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={logOut}
        >
          <CiLogout className="text-purple-500" size={24} />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default DropdownTalent;
