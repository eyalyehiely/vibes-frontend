import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getRecruitersPerCompany from "../functions/crud/getRecruitersPerCompany";
import addRecruiter from "../functions/crud/addRecruiter";
import getCompanyDetails from "../functions/crud/getCompanyDetails";
import { jwtDecode } from "jwt-decode"; // Fix the import, jwtDecode should not be destructured

function AddRecruiter() {
  const [show, setShow] = useState(false);
  const [recruiter, setRecruiter] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState({ divisions: [] }); // Default to an empty array for divisions
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    working_time: [],
    gender: "",
    division: "",
    position: "",
    company: "",
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken ? decodedToken.user_id : null;

  useEffect(() => {
    if (token && company_id) {
      getRecruitersPerCompany(token, setRecruiter);
      getCompanyDetails(token, setCompany, company_id);
    }
  }, [token, company_id]);

  const handleClose = () => {
    setShow(false);
    setData({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      working_time: [],
      gender: "",
      division: "",
      position: "",
      company: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecruiter(token, setRecruiter, data, handleClose);
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-primary"
        className="d-flex align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Add Recruiter:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <Form.Group controlId="formFirstName">
              <Form.Label>
                First Name<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group controlId="formLastName">
              <Form.Label>
                Last Name<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                required
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
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* Company */}
            <Form.Group controlId="formCompany">
              <Form.Label>
                Company<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={company.name || ""}
                onChange={handleChange}
                readOnly // Assuming the company is pre-set and shouldn't be changed
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword">
              <Form.Label>
                Password<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <Form.Check
                type="checkbox"
                id="showPassword"
                label="Show password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </Form.Group>
            <br />

            {/* Phone Number */}
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>
                Phone Number<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                maxLength={15}
                minLength={9}
                required
              />
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

            {/* Position */}
            <Form.Group controlId="formPosition">
              <Form.Label>
                Position<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={data.position}
                onChange={handleChange}
                maxLength={15}
                required
              />
            </Form.Group>

            <br />
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

export default AddRecruiter;
