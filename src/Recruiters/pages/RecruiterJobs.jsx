import React, { useEffect, useState } from "react";
import JobHeader from "../components/Jobs/JobHeader";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import Drag from "../../js/drag";
import getCompanyJobs from "../../Companies/functions/crud/job/getCompanyJobs";
import { jwtDecode } from "jwt-decode"; // Correct import
import deleteJob from "../../Companies/functions/crud/job/deleteJob";
import EditJob from "../../Companies/components/Jobs/EditJob";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import swal from "sweetalert";
import * as XLSX from "xlsx";
import getRecruiterDetails from "../../Companies/functions/crud/recruiter/getRecruiterDetails";
import SearchTalents from '../components/Jobs/SearchTalents'

function RecruiterJobs() {
  checkRecruiterToken();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken ? decodedToken.user_id : null;
  const receruiterName = decodedToken ? decodedToken.first_name : null;

  useEffect(() => {
    if (token) {
      getCompanyJobs(company_id, token, async (fetchedJobs) => {
        // Fetch recruiter details for each job
        const jobsWithRecruiterNames = await Promise.all(
          fetchedJobs.map(async (job) => {
            const recruiterDetails = await getRecruiterDetails(
              job.recruiter,
              token
            );
            return {
              ...job,
              recruiterName: recruiterDetails
                ? `${recruiterDetails.first_name} ${recruiterDetails.last_name}`
                : "Unknown recruiter", // Fallback if recruiter not found
            };
          })
        );
        setJobs(jobsWithRecruiterNames);
      }).finally(() => setLoading(false));
    }
  }, [token]);

  useEffect(() => {
    Drag();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  const exportToExcel = () => {
    if (jobs.length > 0) {
      const dataToExport = jobs.map((job, index) => ({
        Number: index + 1,
        Title: job.title,
        Description: job.description,
        Division: job.division,
        Location: job.location,
        Recruiter: job.recruiterName, // Include recruiter name
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
      XLSX.writeFile(workbook, `${receruiterName}-open jobs.xlsx`);
    } else {
      swal({
        title: "No jobs to export",
        icon: "warning",
        timer: 1000,
        button: false,
      });
    }
  };

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-5xl">
        <JobHeader />

        <div className="mt-9">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {receruiterName} Jobs ({jobs.length || 0})
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              >
                Export to Excel
              </button>
            </div>
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div
                  key={index}
                  className="border-gray-200 relative rounded-lg border bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="absolute right-0 top-0 mr-4 mt-4">
                    <button
                      className="text-red-600 hover:text-red-800" // Red button with hover effect
                      onClick={() =>
                        deleteJob(job.id, company_id, token, setJobs)
                      }
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none" // No fill so the paths are colored individually
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 15h2v6h-2zM17 15h2v6h-2z"
                          className="text-red-600 hover:text-red-800 fill-current"
                        />
                        <path
                          d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z"
                          className="text-red-600 hover:text-red-800 fill-current" // Red paths with hover effect
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <h5 className="mb-1 text-lg font-bold text-primary dark:text-white">
                      {job.title}
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
                    <p className="mb-1">
                      <strong>Recruiter:</strong> {job.recruiterName}
                    </p>
                    <p className="mb-1">
                      <strong>End Date:</strong> {job.end_date}
                    </p>
                    <p className="mb-1">
                      <strong>Sitting:</strong> {job.job_sitting}
                    </p>
                    <p className="mb-1">
                      <strong>Is Relevant:</strong>{" "}
                      {job.is_relevant ? "Yes" : "No"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                  <EditJob/>
                  <SearchTalents job_id={job.id}/> 
                  </div>
                 
                  
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
