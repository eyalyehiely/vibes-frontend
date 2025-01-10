import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { CiUser } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import swal from "sweetalert";
import getUserDetails from "../utils/crud/user/getUserDetails";
import sendContactUsEmail from "../utils/sendContactUsEmail";
import { jwtDecode } from "jwt-decode";
import EditUserProfile from "../components/User/EditUserProfile";
import saveProfilePicture from "../utils/profile_picture/saveProfilePicture";

function Profile() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authTokens");
  const [isDisabled, setIsDisabled] = useState(false);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.user_id;

      async function fetchUserDetails() {
        try {
          const userData = await getUserDetails(token, setUser, user_id);
          setFormData({
            ...formData,
            firstName: userData?.first_name || "",
            lastName: userData?.last_name || "",
            email: userData?.username || "",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchUserDetails();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    // Simulate form submission
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
    if (!formData.subject.trim() || !formData.message.trim()) {
      swal("שגיאה", "יש למלא את שדה הנושא ואת שדה ההודעה.", "error");
      return;
    }

    sendContactUsEmail(
      {
        message: formData.message,
        subject: formData.subject,
      },
      token
    )
      .then(() => {
        setFormData({
          ...formData,
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending contact email:", error);
      });
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" />
        </div>
      </DefaultLayout>
    );
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const profilePic = {
        file,
        preview: URL.createObjectURL(file)
      };
      
      await saveProfilePicture(profilePic, token, user_id, setUser)
      
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <DefaultLayout>
      <Container className="py-4" dir="rtl">
        {/* Account Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              {/* Left Section: Edit Profile and User Picture */}
              <Col xs={12} sm={3} className="text-center">
              <div className="relative">
            <div className="h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200 -mt-24 mb-6">
              {user?.profile_picture ? (
                <img
                  src={`${USERS_API_BASE_URL}${user.profile_picture}`}
                  alt={`${user.first_name || ""} ${user.last_name || ""} Profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <CiUser
                  className="h-full w-full text-gray-500 p-4"
                  aria-label="Default user icon"
                />
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              aria-label="Upload profile picture"
            />

            <Button
              onClick={triggerFileInput}
              className="absolute bottom-8 right-0 rounded-full p-2 bg-white shadow-md hover:bg-gray-100"
              aria-label="Change profile picture"
            >
             <FaCamera size={20} color={blue}/>

            </Button>
          </div>
                <EditUserProfile setUser={setUser} user={user} />
              </Col>

              {/* Right Section: User Details */}
              <Col xs>
                <h4 className="fw-bold text-primary mb-3">
                  {user.first_name} {user.last_name}
                </h4>
                <p className="fst-italic text-muted">
                  {user.username || "שם משתמש לא סופק"}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Personal Details */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h6" className="fw-bold">
            פרטים אישיים
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4} sm={6} xs={12}>
                <strong>שם פרטי:</strong> {user.first_name || "לא סופק"}
              </Col>
              <Col md={4} sm={6} xs={12}>
                <strong>שם משפחה:</strong> {user.last_name || "לא סופק"}
              </Col>
              <Col md={4} sm={6} xs={12}>
                <strong>תאריך לידה:</strong> {user.birth_date || "לא סופק"}
              </Col>
              <Col md={4} sm={6} xs={12}>
                <strong>מגדר:</strong>{" "}
                {user.gender === "זכר"
                  ? "זכר"
                  : user.gender === "נקבה"
                  ? "נקבה"
                  : "אחר"}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-sm">
          <Card.Header as="h6" className="fw-bold">
            טופס יצירת קשר
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formSubject">
                    <Form.Label>נושא</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formMessage">
                    <Form.Label>הודעה</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                variant="primary"
                disabled={isDisabled}
                className={`w-100 fw-bold ${
                  isDisabled ? "disabled opacity-50" : ""
                }`}
              >
                {isDisabled ? "שולח הודעה..." : "שלח הודעה"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </DefaultLayout>
  );
}

export default Profile;
