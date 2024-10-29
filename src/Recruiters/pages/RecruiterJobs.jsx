import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobHeader from "../components/Jobs/JobHeader";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import Drag from "../../js/drag";
import getRecruiterJobs from "../functions/crud/getRecruiterJobs";
import { jwtDecode } from "jwt-decode";
import deleteJob from "../../Companies/functions/crud/job/deleteJob";
import EditJob from "../../Companies/components/Jobs/EditJob";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import swal from "sweetalert";
import * as XLSX from "xlsx";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";

function RecruiterJobs() {
  checkRecruiterToken();
  const [jobs, setJobs] = useState([]);
  const [recruiter, setRecruiter] = useState({});
  const [loading, setLoading] = useState(true); // Loader for job fetching
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;
  const company_id = decodedToken ? decodedToken.company_id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (token && recruiter_id) {
      (async () => {
        try {
          await getRecruiterJobs(recruiter_id, token, async (fetchedJobs) => {
            const jobsWithRecruiterNames = await Promise.all(
              fetchedJobs.map(async (job) => {
                try {
                  return {
                    ...job,
                    recruiterName: recruiterDetails
                      ? `${recruiterDetails.first_name} ${recruiterDetails.last_name}`
                      : "Unknown recruiter",
                  };
                } catch (err) {
                  console.error("Error fetching recruiter details:", err);
                  return { ...job, recruiterName: "Unknown recruiter" };
                }
              })
            );
            setJobs(jobsWithRecruiterNames);
          });
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false); // Stop loader after fetching jobs
        }
      })();
    } else {
      setLoading(false);
      console.error("Invalid token or recruiter ID.");
    }
  }, [token, recruiter_id]);

  useEffect(() => {
    if (token && recruiter_id) {
      getRecruiterDetails(token, setRecruiter, recruiter_id);
    }
  }, [token, recruiter_id]);

  useEffect(() => {
    Drag();
  }, []);

  const handleViewTalents = (job_id) => {
    navigate(`/recruiter/jobs/${job_id}/talents`);
  };

  // Search functionality
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

  // Export to Excel function
  const exportToExcel = () => {
    if (jobs.length > 0) {
      const dataToExport = jobs.map((job, index) => ({
        Number: index + 1,
        Title: job.title || "N/A",
        Description: job.description || "N/A",
        Division: job.division || "N/A",
        Location: job.location || "N/A",
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

  // Handle job deletion
  const handleDelete = (jobId) => {
    deleteJob(jobId, token, setJobs);
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-5xl">
        <JobHeader />

        <div className="mt-9">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              >
                Export to Excel
              </button>
              <div className="col-span-12 mb-4">
                <input
                  type="text"
                  placeholder="Search job..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            Presenting: {filteredJobs.length}
          </h4>

          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="border-gray-200 relative rounded-lg border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="absolute right-0 top-0 mr-4 mt-4">
                    {/* delete job */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(job.id)}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 15h2v6h-2zM17 15h2v6h-2z"
                          className="text-red-600 hover:text-red-800 fill-current"
                        />
                        <path
                          d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z"
                          className="text-red-600 hover:text-red-800 fill-current"
                        />
                      </svg>
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
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p className="mb-1">
                      <strong>Division:</strong> {job.division}
                    </p>
                    {console.log(job.recruiterName)}
                    <p className="mb-1">
                      <strong>End Date:</strong> {job.end_date}
                    </p>
                    <p className="mb-1">
                      <strong>Sitting:</strong> {job.job_sitting}
                    </p>
                  </div>

                  {
                    <div className="flex gap-3">
                      <EditJob job_id={job.id} />
                      <button
                        onClick={() => handleViewTalents(job.id)}
                        className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                      >
                        {/* View Talents */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                      </button>
                    </div>
                  }
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No jobs available.
              </p>
            )}
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
}

export default RecruiterJobs;
