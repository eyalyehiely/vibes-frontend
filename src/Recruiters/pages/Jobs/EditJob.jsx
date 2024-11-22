import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";
import getJobDetails from "../../functions/crud/job/getJobDetails";
import updateJob from "../../functions/crud/job/updateJob"; // Assuming this function exists
import { jwtDecode } from "jwt-decode"; // Corrected import
import checkCompanyToken from "../../functions/auth/checkCompanyToken";

function EditJob({ jobId }) {
  checkCompanyToken();
  
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;

  const [show, setShow] = useState(false);
  const [job, setJob] = useState({});
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

  // Fetch job details when modal is opened
  const handleShow = () => {
    setShow(true);
    if (jobId) {
      getJobDetails(jobId, token, (fetchedJob) => {
        setJob(fetchedJob);
        setData({
          title: fetchedJob.title || "",
          description: fetchedJob.description || "",
          location: fetchedJob.location || "",
          salary: fetchedJob.salary || 0,
          division: fetchedJob.division || [],
          job_type: fetchedJob.job_type || "",
          job_sitting: fetchedJob.job_sitting || "",
          end_date: fetchedJob.end_date || "",
          is_relevant: fetchedJob.is_relevant || false,
          requirements: fetchedJob.requirements || [],
          company: fetchedJob.company || company_id,
          recruiter: fetchedJob.recruiter || "",
        });
      });
    }
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", data);
    updateJob(jobId, data, token, handleClose, setJob); // Assuming updateJob is correctly implemented
  };

  const handleRequirementsChange = (selectedOptions) => {
    const updatedRequirements = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setData((prevData) => ({ ...prevData, requirements: updatedRequirements }));
  };

  const handleCreateOption = (inputValue) => {
    const updatedRequirements = [...data.requirements, inputValue];
    setData((prevData) => ({
      ...prevData,
      requirements: updatedRequirements,
    }));
  };

  const filteredRequirements = data.requirements.map((req) => ({
    label: req,
    value: req,
  }));

  const handleDivisionChange = (selectedOptions) => {
    const updatedDivision = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setData((prevData) => ({ ...prevData, division: updatedDivision }));
  };

  const handleCreateDivisionOption = (inputValue) => {
    const updatedDivision = [...data.division, inputValue];
    setData((prevData) => ({ ...prevData, division: updatedDivision }));
  };

  const filteredDivision = data.division.map((div) => ({
    label: div,
    value: div,
  }));

  return (
    <>
      <Button
        onClick={handleShow}
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
      >
        Edit Job
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
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

            {/* Division */}
            <Form.Group controlId="formDivision">
              <Form.Label>Division</Form.Label>
              <CreatableSelect
                options={filteredDivision}
                value={filteredDivision.filter((div) =>
                  data.division.includes(div.value)
                )}
                onChange={handleDivisionChange}
                onCreateOption={handleCreateDivisionOption}
                isClearable
                isMulti
                placeholder="Select or type..."
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
                isMulti
                placeholder="Select or type..."
              />
            </Form.Group>

            {/* Is Relevant */}
            <Form.Group controlId="formIsRelevant">
              <Form.Label>Is Relevant?</Form.Label>
              <Form.Check
                type="checkbox"
                checked={data.is_relevant}
                onChange={() => setData({ ...data, is_relevant: !data.is_relevant })}
              />
            </Form.Group>

            <Button variant="success" type="submit">
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