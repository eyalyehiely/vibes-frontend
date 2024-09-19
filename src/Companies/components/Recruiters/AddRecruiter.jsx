import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getRecruitersPerCompany from "../../functions/crud/recruiter/getRecruitersPerCompany";
import addRecruiter from "../../functions/crud/recruiter/addRecruiter";
import getCompanyDetails from "../../functions/crud/company/getCompanyDetails";
import {jwtDecode} from "jwt-decode";  // Corrected import

function AddRecruiter() {
  const [show, setShow] = useState(false);
  const [recruiter, setRecruiter] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
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
    company: "",  // Will set this later
    user_type: "Recruiter",
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken?.user_id;

  useEffect(() => {
    if (token && company_id) {
      getRecruitersPerCompany(token, setRecruiter);
      getCompanyDetails(setCompany, company_id, token);
      // Set the company ID in the data state
      setData((prevData) => ({ ...prevData, company: company_id }));
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
      company: company_id, // Set the company ID here
      user_type: "Recruiter",
    });
    setPasswordStrength({
      length: false,
      uppercase: false,
      lowercase: false,
      digit: false,
      specialChar: false,
    });
    setIsPasswordValid(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (name === "password") {
      validatePasswordStrength(value);
    }
  };

  const validatePasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*()_\-+=\[\]{};:,.<>?/]/.test(password),
    };

    setPasswordStrength(strength);
    setIsPasswordValid(
      strength.length &&
      strength.uppercase &&
      strength.lowercase &&
      strength.digit &&
      strength.specialChar
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      addRecruiter(token, setRecruiter, data, handleClose);
    } else {
      alert("Password does not meet the strength requirements.");
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="submit"
      >
        +
      </button>

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
              <div className="mt-2">
                <p className={passwordStrength.length ? "text-success" : "text-danger"}>
                  • At least 8 characters
                </p>
                <p className={passwordStrength.uppercase ? "text-success" : "text-danger"}>
                  • At least one uppercase letter (A-Z)
                </p>
                <p className={passwordStrength.lowercase ? "text-success" : "text-danger"}>
                  • At least one lowercase letter (a-z)
                </p>
                <p className={passwordStrength.digit ? "text-success" : "text-danger"}>
                  • At least one digit (0-9)
                </p>
                <p className={passwordStrength.specialChar ? "text-success" : "text-danger"}>
                  • At least one special character (!@#$%^&*() etc.)
                </p>
              </div>
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
                {(company.divisions && Array.isArray(company.divisions) ? company.divisions : []).map((division, index) => (
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
              disabled={!isPasswordValid}
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