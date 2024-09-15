import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";
import getJobDetails from "../../functions/crud/job/getJobDetails";
import { jwtDecode } from "jwt-decode";
import checkCompanyToken from "../../functions/auth/checkCompanyToken";
import updateJob from "../../functions/crud/job/updateJob";
import getCompanyDetails from "../../functions/crud/company/getCompanyDetails";

function EditJob({ job_id }) {
  checkCompanyToken();

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;

  const [show, setShow] = useState(false);
  const [job, setJob] = useState(null);
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
    recruiter: "",
  });

  useEffect(() => {
    if (token) {
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token]);

  const handleShow = async () => {
    setShow(true);
    if (job_id && token) {
      try {
        console.log("Fetching job details for job ID:", job_id);
        const fetchedJob = await getJobDetails(job_id, token); // Wait for job details to be fetched

        if (fetchedJob) {
          console.log("Fetched Job Data:", fetchedJob);
          setJob(fetchedJob);

          // Convert the end_date from "DD-MM-YYYY" to "YYYY-MM-DD"
          let formattedEndDate = "";
          if (fetchedJob.end_date) {
            const dateParts = fetchedJob.end_date.split("-");
            if (dateParts.length === 3) {
              formattedEndDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            }
          }

          setData({
            title: fetchedJob.title || "",
            description: fetchedJob.description || "",
            location: fetchedJob.location || "",
            salary: fetchedJob.salary || 0,
            division: Array.isArray(fetchedJob.division)
              ? fetchedJob.division
              : [], // Ensure this is an array
            job_type: fetchedJob.job_type || "",
            job_sitting: fetchedJob.job_sitting || "",
            end_date: formattedEndDate,
            is_relevant: fetchedJob.is_relevant || false,
            requirements: Array.isArray(fetchedJob.requirements)
              ? fetchedJob.requirements
              : [],
            company: fetchedJob.company || company_id,
            recruiter: fetchedJob.recruiter || "",
          });
        } else {
          console.log("No job data found.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", data);

    // Convert the `division` array to a string (comma-separated list)
    const formattedData = {
      ...data,
      division: Array.isArray(data.division)
        ? data.division.join(", ")
        : data.division,
    };

    if (job_id) {
      updateJob(job_id, formattedData, token, handleClose, setJob);
    }
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

  // Generate options for divisions from the company details
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
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="button"
      >
        <svg
          className="h-4 w-4 text-slate-500 dark:text-slate-400"
          viewBox="0 0 16 16"
        >
          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job: {data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
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

            {/* Description */}
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

            {/* Location */}
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

            {/* Salary */}
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

            <Form.Group controlId="formDivision">
              <Form.Label>Division</Form.Label>
              <CreatableSelect
                options={filteredDivision}
                value={
                  data.division.map((div) => ({ label: div, value: div })) // Ensure division is correctly formatted
                }
               
                onChange={handleDivisionChange}
                onCreateOption={handleCreateDivisionOption}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
                createOptionPosition="first"
              />
            </Form.Group>

            {/* Job Type */}
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

            {/* Job Sitting */}
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
                isSearchable
                isMulti
                placeholder="Select or type to search..."
                createOptionPosition="first"
              />
            </Form.Group>

            {/* is relevant */}
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

            <Button type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditJob;
