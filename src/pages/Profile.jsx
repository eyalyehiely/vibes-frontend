
import React, { useState, useEffect } from "react";
import DefaultLayout from "../Talents/components/DefaultLayout";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import swal from "sweetalert";
import getUserDetails from "../Talents/functions/crud/getUserDetails";
import sendContactUsEmail from "../utils/sendContactUsEmail";
import UserPicHandling from "../Talents/components/UserPicHandling";
import { jwtDecode } from "jwt-decode";

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
        swal("הודעה נשלחה!", "תודה שפנית אלינו.", "success");
        setFormData({
          ...formData,
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending contact email:", error);
        swal("שגיאה", "אירעה בעיה בשליחת ההודעה. נסה שוב מאוחר יותר.", "error");
      });
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-500"></div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex h-full p-6" dir="rtl">
        <div className="w-full space-y-6">
          {/* Account Info */}
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              background: "linear-gradient(90deg, #f3f4f6, #ffffff)",
            }}
          >
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <UserPicHandling />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.username}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardHeader
              title="פרטים אישיים"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <Typography>
                    <strong>שם פרטי:</strong> {user.first_name || "לא סופק"}
                  </Typography>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Typography>
                    <strong>שם משפחה:</strong> {user.last_name || "לא סופק"}
                  </Typography>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Typography>
                    <strong>תאריך לידה:</strong> {user.birth_date || "לא סופק"}
                  </Typography>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Typography>
                    <strong>מגדר:</strong>{" "}
                    {user.gender === "male"
                      ? "זכר"
                      : user.gender === "female"
                      ? "נקבה"
                      : "אחר"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardHeader
              title="טופס יצירת קשר"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <Divider />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="נושא"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="הודעה"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={5}
                      required
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 4, width: "100%" }}
                >
                  שלח הודעה
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Profile;