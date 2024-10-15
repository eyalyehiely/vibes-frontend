import React, { useState, useEffect } from "react";
import SwitcherThree from "../../../components/Switchers/SwitcherThree";
import CreatableSelect from "react-select/creatable";
import createJob from "../../../Companies/functions/crud/job/createJob";
import { jwtDecode } from "jwt-decode";
import getRecruiterDetails from "../../functions/crud/getRecruiterDetails";

const RecruiterAddJob = ({ popupOpen, setPopupOpen }) => {
  const [recruiter, setRecruiter] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for network requests
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;
  const company_id = decodedToken ? decodedToken.company_id : null;

  useEffect(() => {
    if (token && recruiter_id) {
      setLoading(true);
      getRecruiterDetails(token, setRecruiter, recruiter_id).finally(() =>
        setLoading(false)
      ); // Set loading to false after fetching recruiter details
    }
  }, [token, recruiter_id]);

  const handleClose = () => {
    setPopupOpen(false); // Assuming this closes your modal or popup
  };
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    division: recruiter?.division || [], 
    job_type: "",
    job_sitting: "",
    end_date: "",
    is_relevant: false,
    requirements: [],
    company: company_id,
    recruiter: recruiter_id,
    
  });


  useEffect(() => {
    if (recruiter && recruiter.division) {
      setData((prevData) => ({
        ...prevData,
        division: recruiter.division,
      }));
    }
  }, [recruiter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleRequirementsChange = (selectedOptions) => {
    const updatedRequirements = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const handleCreateOption = (inputValue) => {
    const updatedRequirements = [...data.requirements, inputValue];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const filteredRequirements = (data.requirements || []).map((requirement) => ({
    label: requirement,
    value: requirement,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.title || !data.description || !data.location || !data.salary) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true); // Set loading state for job creation
    if (token && company_id) {
      createJob(data, company_id, token, setJobs, handleClose)
        .then((response) => {
          console.log("Job created successfully:", response.data);
          setPopupOpen(false); // Close the popup on success
        })
        .catch((error) => {
          console.error("Failed to create job:", error);
        })
        .finally(() => setLoading(false)); // Set loading to false after job creation
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        popupOpen ? "block" : "hidden"
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={handleClose}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
              fill=""
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter job title"
              className="w-full rounded-sm border bg-white px-4.5 py-3 text-black dark:bg-boxdark dark:text-white"
              value={data.title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={7}
              placeholder="Enter job description"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* requirements */}
          <div className="mb-5">
            <label
              htmlFor="requirements"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Requirements:
            </label>
            <CreatableSelect
              options={filteredRequirements}
              value={
                Array.isArray(data.requirements)
                  ? filteredRequirements.filter((requirement) =>
                      data.requirements.includes(requirement.value)
                    )
                  : []
              }
              onChange={handleRequirementsChange}
              onCreateOption={handleCreateOption}
              isClearable
              isSearchable
              isMulti
              placeholder="Select or type to search..."
              allowCreateWhileLoading={true}
              createOptionPosition="first"
            />
          </div>

          {/* location */}
          <div className="mb-5">
            <label
              htmlFor="location"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Location:
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter job location"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.location}
              onChange={handleInputChange}
            />
          </div>

          {/* salary */}
          <div className="mb-5">
            <label
              htmlFor="salary"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Salary:
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              placeholder="Enter job salary"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.salary}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          {/* job type */}
          <div className="mb-5">
            <label
              htmlFor="job_type"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Job Type:
            </label>
            <input
              type="text"
              name="job_type"
              id="job_type"
              placeholder="Enter job type"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.job_type}
              onChange={handleInputChange}
            />
          </div>

          {/* job sitting */}
          <div className="mb-5">
            <label
              htmlFor="job_sitting"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Job Sitting:
            </label>
            <select
              name="job_sitting"
              id="job_sitting"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.job_sitting}
              onChange={handleInputChange}
            >
              <option value="">Select job sitting</option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* end date */}
          <div className="mb-5">
            <label
              htmlFor="end_date"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              End Date:
            </label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.end_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
            />
          </div>

          {/* is relevant */}
          <div className="mb-5">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Is Relevant?
            </label>
            <SwitcherThree
              checked={data.is_relevant}
              onChange={(checked) => setData({ ...data, is_relevant: checked })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded bg-purple-500 px-4.5 py-2.5 font-medium text-white hover:bg-purple-600"
          >
            {loading ? "Loading..." : "Create & Search Talents"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterAddJob;
