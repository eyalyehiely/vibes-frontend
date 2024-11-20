import { useEffect, useRef, useState } from "react";
import RecruiterAddJob from "./RecruiterAddJob";
import getRecruiterJobs from "../../functions/crud/getRecruiterJobs";
import {jwtDecode} from "jwt-decode"; 
import { FaPlus } from "react-icons/fa6";


const JobHeader = ({ setJobs }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;

  const trigger = useRef(null);
  const popup = useRef(null);

  // Fetch jobs when the component mounts
  useEffect(() => {
    if (token && recruiter_id) {
      getRecruiterJobs(recruiter_id, token, setJobs)
        .catch((error) => {
          console.error("Error fetching recruiter jobs:", error);
        });
    } else {
      console.error("Invalid token or recruiter ID.");
    }
  }, [token, recruiter_id, setJobs]);

  // Close popup on click outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!popup.current) return;
      if (
        !popupOpen ||
        popup.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setPopupOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [popupOpen]);

  // Close popup on ESC key press
  useEffect(() => {
    const keyHandler = (event) => {
      if (!popupOpen || event.keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [popupOpen]);

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Available Jobs
        </h3>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div>
          <button
            ref={trigger}
            onClick={() => setPopupOpen(!popupOpen)}
            className="flex items-center gap-2 rounded bg-purple-500 px-4.5 py-2 font-medium text-white hover:bg-purple-600"
          >
            <FaPlus size={19}/>
            Create Job
          </button>

          {/* Task Popup Start */}
          <RecruiterAddJob
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            setJobs={setJobs} // Pass setJobs to refresh job list on job creation
          />
          {/* Task Popup End */}
        </div>
      </div>
    </div>
  );
};

export default JobHeader;