import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import getTalentDetails from "../functions/crud/getTalentDetails";
import getLanguages from "../../generalFunctions/getLanguages";
import getResidence from "../../generalFunctions/getResidence";
import getCompaniesDetails from "../../Companies/functions/crud/company/getCompaniesDetails";
import updateTalentInfo from "../functions/crud/updateTalentInfo";
import { jwtDecode } from "jwt-decode"; // Corrected import
import checkTalentToken from "../functions/auth/checkTalentToken";

function EditTalentProfile({ setTalent, talent }) {
  checkTalentToken();
  const [filteredResidence, setFilteredResidence] = useState([]);
  const [residenceResults, setResidenceResults] = useState([]);
  const [languagesResult, setLanguagesResult] = useState([]);
  const [filteredlanguages, setFilteredlanguages] = useState([]);
  const [companiesResult, setCompaniesResult] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null); // To hold selected social media platform
  const [linkInput, setLinkInput] = useState(""); // To hold the input link for the selected platform

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    gender: "male",
    email: "",
    phone_number: "",
    residence: "",
    languages: [],
    job_type: "",
    job_sitting: "",
    social_links: {},
    skills: [],
    desired_salary: 0,
    companies_black_list: [],
    about_me: "",
    is_open_to_work: false,
    cv: null,
    profile_picture: null,
    recommendation_letter: null,
    newsletter: false,
    user_type: "Talent",
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const talent_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getTalentDetails(token, setTalent, talent_id);
      getCompaniesDetails(token, setCompanies);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setData({
      first_name: talent.first_name || "",
      last_name: talent.last_name || "",
      email: talent.email || "",
      password: talent.password || "",
      gender: talent.gender || "",
      phone_number: talent.phone_number || "",
      residence: talent.residence || "",
      languages: talent.languages || [],
      job_type: talent.job_type || "",
      job_sitting: talent.job_sitting || "",
      social_links: talent.social_links || {},
      skills: talent.skills || [],
      desired_salary: talent.desired_salary || 0,
      companies_black_list: talent.companies_black_list || [],
      about_me: talent.about_me || "",
      is_open_to_work: talent.is_open_to_work || false,
      cv: talent.cv || null, // Retain the current file if present
      profile_picture: talent.profile_picture || null, // Retain the current file
      recommendation_letter: talent.recommendation_letter || null, // Retain the current file
      newsletter: talent.newsletter || false,
      user_type: talent.user_type || "Talent",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitting Data:", data);
  //   updateTalentInfo(setTalent, data, handleClose, talent_id, token);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Only add non-file fields to formData
    Object.keys(data).forEach((key) => {
      if (
        key !== "cv" &&
        key !== "profile_picture" &&
        key !== "recommendation_letter"
      ) {
        if (Array.isArray(data[key]) || typeof data[key] === "object") {
          formData.append(key, JSON.stringify(data[key])); // Convert arrays/objects to JSON
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    // Send FormData to updateTalentInfo
    updateTalentInfo(setTalent, formData, handleClose, talent_id, token);
  };

  useEffect(() => {
    getResidence(setResidenceResults);
  }, []);

  useEffect(() => {
    setFilteredResidence(
      residenceResults.map((residence) => ({
        value: residence,
        label: residence,
      }))
    );
  }, [residenceResults]);

  const handleResidenceChange = (selectedOption) => {
    setData({ ...data, residence: selectedOption ? selectedOption.value : "" });
  };

  useEffect(() => {
    getLanguages(setLanguagesResult);
  }, []);

  useEffect(() => {
    setFilteredlanguages(
      languagesResult.map((language) => ({
        value: language,
        label: language,
      }))
    );
  }, [languagesResult]);

  const handleLanguagesChange = (selectedOption) => {
    setData({
      ...data,
      languages: selectedOption
        ? selectedOption.map((option) => option.value)
        : [],
    });
  };

  useEffect(() => {
    if (token) {
      getCompaniesDetails(token, setCompanies);
    }
  }, [token]);

  useEffect(() => {
    setFilteredCompanies(
      companies.map((company) => ({
        value: company.first_name, // Assuming company object has a `name` field
        label: company.first_name,
      }))
    );
  }, [companies]);

  const handleCompaniesChange = (selectedOptions) => {
    setData({
      ...data,
      companies_black_list: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handlePlatformChange = (selectedOption) => {
    setSelectedPlatform(selectedOption);
    setLinkInput(data.social_links[selectedOption.value] || ""); // Set input value to existing link if available
  };

  // Handle link input change
  const handleLinkChange = (e) => {
    setLinkInput(e.target.value);
  };

  // Save the link to the selected platform
  const handleAddLink = () => {
    setData((prevData) => ({
      ...prevData,
      social_links: {
        ...prevData.social_links,
        [selectedPlatform.value]: linkInput,
      },
    }));
    setSelectedPlatform(null); // Reset platform selection after adding link
    setLinkInput(""); // Clear the link input
  };

  const socialMediaOptions = [
    { label: "LinkedIn", value: "linkedin" },
    { label: "Facebook", value: "facebook" },
    { label: "Twitter", value: "twitter" },
    { label: "Instagram", value: "instagram" },
    { label: "GitHub", value: "github" },
  ];
  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-purple-500 px-6 py-2 font-medium text-white hover:bg-purple-600"
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
          <Modal.Title>{data.first_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
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

            {/* Residence */}
            <Form.Group controlId="formResidence">
              <Form.Label>Residence:</Form.Label>
              <Select
                options={filteredResidence}
                value={filteredResidence.find(
                  (residence) => residence.value === data.residence
                )}
                onChange={handleResidenceChange}
                isClearable
                isSearchable
                placeholder="Select or type to search..."
              />
            </Form.Group>
            {/* Job type */}
            <Form.Group controlId="formJobType">
              <Form.Label>Job Type:</Form.Label>
              <Form.Control
                type="input"
                name="job_type"
                value={data.job_type}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Job sitting */}
            <Form.Group controlId="formJobSitting">
              <Form.Label>Job Sitting:</Form.Label>
              <Form.Control
                as="select"
                name="job_sitting"
                value={data.job_sitting}
                onChange={handleChange}
                required
              >
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* Social Links */}
            <Form.Group controlId="formSocialLinks">
              <Form.Label>Social Links</Form.Label>
              <Select
                options={socialMediaOptions}
                value={selectedPlatform}
                onChange={handlePlatformChange}
                placeholder="Select Social Media Platform"
              />
              {selectedPlatform && (
                <>
                  <Form.Control
                    type="text"
                    placeholder={`Enter ${selectedPlatform.label} URL`}
                    value={linkInput}
                    onChange={handleLinkChange}
                  />
                  <Button
                    className="mt-2"
                    onClick={handleAddLink}
                    disabled={!linkInput.trim()}
                  >
                    Add Link
                  </Button>
                </>
              )}

              {/* Display Added Links */}
              <ul className="mt-3">
                {Object.keys(data.social_links).map((platform) => (
                  <li key={platform}>
                    <strong>{platform}:</strong> {data.social_links[platform]}
                  </li>
                ))}
              </ul>
            </Form.Group>

            {/* Skills */}
            <Form.Group controlId="formSkills">
              <Form.Label>Skills:</Form.Label>
              <Form.Control
                type="input"
                name="skills"
                value={data.skills}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Desired salary */}
            <Form.Group controlId="formSalary">
              <Form.Label>
                Desired Salary: ${data.desired_salary.toLocaleString()}
              </Form.Label>
              <Form.Control
                type="range"
                name="desired_salary" // Match the name with the key in data
                min="0"
                max="200000"
                step="1000"
                value={data.desired_salary}
                onChange={handleChange}
                style={{
                  accentColor: "purple", // for some browsers
                  WebkitAppearance: "none", // remove default styles for Safari
                  width: "100%", // full width
                }}
              />
            </Form.Group>
            {/* Languages */}
            <Form.Group controlId="formLanguages">
              <Form.Label>Languages:</Form.Label>
              <Select
                options={filteredlanguages}
                value={
                  Array.isArray(data.languages)
                    ? filteredlanguages.filter((language) =>
                        data.languages.includes(language.value)
                      )
                    : []
                }
                onChange={handleLanguagesChange}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
              />
            </Form.Group>
            {/* Companies black list */}
            <Form.Group controlId="formCompany">
              <Form.Label>Companies black list:</Form.Label>
              <Select
                options={filteredCompanies}
                value={
                  Array.isArray(data.companies_black_list)
                    ? filteredCompanies.filter((company) =>
                        data.companies_black_list.includes(company.value)
                      )
                    : []
                }
                onChange={handleCompaniesChange}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
              />
            </Form.Group>

            {/* About me */}
            <Form.Group controlId="formAboutMe">
              <Form.Label>About me:</Form.Label>
              <Form.Control
                type="input"
                name="about_me"
                value={data.about_me}
                onChange={handleChange}
              />
            </Form.Group>

            <br />
            
            <Form.Group controlId="formIsOpenToWork">
              <Form.Label>Is open to work?</Form.Label>
              <Form.Check
                type="switch"
                name="is_open_to_work"
                checked={data.is_open_to_work}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "is_open_to_work",
                      value: e.target.checked,
                    },
                  })
                }
                label={data.is_open_to_work ? "Yes" : "No"}
                // required
              />
            </Form.Group>

            <Form.Group controlId="formNewsletter">
              <Form.Label>Sign to newsletter?</Form.Label>
              <Form.Check
                type="switch"
                name="newsletter"
                checked={data.newsletter}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "newsletter",
                      value: e.target.checked,
                    },
                  })
                }
                label={data.newsletter ? "Yes" : "No"}

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

export default EditTalentProfile;
