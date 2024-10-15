import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import getCompanyDetails from "../functions/crud/company/getCompanyDetails";
import updateCompanyInfo from "../functions/crud/company/updateCompanyInfo";
import { jwtDecode } from "jwt-decode";
import CreatableSelect from "react-select/creatable"; 
function EditCompanyProfile({ card }) {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    phone_number: "",
    divisions: [], // Start with an empty array
    website: "",
    address: "",
    license_type: "",
    user_type:'Company'
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token]);

  useEffect(() => {
    if (company) {
      setData({
        name: company.name || "",
        email: company.email || "",
        password: company.password || "",
        phone_number: company.phone_number || "",
        website: company.website || "",
        divisions: Array.isArray(company.divisions) ? company.divisions : [],
        address: company.address || "",
        license_type: company.license_type || "",
        user_type: company.user_type || "Company",
      });
    }
  }, [company]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDivisionsChange = (selectedOptions) => {
    const updatedDivisions = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setData((prevData) => ({
      ...prevData,
      divisions: updatedDivisions,
    }));
  };

  const handleCreateOption = (inputValue) => {
    const updatedDivisions = [...data.divisions, inputValue];
    setData((prevData) => ({
      ...prevData,
      divisions: updatedDivisions,
    }));
  };

  const filteredDivisions = data.divisions.map((division) => ({
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
    updateCompanyInfo(setCompany, data, handleClose, company_id, token);
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-purple-500 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
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
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group controlId="formName">
              <Form.Label>
                Name<span className="text-rose-500">*</span>
              </Form.Label>
              <Form.Control
                type="input"
                name="name"
                value={data.name}
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

            {/* Phone number */}
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                maxLength={15}
                minLength={9}
              />
            </Form.Group>

            {/* website */}
            <Form.Group controlId="formWebsite">
              <Form.Label>Website:</Form.Label>
              <Form.Control
                type="input"
                name="website"
                value={data.website}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group controlId="formAddress">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="input"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            </Form.Group>

            {/* divisions */}
            <Form.Group controlId="formDivisions">
              <Form.Label>Divisions:</Form.Label>
              <CreatableSelect
                options={filteredDivisions}
                value={
                  Array.isArray(data.divisions)
                    ? filteredDivisions.filter((division) =>
                        data.divisions.includes(division.value)
                      )
                    : []
                }
                onChange={handleDivisionsChange}
                onCreateOption={handleCreateOption}
                isClearable
                isSearchable
                isMulti
                placeholder="Select or type to search..."
                allowCreateWhileLoading={true} // Enables custom option creation
                createOptionPosition="first"
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

export default EditCompanyProfile;