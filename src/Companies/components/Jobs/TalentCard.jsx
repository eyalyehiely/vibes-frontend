import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import checkCompanyToken from "../../functions/auth/checkCompanyToken";
import getTalentDetails from "../../../Talents/functions/crud/getTalentDetails";

function TalentCard({ talent_id }) {
  checkCompanyToken();

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const [show, setShow] = useState(false);
  const [talent, setTalent] = useState({}); // Initialize talent as an object

  useEffect(() => {
    if (token && talent_id) {
      getTalentDetails(token, setTalent, talent_id);
    }
  }, [token, talent_id]); // Add talent_id to the dependency array

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", talent);
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={handleShow}
        style={{ display: "flex", alignItems: "center" }}
      >
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
            fill=""
          />
          <path
            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
            fill=""
          />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {talent.first_name ? (
              <span>
                {talent.first_name} {talent.last_name}, {talent.residence}{" "}
                <img
                  src={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                    talent.profile_picture
                  }`}
                  alt="Profile"
                  style={{ width: "90px", height: "80px", borderRadius: "50%" }}
                />
              </span>
            ) : (
              "Talent Details"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Gender */}
            <Form.Group controlId="formGender" className="mb-3">
              <Form.Label className="fw-bold">Gender</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.gender ? talent.gender : "Not provided"}
              </p>
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="fw-bold">Email</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.email ? (
                  <a
                    href={`mailto:${talent.email}`}
                    className="text-decoration-none text-primary"
                  >
                    {talent.email}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </Form.Group>

            {/* Phone */}
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label className="fw-bold">Phone</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.phone_number ? (
                  <a
                    href={`tel:${talent.phone_number}`}
                    className="text-decoration-none text-primary"
                  >
                    {talent.phone_number}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
            </Form.Group>

            {/* cv */}
            <Form.Group controlId="formCV" className="mb-3">
              <Form.Label className="fw-bold">CV</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.cv ? (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                      talent.cv
                    }`} // Access the VITE env variable correctly
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-primary"
                  >
                    Download CV
                  </a>
                ) : (
                  "No CV available"
                )}
              </p>
            </Form.Group>

            {/* recommendation letter */}
            <Form.Group controlId="formRecommendationLetter" className="mb-3">
              <Form.Label className="fw-bold">Recommendation letter</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.recommendation_letter ? (
                  <a
                    href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                      talent.recommendation_letter
                    }`} // Ensure correct URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-primary"
                  >
                    Download Recommendation Letter
                  </a>
                ) : (
                  "No recommendation letter available"
                )}
              </p>
            </Form.Group>


            <Form.Group controlId="formSocialLinks" className="mb-3">
              <Form.Label className="fw-bold">Social Links</Form.Label>
              {talent.social_links &&
              Object.keys(talent.social_links).length > 0 ? (
                Object.keys(talent.social_links).map((platform, index) => {
                  const link = talent.social_links[platform];
                  return (
                    <p key={index} className="bg-light mb-2 rounded border p-2">
                      <strong>{platform}: </strong>
                      <a
                        href={
                          link.startsWith("http://") ||
                          link.startsWith("https://")
                            ? link
                            : `http://${link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-primary"
                      >
                        {link}
                      </a>
                    </p>
                  );
                })
              ) : (
                <p className="bg-light rounded border p-2">
                  No social links provided
                </p>
              )}
            </Form.Group>
            {/* about talent */}
            <Form.Group controlId="formAboutMe" className="mb-3">
              <Form.Label className="fw-bold">About talent</Form.Label>
              <p className="bg-light rounded border p-2">
                {talent.about_me ? talent.about_me : "Not provided"}
              </p>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                className="flex justify-center rounded bg-secondary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TalentCard;
