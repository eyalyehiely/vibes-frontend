import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TagHeader from "../components/Jobs/TagHeader";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import getRecruiterJobs from "../functions/crud/getRecruiterJobs";
import { jwtDecode } from "jwt-decode";
import deleteJob from "../../Companies/functions/crud/job/deleteJob";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import swal from "sweetalert";
import * as XLSX from "xlsx";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import { IoTrashOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";

function RecruiterTags() {
  checkRecruiterToken();
  const [jobs, setJobs] = useState([]);
  const [recruiter, setRecruiter] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (token && recruiter_id) {
      (async () => {
        try {
          await getRecruiterDetails(token, setRecruiter, recruiter_id);

          await getRecruiterJobs(recruiter_id, token, (fetchedJobs) => {
            const jobsWithRecruiterNames = fetchedJobs.map((job) => ({
              ...job,
              recruiterName: recruiter.first_name
                ? `${recruiter.first_name} ${recruiter.last_name}`
                : "Unknown recruiter",
            }));
            setJobs(jobsWithRecruiterNames);
          });
        } catch (error) {
          console.error("Error fetching recruiter details or jobs:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
      console.error("Invalid token or recruiter ID.");
    }
  }, [token, recruiter_id, recruiter.first_name]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredJobs(
        jobs.filter((job) =>
          [
            job.title,
            job.division,
            job.position,
            job.recruiterName,
            job.location,
          ]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query))
        )
      );
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const exportToExcel = () => {
    if (jobs.length > 0) {
      const dataToExport = jobs.map((job, index) => ({
        Number: index + 1,
        ID: job.id || "N/A",
        Title: job.title || "N/A",
        Location: job.location || "N/A",
        End_date: job.end_date || "N/A",
        Recruiter: job.recruiterName || "N/A",
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
      XLSX.writeFile(workbook, `${recruiter.first_name}-open_jobs.xlsx`);
    } else {
      swal({
        title: "No jobs to export",
        icon: "warning",
        timer: 1000,
        button: false,
      });
    }
  };

  const toggleJobDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-5xl">
        <TagHeader setJobs={setJobs} />

        <div className="mt-9">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            <div className="mt-2 flex items-center gap-4">
              Presenting: {filteredJobs.length}
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Search job..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={exportToExcel}
                className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              >
                <RiFileExcel2Line size={19} color="black" />
              </button>
            </div>
          </h4>

          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div className="relative">
                  <div
                    className="cursor-pointer rounded-lg border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-strokedark dark:bg-boxdark"
                    onClick={() => toggleJobDetails(job.id)}
                  >
                    <div className="absolute right-0 top-0 mr-4 mt-4">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent card click
                          deleteJob(job.id, token, setJobs);
                        }}
                      >
                        <IoTrashOutline size={16} color="red" />
                      </button>
                    </div>
                    <div className="mb-4">
                      <h5 className="mb-1 text-lg font-bold text-primary dark:text-white">
                        {job.title}
                      </h5>
                      <h5>
                        Status:
                        <span
                          style={{ color: job.is_relevant ? "green" : "red" }}
                        >
                          {job.is_relevant ? " Open" : " Close"}
                        </span>
                      </h5>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">
                        {job.location} &middot; {job.job_type}
                      </p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      <p className="mb-1">
                        <strong>End Date:</strong> {job.end_date}
                      </p>
                    </div>
                  </div>

                  {expandedJobId === job.id && (
                    <div className="bg-gray-100 dark:bg-gray-800 mt-4 w-full">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="dark:border-gray-600 border px-4 py-2 text-left text-sm font-medium">
                              Number
                            </th>
                            <th className="dark:border-gray-600 border px-4 py-2 text-left text-sm font-medium">
                              Full Name
                            </th>
                            <th className="dark:border-gray-600 border px-4 py-2 text-left text-sm font-medium">
                              Match by CV
                            </th>
                            <th className="dark:border-gray-600 border px-4 py-2 text-left text-sm font-medium">
                              Match by Form
                            </th>
                            <th className="dark:border-gray-600 border px-4 py-2 text-left text-sm font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log(job.relevant_talents)}

                          {job.relevant_talents &&
                          job.relevant_talents.length > 0 ? (
                            job.relevant_talents.map((talent, index) => (
                              <tr key={index}>
                                <td className="dark:border-gray-600 border px-4 py-2">
                                  {index + 1}
                                </td>
                                <td className="dark:border-gray-600 border px-4 py-2">
                                  {talent.first_name} {talent.last_name}
                                </td>
                                <td className="dark:border-gray-600 border px-4 py-2">
                                  {talent.match_by_cv}%
                                </td>
                                <td className="dark:border-gray-600 border px-4 py-2">
                                  {talent.match_by_form}%
                                </td>
                                <td className="dark:border-gray-600 border px-4 py-2">
                                  <div className="flex items-center">
                                    <button
                                      className="px-2 text-blue-500 hover:underline"
                                      onClick={() => handleView(talent.id)}
                                    >
                                       message
                                    </button>
                                    <div className="border-gray-300 dark:border-gray-600 mx-2 h-6 border-l"></div>{" "}
                                    {/* Vertical border */}
                                    <button
                                      className="px-2 text-green-500 hover:underline"
                                      onClick={() => handleEdit(talent.id)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="dark:border-gray-600 border px-4 py-2 text-center"
                                colSpan="5"
                              >
                                No data available for this job.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="justify-center">
                <p className="text-gray-600 dark:text-gray-400 mt-8 flex justify-center">
                  No jobs available for {searchQuery}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
}

export default RecruiterTags;
