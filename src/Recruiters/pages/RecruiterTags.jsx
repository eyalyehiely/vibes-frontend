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
import { IoTrashOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { RiFileExcel2Line } from "react-icons/ri";

function RecruiterTags() {
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
          // Fetch recruiter details before getting jobs
          await getRecruiterDetails(token, setRecruiter, recruiter_id);

          await getRecruiterJobs(recruiter_id, token, async (fetchedJobs) => {
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
          setLoading(false); // Stop loader after fetching jobs
        }
      })();
    } else {
      setLoading(false);
      console.error("Invalid token or recruiter ID.");
    }
  }, [token, recruiter_id, recruiter.first_name]);

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
        ID: job.id || "N/A",
        Title: job.title || "N/A",
        Description: job.description || "N/A",
        Location: job.location || "N/A",
        Salary: job.salary || "N/A",
        Division: job.division || "N/A",
        Type: job.job_type || "N/A",
        Sitting: job.job_sitting || "N/A",
        End_date: job.end_date || "N/A",
        // Requirements : job.requirements || "N/A",
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
        <JobHeader setJobs={setJobs} />

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
                      <EditJob job_id={job.id} setJobs={setJobs} job={job} />

                      <button
                        onClick={() => handleViewTalents(job.id)}
                        className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                      >
                        {/* View Talents */}
                        <CiSearch size={19} color="black" />
                      </button>
                    </div>
                  }
                </div>
              ))
            ) : (
              <div className="justify-center">
                <p className=" text-gray-600 dark:text-gray-400 mt-8 flex flex-row  justify-center">
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
