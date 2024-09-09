import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import updateRecruiterInfo from "../functions/crud/updateRecruiterInfo";
import { jwtDecode } from "jwt-decode"; // Corrected import
import getCompanyDetails from "../../Companies/functions/crud/company/getCompanyDetails";

function EditRecruiterProfile({ card }) {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState({ divisions: [] }); // Default to an empty array for divisions
  const [recruiter, setRecruiter] = useState({});
  const [workingTime, setWorkingTime] = useState({
    Monday: { start: "", end: "", selected: false },
    Tuesday: { start: "", end: "", selected: false },
    Wednesday: { start: "", end: "", selected: false },
    Thursday: { start: "", end: "", selected: false },
    Friday: { start: "", end: "", selected: false },
    Saturday: { start: "", end: "", selected: false },
    Sunday: { start: "", end: "", selected: false },
  });

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
    phone_number: "",
    division: [],
    company: "",
    position: "",
    working_time: workingTime,
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const recruiter_id = decodedToken.user_id;
  const company_id = decodedToken.company_id;

  useEffect(() => {
    if (token && company_id) {
      getRecruiterDetails(token, setRecruiter, recruiter_id);
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token, company_id]);

  useEffect(() => {
    if (recruiter && recruiter.working_time) {
      setWorkingTime(recruiter.working_time); // Ensure working time is set and pre-filled in the form
    }
    setData({
      first_name: recruiter.first_name || "",
      last_name: recruiter.last_name || "",
      email: recruiter.email || "",
      password: recruiter.password || "",
      gender: recruiter.gender || "",
      phone_number: recruiter.phone_number || "",
      division: recruiter.division || [],
      position: recruiter.position || "",
      working_time: recruiter.working_time || workingTime,
    });
  }, [recruiter]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDaySelection = (day) => {
    setWorkingTime({
      ...workingTime,
      [day]: { ...workingTime[day], selected: !workingTime[day].selected },
    });
  };

  const handleTimeChange = (day, type, value) => {
    setWorkingTime({
      ...workingTime,
      [day]: { ...workingTime[day], [type]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure the working time is included in the data sent to the backend
    updateRecruiterInfo(
      setRecruiter,
      { ...data, working_time: workingTime },
      handleClose,
      recruiter_id,
      token
    );
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="submit"
      >
        <svg className="h-4 w-4 text-slate-500 dark:text-slate-400" viewBox="0 0 16 16">
          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>{recruiter.first_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* First name */}
            <Form.Group controlId="formFirstName">
              <Form.Label>
                First Name<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="input"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Last name */}
            <Form.Group controlId="formLastName">
              <Form.Label>
                Last Name<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="input"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={data.email}
                readOnly // Makes the email field read-only
              />
            </Form.Group>

            {/* Gender */}
            <Form.Group controlId="formGender">
              <Form.Label>
                Gender<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                required
              >
                <option value={data.gender}>{data.gender}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* Phone number */}
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                maxLength={15}
              />
            </Form.Group>

            {/* Position */}
            <Form.Group controlId="formPosition">
              <Form.Label>Position:</Form.Label>
              <Form.Control
                type="input"
                name="position"
                value={data.position}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Working Time */}
            <Form.Group>
              <Form.Label>Working Time:</Form.Label>
              {Object.keys(workingTime).map((day) => (
                <div key={day} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={day}
                    checked={workingTime[day].selected}
                    onChange={() => handleDaySelection(day)}
                  />
                  {workingTime[day].selected && (
                    <div className="d-flex justify-content-between mt-2">
                      <Form.Control
                        type="time"
                        value={workingTime[day].start || ""}
                        onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                      />
                      <span className="mx-2">to</span>
                      <Form.Control
                        type="time"
                        value={workingTime[day].end || ""}
                        onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </Form.Group>

            {/* Division */}
            <Form.Group controlId="formDivision">
              <Form.Label>
                Division<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="division"
                value={data.division}
                onChange={handleChange}
                required
              >
                <option value="">Select Division</option>
                {company.divisions?.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </Form.Control>
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

export default EditRecruiterProfile;