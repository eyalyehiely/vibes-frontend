import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select"; // Importing the Select component
import getTalentDetails from "../../functions/talents/getTalentDetails";
import getLanguages from "../../functions/getLanguages";
import getResidence from "../../functions/getResidence";
import updateTalentInfo from "../../functions/talents/updateTalentInfo";

function EditTalentProfile({ card }) {
  const [filteredResidence, setFilteredResidence] = useState([]);
  const [residenceSearchQuery, setResidenceSearchQuery] = useState("");
  const [residenceResults, setResidenceResults] = useState([]);
  const [languagesResult, setLanguagesResult] = useState([]);
  const [filteredlanguages, setFilteredlanguages] = useState([]);
  const [languagesSearchQuery, setLanguagesSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [talent, setTalent] = useState({});
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
    phone_number: "",
    residence: "",
    languages: [],
    job_type: "office",
    job_sitting: "",
    field_of_interest: [],
    social_links: "",
    skills: [],
    work_history: [],
    companies_black_list: [],
    about_me: "",
    is_open_to_work: false,
    cv: "",
    recommendation_letter: "",
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  useEffect(() => {
    if (token) {
      getTalentDetails(token, setTalent);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      first_name: talent.first_name || "",
      last_name: talent.last_name || "",
      email: talent.email || "",
      gender: talent.gender || "",
      phone_number: talent.phone_number || "",
      residence: talent.residence || "",
      languages: talent.languages || [],
      job_type: talent.job_type || "office",
      job_sitting: talent.job_sitting || "",
      field_of_interest: talent.field_of_interest || [],
      social_links: talent.social_links || "",
      skills: talent.skills || [],
      work_history: talent.work_history || [],
      companies_black_list: talent.companies_black_list || [],
      about_me: talent.about_me || "",
      is_open_to_work: talent.is_open_to_work || false,
      cv: talent.cv || "",
      recommendation_letter: talent.recommendation_letter || "",
    });
  };

  const handleShow = () => {
    setShow(true);
    setData({
      first_name: talent.first_name || "",
      last_name: talent.last_name || "",
      email: talent.email || "",
      gender: talent.gender || "",
      phone_number: talent.phone_number || "",
      residence: talent.residence || "",
      languages: talent.languages || [],
      job_type: talent.job_type || "office",
      job_sitting: talent.job_sitting || "",
      field_of_interest: talent.field_of_interest || [],
      social_links: talent.social_links || "",
      skills: talent.skills || [],
      work_history: talent.work_history || [],
      companies_black_list: talent.companies_black_list || [],
      about_me: talent.about_me || "",
      is_open_to_work: talent.is_open_to_work || false,
      cv: talent.cv || "",
      recommendation_letter: talent.recommendation_letter || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTalentInfo(setTalent, data, handleClose);
  };

  // residence
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

  const handleResidenceSearchChange = (e) => {
    setResidenceSearchQuery(e.target.value);
  };

  // languages
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
          <Modal.Title>Talent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* first name */}
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

            {/* last name */}
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

            {/* email */}
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* gender */}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* phone number */}
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="life_status"
                value={data.phone_number}
                onChange={handleChange}
                maxLength={15}
                required
              ></Form.Control>
            </Form.Group>

            {/* residence */}
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

            {/* job type*/}
            <Form.Group controlId="formJobType">
              <Form.Label>Job Type:</Form.Label>
              <Form.Control
                type="input"
                name="job_type"
                value={data.job_type}
                onChange={handleChange}
              />
            </Form.Group>
            {/* job sitting */}
            <Form.Group controlId="formJobSitting">
              <Form.Label>Job Sitting:</Form.Label>
              <Form.Control
                type="input"
                name="job_sitting"
                value={data.job_sitting}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Fields Of Interests */}
            <Form.Group controlId="formFieldsOfInterests">
              <Form.Label>Fields Of Interests:</Form.Label>
              <Form.Control
                type="input"
                name="field_of_interest"
                value={data.field_of_interest}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Social links */}
            <Form.Group controlId="formSocialLinks">
              <Form.Label>Social links:</Form.Label>
              <Form.Control
                type="input"
                name="social_links"
                value={data.social_links}
                onChange={handleChange}
              />
            </Form.Group>

            {/* skills */}
            <Form.Group controlId="formSkills">
              <Form.Label>Skills:</Form.Label>
              <Form.Control
                type="input"
                name="skills"
                value={data.skills}
                onChange={handleChange}
              />
            </Form.Group>

            {/* languages */}
            <Form.Group controlId="formLanguages">
              <Form.Label>Languages:</Form.Label>
              <Select
                options={filteredlanguages}
                value={filteredlanguages.filter((language) =>
                  data.languages.includes(language.value)
                )}
                onChange={handleLanguagesChange}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
              />
            </Form.Group>

            {/* work history */}
            <Form.Group controlId="formWorkHistory">
              <Form.Label>Work history:</Form.Label>
              <Form.Control
                type="input"
                name="work_history"
                value={data.work_history}
                onChange={handleChange}
              />
            </Form.Group>

            {/* companies black list */}
            <Form.Group controlId="formCompaniesBlackList">
              <Form.Label>Companies black list:</Form.Label>
              <Form.Control
                type="input"
                name="companies_black_list"
                value={data.companies_black_list}
                onChange={handleChange}
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

            {/* is open to work ? */}
            <Form.Group controlId="formIsOpenToWork">
              <Form.Label>is open to work ?:</Form.Label>
              <Form.Control
                type="input"
                name="is_open_to_work"
                value={data.is_open_to_work}
                onChange={handleChange}
              />
            </Form.Group>

            <br />

            <button
              className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              onClick={handleClose}
            >
              Save
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="flex justify-center rounded bg-secondary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditTalentProfile;
