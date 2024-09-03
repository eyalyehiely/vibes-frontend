import React, { useEffect, useState } from "react";
import TaskHeader from "../components/Jobs/JobHeader";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import Drag from "../../js/drag";
import getCompanyJobs from "../functions/crud/job/getCompanyJobs";
import { jwtDecode } from "jwt-decode";
import deleteJob from "../functions/crud/job/deleteJob";
import EditJob from "../components/Jobs/EditJob";
import checkCompanyToken from '../functions/auth/checkCompanyToken'
import swal from "sweetalert";
import * as XLSX from "xlsx";

function AvailableJobs() {
  checkCompanyToken()
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken ? decodedToken.user_id : null;
  const company_name = decodedToken ? decodedToken.name : null;

  useEffect(() => {
    if (token) {
      getCompanyJobs(company_id, token, setJobs).finally(() =>
        setLoading(false)
      );
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
        Title: `${job.first_name} ${job.last_name}`,
        Description: job.email,
        Division: job.division,
        Location: job.location,
        Recruiter: job.recruiter,
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
      XLSX.writeFile(workbook, `${company_name}-jobs.xlsx`);
    } else {
      swal({
        title: 'No jobs to export',
        icon: 'warning', // Changed 'danger' to 'warning', as 'danger' is not a valid Swal icon
        timer: 1000,
        button: false,
      });
    }
  };

  return (
    <CompanyDefaultLayout>
      <div className="mx-auto max-w-5xl">
        <TaskHeader />

        <div className="mt-9">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Company Available Jobs ({jobs.length || 0}) 
            <div className="flex items-center gap-4">
            <button
              onClick={exportToExcel}
              className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              Export to Excel
            </button>
          </div>
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div
                  key={index}
                  className="border-gray-300 rounded-lg border bg-white p-5 shadow-sm dark:border-strokedark dark:bg-boxdark"
                >
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  <strong>Title: </strong>{job.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                  <strong>Description: </strong>{job.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                  <strong>Division: </strong>{job.division}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>Location: </strong> {job.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>Salary: </strong> {job.salary}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>Job Type: </strong> {job.job_type}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>Sitting: </strong> {job.job_sitting}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>End Date: </strong> {job.end_date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <strong>Recruiter: </strong> {job.recruiter}
                  </p>
                  <EditJob/>
                  <button
                    className="ml-4 rounded-full text-rose-500 hover:text-rose-600"
                    onClick={() =>
                      deleteJob(job.id, company_id, token, setJobs)
                    }
                  >
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                      <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                      <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                    </svg>
                  </button>
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
    </CompanyDefaultLayout>
  );
}

export default AvailableJobs;
