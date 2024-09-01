import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getCompanyJobs from "../../functions/crud/job/getCompanyJobs";
import updateJob from "../../functions/crud/job/updateJob";
import { jwtDecode } from "jwt-decode";
import CreatableSelect from "react-select/creatable"; // Import CreatableSelect for dynamic option creation
import getJobDetails from '../../functions/crud/job/getJobDetails'

function EditJob({ card }) {
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;
  const [show, setShow] = useState(false);
  const [jobs, setJobs] = useState({});
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    division:[],
    job_type: "",
    job_sitting: "",
    end_date: "",
    is_relevant: false,
    requirements: [],
    company: company_id, // Set company ID here
    recruiter: "",
  });

  useEffect(() => {
    if (token) {
      getCompanyJobs(company_id, token, setJobs);
      getJobDetails(job_id, company_id, token, setJobs)
    }
  }, [token]);

  useEffect(() => {
    if (jobs) {
      setData({
        title: jobs.title || "",
        description: jobs.description || "",
        location: jobs.location || "",
        salary: jobs.salary || 0,
        division:Array.isArray(jobs.division) ? jobs.division : [],
        jobs_type: jobs.job_type || "",
        jobs_sitting: jobs.job_sitting || "",
        end_date: jobs.end_date || "",
        is_relevant: jobs.is_relevant || false,
        requirements: Array.isArray(jobs.requirements) ? jobs.requirements : [],
        company: jobs.company || company_id,
        recruiter: jobs.recruiter || "",
      });
    }
  }, [jobs]);

  const handleClose = () => {
    setShow(false);
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
    const updatedRequirements = [...data.Requirements, inputValue];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const filteredRequirements = data.requirements.map((division) => ({
    label: division,
    value: division,
  }));



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

  const filteredDivision = data.division.map((division) => ({
    label: division,
    value: division,
  }));


  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      updateJob(job_id,company_id, jobData, token);
    };

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="submit"
      >
        <svg
          className="h-4 w-4 text-slate-500 dark:text-slate-400"
          viewBox="0 0 16 16"
        >
          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group controlId="formTitle">
              <Form.Label>
                Title<span className="text-rose-500">*</span>
              </Form.Label>
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
              <Form.Label>
                Description<span className="text-rose-500">*</span>
              </Form.Label>
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
              <Form.Label>
                Location<span className="text-rose-500">*</span>
              </Form.Label>
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
              <Form.Label>
                Salary<span className="text-rose-500">*</span>
              </Form.Label>
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
                value={
                  Array.isArray(data.division)
                    ? filteredDivision.filter((req) =>
                        data.division.includes(req.value)
                      )
                    : []
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
              <Form.Label>
                Job Type<span className="text-rose-500">*</span>
              </Form.Label>
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
              <Form.Label>
                Job Sitting<span className="text-rose-500">*</span>
              </Form.Label>
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
              <Form.Label>
                End Date<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={data.end_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]} // Set minimum date to today
              />
            </Form.Group>

            {/* Requirements */}
            <Form.Group controlId="formRequirements">
              <Form.Label>Requirements</Form.Label>
              <CreatableSelect
                options={filteredRequirements}
                value={
                  Array.isArray(data.requirements)
                    ? filteredRequirements.filter((req) =>
                        data.requirements.includes(req.value)
                      )
                    : []
                }
                onChange={handleRequirementsChange}
                onCreateOption={handleCreateOption}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
                createOptionPosition="first"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3">
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
