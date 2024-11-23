import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
import getRecruiterJobs from "../../functions/crud/getRecruiterJobs";
import { jwtDecode } from "jwt-decode";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import swal from "sweetalert";
import * as XLSX from "xlsx";
import getRecruiterDetails from "../../functions/crud/getRecruiterDetails";
import { IoTrashOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import deleteTalentFromJob from "../../functions/crud/deleteTalentFromJob";

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
          [job.title, job.location, job.end_date]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(query))
        )
      );
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchQuery, jobs]);

  const exportToExcel = (job) => {
    if (job.relevant_talents && job.relevant_talents.length > 0) {
      const dataToExport = job.relevant_talents.map((talent, index) => ({
        Number: index + 1,
        "Full Name": `${talent.first_name} ${talent.last_name}` || "N/A",
        "Match by CV": `${talent.match_by_cv || 0}%`,
        "Match by Form": `${talent.match_by_form || 0}%`,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${job.title}_Talents`);
      XLSX.writeFile(
        workbook,
        `${job.title.replace(/\s+/g, "_")}_relevant_talents.xlsx`
      );
    } else {
      swal({
        title: "No relevant talents to export",
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

  const updateJobState = (job_id, talent_id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === job_id) {
          return {
            ...job,
            relevant_talents: job.relevant_talents.filter(
              (talent) => talent.talent_id !== talent_id
            ),
          };
        }
        return job;
      })
    );
  };

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mt-9">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            <div className="flex items-center gap-4 dark:mt-2">
              <h3 className="mb-2 pl-2 text-title-lg font-semibold text-black dark:text-white">
                My Tags ({filteredJobs.length})
              </h3>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Search job..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </h4>

          <div className="mt-4 grid grid-cols-1 gap-8 dark:bg-black sm:grid-cols-1 xl:grid-cols-1">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div className="relative ">
                  <div
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer rounded-lg border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-strokedark dark:bg-boxdark"
                    onClick={() => toggleJobDetails(job.id)}
                  >
                    <div className="mb-4 dark:bg-black">
                      <h5 className="mb-2 flex items-center text-lg font-bold text-primary dark:text-white">
                        {job.title}
                      </h5>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            job.is_relevant
                              ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                              : "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300"
                          }`}
                        >
                          {job.is_relevant ? "Open" : "Close"}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm ">
                        <span className="inline-flex items-center ">
                          <svg
                            className="text-gray-400 dark:text-gray-500 mr-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 1.5A8.5 8.5 0 1018.5 10 8.51 8.51 0 0010 1.5zm0 15.6A7.1 7.1 0 1117.1 10 7.12 7.12 0 0110 17.1zm0-3.4A3.7 3.7 0 1113.7 10 3.71 3.71 0 0110 13.7z" />
                          </svg>
                          {job.location}
                        </span>
                        &nbsp;&middot;&nbsp;
                        {job.job_type}
                      </p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      <p className="mb-1 flex items-center">
                        <svg
                          className="text-gray-400 dark:text-gray-500 mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 1.5A8.5 8.5 0 1018.5 10 8.51 8.51 0 0010 1.5zm0 15.6A7.1 7.1 0 1117.1 10 7.12 7.12 0 0110 17.1zm0-3.4A3.7 3.7 0 1113.7 10 3.71 3.71 0 0110 13.7z" />
                        </svg>
                        <strong>End Date:</strong> {job.end_date}
                      </p>
                      <button
                        onClick={() => exportToExcel(job)}
                        className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                      >
                        <RiFileExcel2Line size={20} className="mr-2" />
                        Export to Excel
                      </button>
                    </div>
                  </div>

                  {expandedJobId === job.id && (
                    // <div className="bg-gray-100 dark:bg-gray-800 mt-7 w-full">
                    <table className="bg-gray-400 dark:bg-gray-900 mt-7 w-full">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                          <th className="dark:border-gray-600 border px-4 py-2 text-center text-sm font-medium">
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
                          <th className="dark:border-gray-600 border px-4 py-2 text-center text-sm font-medium">
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
                                <strong>{index + 1}</strong>
                              </td>
                              <td className="dark:border-gray-600 border px-4 py-2">
                                <strong>
                                  {talent.first_name} {talent.last_name}
                                </strong>
                              </td>
                              <td className="dark:border-gray-600 border px-4 py-2">
                                <p
                                  className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                    talent.match_by_cv >= 80
                                      ? "bg-success text-success"
                                      : talent.match_by_cv > 50 &&
                                        talent.match_by_cv < 80
                                      ? "bg-warning text-warning"
                                      : "bg-danger text-danger"
                                  }`}
                                >
                                  {talent.match_by_cv || 0}%
                                </p>
                              </td>
                              <td className="dark:border-gray-600 border px-4 py-2">
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
                                    className="text-red-600 hover:text-red-800"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent parent card click
                                      deleteTalentFromJob(job.id, token, talent.talent_id,updateJobState); // Pass job ID and talent ID
                                    }}
                                  >
                                    <IoTrashOutline
                                      size={16}
                                      className="ml-4"
                                      color="red"
                                    />
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
                              No data available for this tag.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    // </div>
                  )}
                </div>
              ))
            ) : (
              <div className="justify-center">
                <p className="text-gray-600 dark:text-gray-400 mt-8 flex justify-center">
                  No tags available for {searchQuery}.
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
