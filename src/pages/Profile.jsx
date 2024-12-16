// import React, { useState, useEffect } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Grid,
//   Typography,
//   TextField,
// } from "@mui/material";
// import swal from "sweetalert";
// import getUserDetails from "../utils/crud/user/getUserDetails";
// import sendContactUsEmail from "../utils/sendContactUsEmail";
// import UserPicHandling from "../components/User/UserPicHandling";
// import { jwtDecode } from "jwt-decode";
// import EditUserProfile from "../components/User/EditUserProfile";

// function Profile() {
//   const [user, setUser] = useState({});
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("authTokens");
//   const [isDisabled, setIsDisabled] = useState(false);

//   useEffect(() => {
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const user_id = decodedToken.user_id;

//       async function fetchUserDetails() {
//         try {
//           const userData = await getUserDetails(token, setUser, user_id);
//           setFormData({
//             ...formData,
//             firstName: userData?.first_name || "",
//             lastName: userData?.last_name || "",
//             email: userData?.username || "",
//           });
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchUserDetails();
//     }
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsDisabled(true);

//     // Simulate form submission
//     setTimeout(() => {
//       setIsDisabled(false);
//     }, 3000);
//     if (!formData.subject.trim() || !formData.message.trim()) {
//       swal("שגיאה", "יש למלא את שדה הנושא ואת שדה ההודעה.", "error");
//       return;
//     }

//     sendContactUsEmail(
//       {
//         message: formData.message,
//         subject: formData.subject,
//       },
//       token
//     )
//       .then(() => {
//         setFormData({
//           ...formData,
//           subject: "",
//           message: "",
//         });
//       })
//       .catch((error) => {
//         console.error("Error sending contact email:", error);
//       });
//   };

//   if (loading) {
//     return (
//       <DefaultLayout>
//         <div className="flex h-full items-center justify-center">
//           <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"></div>
//         </div>
//       </DefaultLayout>
//     );
//   }

//   return (
//     <DefaultLayout>
//       <div className="flex h-full p-6" dir="rtl">
//         <div className="w-full space-y-6">
//           {/* Account Info */}
//           <Card
//             sx={{
//               boxShadow: 5,
//               borderRadius: 3,
//               overflow: "hidden",
//               background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
//               border: "1px solid #90caf9",
//             }}
//           >
//             <CardContent>
//               <Grid container spacing={3} alignItems="center">
//                 {/* Left Section: Edit Profile and User Picture */}
//                 <Grid item xs={12} sm={3} textAlign="center">
//                   <UserPicHandling />
//                   <EditUserProfile setUser={setUser} user={user} />
//                 </Grid>

//                 {/* Right Section: User Details */}
//                 <Grid item xs>
//                   <Typography
//                     variant="h4"
//                     fontWeight="bold"
//                     color="primary"
//                     gutterBottom
//                     sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
//                   >
//                     {user.first_name} {user.last_name}
//                   </Typography>
//                   <Typography
//                     variant="body1"n
//                     color="textSecondary"
//                     sx={{ fontStyle: "italic" }}
//                   >
//                     {user.username || "שם משתמש לא סופק"}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Personal Details */}
//           <Card
//             sx={{
//               boxShadow: 2,
//               borderRadius: 2,
//               overflow: "hidden",
//             }}
//           >
//             <CardHeader
//               title="פרטים אישיים"
//               titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
//             />
//             <Divider />
//             <CardContent>
//               <Grid container spacing={3}>
//                 <Grid item md={4} sm={6} xs={12}>
//                   <Typography>
//                     <strong>שם פרטי:</strong> {user.first_name || "לא סופק"}
//                   </Typography>
//                 </Grid>
//                 <Grid item md={4} sm={6} xs={12}>
//                   <Typography>
//                     <strong>שם משפחה:</strong> {user.last_name || "לא סופק"}
//                   </Typography>
//                 </Grid>
//                 <Grid item md={4} sm={6} xs={12}>
//                   <Typography>
//                     <strong>תאריך לידה:</strong> {user.birth_date || "לא סופק"}
//                   </Typography>
//                 </Grid>
//                 <Grid item md={4} sm={6} xs={12}>
//                   <Typography>
//                     <strong>מגדר:</strong>{" "}
//                     {user.gender === "זכר"
//                       ? "זכר"
//                       : user.gender === "נקבה"
//                       ? "נקבה"
//                       : "אחר"}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Contact Form */}
//           <Card
//             sx={{
//               boxShadow: 2,
//               borderRadius: 2,
//               overflow: "hidden",
//             }}
//           >
//             <CardHeader
//               title="טופס יצירת קשר"
//               titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
//             />
//             <Divider />
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="נושא"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       variant="outlined"
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="הודעה"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       variant="outlined"
//                       multiline
//                       rows={5}
//                       required
//                     />
//                   </Grid>
//                 </Grid>
//                 <Button
//                   id="submitButton"
//                   color="primary"
//                   type="submit"
//                   disabled={isDisabled}
//                   className={`w-full px-4 py-2 font-bold  ${
//                     isDisabled ? "cursor-not-allowed opacity-50" : ""
//                   }`}
//                 >
//                   {isDisabled ? "שולח הודעה..." : "שלח הודעה"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
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
import swal from "sweetalert";
import getUserDetails from "../utils/crud/user/getUserDetails";
import sendContactUsEmail from "../utils/sendContactUsEmail";
import UserPicHandling from "../components/User/UserPicHandling";
import { jwtDecode } from "jwt-decode";
import EditUserProfile from "../components/User/EditUserProfile";

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

  return (
    <DefaultLayout>
      <Container className="py-4" dir="rtl">
        {/* Account Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              {/* Left Section: Edit Profile and User Picture */}
              <Col xs={12} sm={3} className="text-center">
                <UserPicHandling />
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
