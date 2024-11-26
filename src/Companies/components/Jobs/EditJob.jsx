import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";
import getJobDetails from "../../functions/crud/job/getJobDetails";
import { jwtDecode } from "jwt-decode";
import updateJob from "../../functions/crud/job/updateJob";
import getCompanyDetails from "../../functions/crud/company/getCompanyDetails";
import { TiPencil } from "react-icons/ti";


function EditJob({ job_id, setJobs, job }) {
  // Determine user type (Recruiter or Company)
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const userType = decodedToken.user_type;
  const company_id =
    userType === "Company" ? decodedToken.user_id : decodedToken.company_id;
  const recruiter_id = userType === "Recruiter" ? decodedToken.user_id : null;

  // State for modal, job, and form data
  const [show, setShow] = useState(false);
  // const [job, setJob] = useState(null);
  const [company, setCompany] = useState({});
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    division: [],
    job_type: "",
    job_sitting: "",
    end_date: "",
    is_relevant: false,
    requirements: [],
    company: company_id,
    recruiter: recruiter_id,
  });

  // Fetch company details when component mounts
  useEffect(() => {
    if (token && company_id) {
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token, company_id]);

  // Function to show modal and fetch job details
  const handleShow = async () => {
    setShow(true);
    if (job_id && token) {
      try {
        const fetchedJob = await getJobDetails(job_id, token);
        if (fetchedJob) {
          let formattedEndDate = "";
          if (fetchedJob.end_date) {
            const dateParts = fetchedJob.end_date.split("-");
            formattedEndDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          }
          setData({
            title: fetchedJob.title || "",
            description: fetchedJob.description || "",
            location: fetchedJob.location || "",
            salary: fetchedJob.salary || 0,
            division: Array.isArray(fetchedJob.division)
              ? fetchedJob.division
              : fetchedJob.division.split(",").map((item) => item.trim()),
            job_type: fetchedJob.job_type || "",
            job_sitting: fetchedJob.job_sitting || "",
            end_date: formattedEndDate,
            is_relevant: fetchedJob.is_relevant || false,
            requirements: Array.isArray(fetchedJob.requirements)
              ? fetchedJob.requirements
              : [],
            company: fetchedJob.company || company_id,
            recruiter: fetchedJob.recruiter || recruiter_id,
          });
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }
  };

  // Close modal
  const handleClose = () => {
    setShow(false);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...data,
      division: Array.isArray(data.division)
        ? data.division.join(", ")
        : data.division,
    };
    if (job_id) {
      updateJob(job_id, formattedData, token, handleClose, (updatedJob) => {
        // Update the specific job in the jobs list immediately
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === job_id ? { ...job, ...updatedJob } : job))
        );
      });
    }
  };


  // Handle multi-select changes for requirements and division
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

  const handleDivisionChange = (selectedOptions) => {
    const updatedDivision = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setData((prevData) => ({
      ...prevData,
      division: updatedDivision,
    }));
  };

  const handleCreateDivisionOption = (inputValue) => {
    const updatedDivision = [...data.division, inputValue];
    setData((prevData) => ({
      ...prevData,
      division: updatedDivision,
    }));
  };

  const filteredRequirements = data.requirements.map((req) => ({
    label: req,
    value: req,
  }));

  const filteredDivision = Array.isArray(company.divisions)
    ? company.divisions.map((division) => ({
        label: division,
        value: division,
      }))
    : [];

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-purple-500 px-6 py-2 font-medium text-white hover:bg-purple-600"
        type="button"
      >
        <TiPencil size={19} color="black"/>

        {/* Edit Job */}
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job: {data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Form fields */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="input"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={data.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={data.salary}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            {/* Division */}
            <Form.Group controlId="formDivision">
              <Form.Label>Division</Form.Label>
              <CreatableSelect
                options={filteredDivision}
                value={data.division.map((div) => ({ label: div, value: div }))}
                onChange={handleDivisionChange}
                onCreateOption={handleCreateDivisionOption}
                isClearable
                isMulti
                placeholder="Select or type to search..."
              />
            </Form.Group>

            <Form.Group controlId="formJobType">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                type="text"
                name="job_type"
                value={data.job_type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formJobSitting">
              <Form.Label>Job Sitting</Form.Label>
              <Form.Control
                as="select"
                name="job_sitting"
                value={data.job_sitting}
                onChange={handleChange}
                required
              >
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* End Date */}
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={data.end_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>

            {/* Requirements */}
            <Form.Group controlId="formRequirements">
              <Form.Label>Requirements</Form.Label>
              <CreatableSelect
                options={filteredRequirements}
                value={filteredRequirements.filter((req) =>
                  data.requirements.includes(req.value)
                )}
                onChange={handleRequirementsChange}
                onCreateOption={handleCreateOption}
                isClearable
                isMulti
                placeholder="Select or type to search..."
              />
            </Form.Group>

            <Form.Group controlId="formIsRelevant">
              <Form.Check
                type="checkbox"
                name="is_relevant"
                label="Is Relevant"
                checked={data.is_relevant}
                onChange={(e) =>
                  setData({ ...data, is_relevant: e.target.checked })
                }
              />
            </Form.Group>

            <Button
              className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="flex justify-center rounded bg-secondary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditJob;
