import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { TiPencil } from "react-icons/ti";
import { jwtDecode } from "jwt-decode";
import getUserDetails from "../../utils/crud/user/getUserDetails";
import updateUserInfo from "../../utils/crud/user/updateUserInfo";

function EditUserProfile({ setUser, user }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    gender: "זכר",
    email: "",
  });

  const token = localStorage.getItem("authTokens");
  const decodedToken = token ? jwtDecode(token) : null;
  const user_id = decodedToken?.user_id;

  useEffect(() => {
    if (token) {
      getUserDetails(token, setUser, user_id);
    }
  }, [token, user_id, setUser]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.username || "",
      gender: user.gender || "זכר",
    }));
  }, [user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(setUser, data, handleClose, user_id, token);
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="flex justify-center rounded bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600"
        type="button"
      >
        <TiPencil color="black" />
      </button>

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title>ערוך פרופיל</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>
                שם פרטי<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>
                שם משפחה<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>
                שם משתמש<span className="text-danger">*</span>
              </Form.Label>{" "}
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>
                מגדר<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                required
              >
                <option value="זכר">זכר</option>
                <option value="נקבה">נקבה</option>
                <option value="אחר">אחר</option>
              </Form.Control>
            </Form.Group>

            <Button className="mt-3 w-100 bg-success text-white" type="submit">
              שמור שינויים
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="w-100 bg-secondary text-white"
            onClick={handleClose}
          >
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserProfile;
