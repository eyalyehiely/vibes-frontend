import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import fetchTalentsForJob from "../../../Companies/functions/crud/job/fetchTalentsForJob";
import TalentCard from "../../../Companies/components/Jobs/TalentCard";

function RecruiterSearchTalents({ job_id }) {
  checkRecruiterToken();

  // Retrieve the token from local storage
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  // State to hold fetched talents
  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch talents when the component mounts or when job_id/token changes
  useEffect(() => {
    const fetchTalents = async () => {
      if (job_id && token) {
        try {
          setIsLoading(true);
          await fetchTalentsForJob(job_id, setTalents, token);
        } catch (error) {
          console.error("Error fetching talents:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTalents();
  }, [job_id, token]);

  if (!job_id) {
    return <p>Job ID is not available.</p>;
  }

  const handleTalentClick = (talentId) => {
    setSelectedTalentId(talentId);
    setShowTalentModal(true);
  };

  const handleCloseTalentModal = () => {
    setShowTalentModal(false);
    setSelectedTalentId(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Number
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                CV Match
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Form Match
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-5 text-center">
                  Loading talents...
                </td>
              </tr>
            ) : talents.length > 0 ? (
              talents.map((talent, index) => (
                <tr key={`${talent.id}`}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {talent.first_name} {talent.last_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        talent.match_by_cv >= 80
                          ? "bg-success text-success"
                          : talent.match_by_cv >= 50 && talent.match_by_cv < 80
                          ? "bg-warning text-warning"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {talent.match_by_cv || 0}%
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        talent.match_by_form >= 80
                          ? "bg-success text-success"
                          : talent.match_by_form > 50 &&
                            talent.match_by_form < 80
                          ? "bg-warning text-warning"
                          : "bg-danger text-danger"
                      }`}
                    >
                      {talent.match_by_form || 0}%
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      {/* TalentCard button */}
                      <TalentCard talent_id={talent.user_id} />

                      {/* Message button */}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        // onClick={handleShow}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C11.6 22 11.3 21.9 11 21.7L7.1 19.1C7 19.1 6.9 19 6.8 19H6C2.7 19 0 16.3 0 13V6C0 2.7 2.7 0 6 0H18C21.3 0 24 2.7 24 6V13C24 16.3 21.3 19 18 19H14.3L12.4 21.1C12.3 21.2 12.1 21.3 12 21.3 12 21.3 12 21.3 12 21.3 12 21.4 12 21.5 12 21.6 12 21.9 12 22 12 22Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-5 text-center">
                  No talents found for this job.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecruiterSearchTalents;
