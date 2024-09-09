import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getJobDetails from "../../functions/crud/job/getJobDetails";
import checkCompanyToken from "../../functions/auth/checkCompanyToken";
import fetchTalentsForJob from "../../functions/crud/job/fetchTalentsForJob";

function SearchTalents({ job_id }) {
  checkCompanyToken();
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const [show, setShow] = useState(false);
  const [talents, setTalents] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async () => {
    if (token && job_id) {
      const jobDetails = await getJobDetails(job_id, token);
      if (jobDetails) {
        setSelectedJob(jobDetails); // Set the selected job data
        setShow(true); // Show the modal
      }
    } else {
      console.error("Job ID is undefined or invalid");
    }
  };

  useEffect(() => {
    if (job_id && token) {
      fetchTalentsForJob(job_id, setTalents, token);
    }
  }, [job_id, token]);

  if (!job_id) {
    return <p>Job ID is not available.</p>;
  }

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="container">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Matched Talents
            </h4>

            <div className="row">
              <div className="col-12 d-none d-sm-block">
                <div className="row text-center font-weight-bold">
                <div className="col"></div>
                  <div className="col">Number</div>
                  <div className="col">Name</div>
                  <div className="col">Grade</div>
                  <div className="col">Send a Message</div>
                  <div className="col">Save to a Label</div>
                </div>
              </div>

              {talents.length > 0 ? (
                talents.map((talent, index) => (
                    
                  <div className="col-12 mt-3" key={index}>
                    <div className="row text-center align-items-center">
                      <div className="col">{index + 1}</div>
                      <div className="col">{talent.first_name}</div>
                      <div className="col">{talent.grade}</div>
                      <div className="col">
                        <button className="btn btn-primary btn-sm">
                          Message
                        </button>
                      </div>
                      <div className="col">
                        <button className="btn btn-secondary btn-sm">
                          Save
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-3">
                  <p>No talents available</p>
                </div>
              )}
            </div>
          </div>
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

export default SearchTalents;