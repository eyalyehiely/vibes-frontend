import React, { useState, useEffect } from "react";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import fetchTalentsForJob from "../../../Companies/functions/crud/job/fetchTalentsForJob";
import saveTalentToJob from "../../functions/crud/saveTalentToJob"; // Import the save function
import { CiBookmark } from "react-icons/ci";
import swal from "sweetalert";

function RecruiterSearchTalents({ job_id }) {
  checkRecruiterToken();

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSave = async (
    talentId,
    firstName,
    lastName,
    talentForm,
    talentCv
  ) => {
    try {
      await saveTalentToJob(job_id, firstName, lastName, talentId, talentForm, talentCv, token);
      swal({
        title: "Success!",
        text: "Talent saved successfully.",
        icon: "success",
        timer: 2000,
        buttons: false,
      });
    } catch (error) {
      console.error("Error saving talent:", error);
      swal({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
        timer: 2000,
        buttons: false,
      });
    }
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
                    <button
                      onClick={() =>
                        handleSave(
                          talent.user_id,
                          talent.first_name,
                          talent.last_name,
                          talent.match_by_form,
                          talent.match_by_cv
                        )
                      }
                      className="btn btn-outline-primary btn-sm"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <CiBookmark size={18} />
                      Save
                    </button>
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
