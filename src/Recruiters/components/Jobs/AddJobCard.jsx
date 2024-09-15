import React, { useState, useEffect } from "react";
import SwitcherThree from "../../../components/Switchers/SwitcherThree";
import CreatableSelect from "react-select/creatable";
import createJob from "../../../Companies/functions/crud/job/createJob";
import { jwtDecode } from "jwt-decode";
import getRecruiterDetails from "../../functions/crud/getRecruiterDetails";
import getCompanyDetails from "../../../Companies/functions/crud/company/getCompanyDetails";

const AddJobCard = ({ popupOpen, setPopupOpen }) => {
  const [recruiter, setRecruiter] = useState(null); // Initialize as null to handle loading state
  const [company, setCompany] = useState(null); // Same for company
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // To show loader until recruiter and company details are fetched
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken ? decodedToken.company_id : null;
  const recruiter_id = decodedToken ? decodedToken.user_id : null;

  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    division: "", // Set this to be updated dynamically
    job_type: "",
    job_sitting: "",
    end_date: "",
    is_relevant: false,
    requirements: [],
    company: company_id,
    recruiter: "", // Start with an empty string, then update after fetching recruiter details
  });

  // Fetch recruiter and company details
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const recruiterDetails = await getRecruiterDetails(token, setRecruiter, recruiter_id);
          const companyDetails = await getCompanyDetails(setCompany, company_id, token);

          setRecruiter(recruiterDetails);
          setCompany(companyDetails);
          setData((prevData) => ({
            ...prevData,
            recruiter: recruiterDetails?.first_name || "", // Safely access first_name
            division: recruiterDetails?.division || "", // Safely access division
          }));
        } catch (error) {
          console.error("Error fetching recruiter or company details:", error);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };
      fetchData();
    }
  }, [token, recruiter_id, company_id]);

  // Handle closing the popup
  const handleClose = () => {
    setPopupOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle requirements change
  const handleRequirementsChange = (selectedOptions) => {
    const updatedRequirements = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  // Handle creating new requirement option
  const handleCreateOption = (inputValue) => {
    const updatedRequirements = [...data.requirements, inputValue];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  // Prepare requirements for display
  const filteredRequirements = (data.requirements || []).map((requirement) => ({
    label: requirement,
    value: requirement,
  }));

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && company_id) {
      createJob(data, company_id, token, setJobs, handleClose)
        .then((response) => {
          console.log("Job created successfully:", response.data);
          setPopupOpen(false); // Close popup on success
        })
        .catch((error) => {
          console.error("Failed to create job:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading message until data is fetched
  }

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
          {/* title */}
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
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.title}
              onChange={handleInputChange}
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

          {/* Division */}
          <div className="mb-5">
            <label
              htmlFor="division"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Division:
            </label>
            <select
              name="division"
              id="division"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.division}
              onChange={handleInputChange}
            >
              <option value="">Select division</option>
              {Array.isArray(company?.divisions) ? (
                company.divisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))
              ) : (
                <option value="">No divisions available</option>
              )}
            </select>
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

          {/* recruiter */}
          <div className="mb-5">
            <label
              htmlFor="recruiter"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Recruiter:
            </label>
            <input
              type="text"
              name="recruiter"
              id="recruiter"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              value={data.recruiter} // Binding the value to data.recruiter
              readOnly // Prevents editing since it's auto-fetched
            />
          </div>

          {/* Other form fields */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
          >
            Add job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobCard;