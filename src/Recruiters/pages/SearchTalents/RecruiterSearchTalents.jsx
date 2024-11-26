import React, { useState, useEffect } from "react";
import fetchTalentsForJob from "../../../Companies/functions/crud/job/fetchTalentsForJob";
import saveTalentToJob from "../../functions/crud/saveTalentToJob";
import { CiBookmark } from "react-icons/ci";
import swal from "sweetalert";
import getJobDetails from "../../../Companies/functions/crud/job/getJobDetails";
import {
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaLaptopHouse,
  FaList,
} from "react-icons/fa";
import {
  MdOutlineFormatListBulleted,
  MdOutlineLocationOn,
} from "react-icons/md";

function RecruiterSearchTalents({ job_id }) {
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    matchByForm: true,
    matchByCv: true,
    locationMatch: false,
    sittingMatch: false,
    selectedRequirements: [],
  });
  const [currentJob, setCurrentJob] = useState([]);
  const [allRequirementsSelected, setAllRequirementsSelected] = useState(false);

  useEffect(() => {
    const fetchTalents = async () => {
      if (job_id && token) {
        try {
          setIsLoading(true);
          await fetchTalentsForJob(job_id, setTalents, token);
          const jobDetails = await getJobDetails(job_id, token);
          setCurrentJob(jobDetails);
          setPreferences((prev) => ({
            ...prev,
            selectedRequirements: jobDetails?.requirements || [],
          }));
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
      await saveTalentToJob(
        job_id,
        firstName,
        lastName,
        talentId,
        talentForm,
        talentCv,
        token
      );
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

  const toggleAllRequirements = () => {
    if (allRequirementsSelected) {
      setPreferences((prev) => ({ ...prev, selectedRequirements: [] }));
    } else {
      setPreferences((prev) => ({
        ...prev,
        selectedRequirements: currentJob?.requirements || [],
      }));
    }
    setAllRequirementsSelected(!allRequirementsSelected);
  };

  const toggleRequirement = (requirement) => {
    setPreferences((prev) => {
      const isSelected = prev.selectedRequirements.includes(requirement);
      const updatedRequirements = isSelected
        ? prev.selectedRequirements.filter((req) => req !== requirement)
        : [...prev.selectedRequirements, requirement];
      return { ...prev, selectedRequirements: updatedRequirements };
    });
  };

  const filteredTalents = talents.filter((talent) => {
    // Match by Form Match Preference
    const matchByForm = preferences.matchByForm
      ? (talent.match_by_form || 0) >= 30
      : true;

    // Match by CV Match Preference
    const matchByCv = preferences.matchByCv
      ? (talent.match_by_cv || 0) >= 30
      : true;

    // Match by Location Preference
    const locationMatch = preferences.locationMatch
      ? (talent.residence || "").toLowerCase() ===
        (currentJob?.location || "").toLowerCase()
      : true;

    // Match by Job Sitting Preference
    const sittingMatch = preferences.sittingMatch
      ? (talent.job_sitting || "").toLowerCase() ===
        (currentJob?.job_sitting || "").toLowerCase()
      : true;

    // Match by Selected Requirements (Skills Match)
    const requirementsMatch =
      preferences.selectedRequirements.length > 0
        ? (talent.skills || []).some((skill) =>
            (preferences.selectedRequirements || []).includes(
              skill.toLowerCase()
            )
          )
        : true;

    // Talent is shown only if all preferences are true
    return (
      matchByForm &&
      matchByCv &&
      locationMatch &&
      sittingMatch &&
      requirementsMatch
    );
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-800 dark:text-gray-200 mb-4 text-xl font-semibold">
            Preferences
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Match by Form */}
            <label className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg">
              <FaClipboardCheck className="text-xl text-blue-500" />
              <input
                type="checkbox"
                checked={preferences.matchByForm}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    matchByForm: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
              <span className="text-gray-800 dark:text-gray-300">
                Match by Form
              </span>
            </label>

            {/* Match by CV */}
            <label className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg">
              <MdOutlineFormatListBulleted className="text-xl text-green-500" />
              <input
                type="checkbox"
                checked={preferences.matchByCv}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    matchByCv: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
              <span className="text-gray-800 dark:text-gray-300">
                Match by CV
              </span>
            </label>

            {/* Location Match */}
            <label className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg">
              <MdOutlineLocationOn className="text-red-500 text-xl" />
              <input
                type="checkbox"
                checked={preferences.locationMatch}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    locationMatch: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
              <span className="text-gray-800 dark:text-gray-300">
                Location Match
              </span>
            </label>

            {/* Job Sitting Match */}
            <label className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg">
              <FaLaptopHouse className="text-xl text-purple-500" />
              <input
                type="checkbox"
                checked={preferences.sittingMatch}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    sittingMatch: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />
              <span className="text-gray-800 dark:text-gray-300">
                Job Sitting Match
              </span>
            </label>
          </div>

          {/* Job Requirements */}
          <div className="mt-6">
            <h4 className="text-gray-800 dark:text-gray-200 mb-4 text-lg font-semibold">
              <FaList className="mr-2 inline-block text-blue-500" />
              Job Requirements
            </h4>
            <label className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg">
              <input
                type="checkbox"
                checked={allRequirementsSelected}
                onChange={toggleAllRequirements}
                className="h-5 w-5"
              />
              <span className="text-gray-800 dark:text-gray-300">
                Select All
              </span>
            </label>
            <div className="mt-4 space-y-2">
              {currentJob?.requirements?.map((requirement, index) => (
                <label
                  key={index}
                  className="dark:bg-gray-700 flex items-center space-x-4 rounded-lg bg-white p-2 shadow hover:shadow-lg"
                >
                  <input
                    type="checkbox"
                    checked={preferences.selectedRequirements.includes(
                      requirement
                    )}
                    onChange={() => toggleRequirement(requirement)}
                    className="h-5 w-5"
                  />
                  <span className="text-gray-800 dark:text-gray-300">
                    {requirement}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
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
              {preferences.matchByCv && (
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  CV Match
                </th>
              )}
              {preferences.matchByForm && (
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Form Match
                </th>
              )}
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
            ) : filteredTalents.length > 0 ? (
              filteredTalents.map((talent, index) => (
                <tr key={`${talent.id}`}>
                  <td className="border-b px-4 py-5">{index + 1}</td>
                  <td className="border-b px-4 py-5">
                    {talent.first_name} {talent.last_name}
                  </td>
                  {preferences.matchByCv && (
                    <td className="border-b px-4 py-5">
                      <span
                        className={`inline-block rounded-full px-3 py-1 ${
                          talent.match_by_cv >= 80
                            ? "bg-green-100 text-green-800"
                            : talent.match_by_cv >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {talent.match_by_cv || 0}%
                      </span>
                    </td>
                  )}
                  {preferences.matchByForm && (
                    <td className="border-b px-4 py-5">
                      <span
                        className={`inline-block rounded-full px-3 py-1 ${
                          talent.match_by_form >= 80
                            ? "bg-green-100 text-green-800"
                            : talent.match_by_form >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {talent.match_by_form || 0}%
                      </span>
                    </td>
                  )}
                  <td className="border-b px-4 py-5">
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
                  No talents found matching the selected preferences.
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
