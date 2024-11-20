import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logOut from "../../../Talents/functions/auth/logOut";
import getRecruiterDetails from "../../functions/crud/getRecruiterDetails";
import { CiBoxList, CiLogout, CiUser } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

function DropdownRecruiter() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recruiter, setRecruiter] = useState({});

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;

  useEffect(() => {
    if (token && recruiter_id) {
      getRecruiterDetails(token, setRecruiter, recruiter_id);
    }
  }, [token, recruiter_id]);

  const firstName = recruiter?.first_name || "";
  const lastName = recruiter?.last_name || "";
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  const userType = recruiter?.user_type || "Recruiter";

  // Close the dropdown when clicking outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close the dropdown if the ESC key is pressed
  useEffect(() => {
    const keyHandler = (event) => {
      if (!dropdownOpen || event.key !== "Escape") return;
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
            {capitalizedFirstName} {capitalizedLastName}
          </span>
          <span className="block text-xs">{userType}</span>
        </span>

        <span className="h-14 w-14 rounded-full">
          <img
            src={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
              recruiter.profile_picture
            }`}
            alt="User"
            className="rounded-full"
          />
        </span>
        <MdKeyboardArrowDown size={18} />
      </Link>

      {/* Dropdown Start */}
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
              to="/recruiter/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <CiUser className="text-purple-500" size={24} />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/recruiter/my_colleagues"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <CiBoxList className="text-purple-500" size={24} />
              My Colleagues
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
      {/* Dropdown End */}
    </div>
  );
}

export default DropdownRecruiter;
