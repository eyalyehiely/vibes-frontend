import React, { useState, useEffect } from "react";
import DefaultLayout from "../Talents/components/DefaultLayout";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import getUserDetails from "../Talents/functions/crud/getUserDetails";
import sendContactUsEmail from "../generalFunctions/sendContactUsEmail";
import UserPicHandling from "../Talents/components/UserPicHandling";
import { jwtDecode } from "jwt-decode";

function AccountPanel() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.user_id;

      getUserDetails(token, setUser, user_id).then((userData) => {
        setFormData({
          ...formData,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.username || "",
        });
      });
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
  
    if (!formData.subject || !formData.message) {
      swal("Please fill out the subject and message fields.");
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
        swal("Your message has been sent!");
        setFormData({
          ...formData,
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        swal("There was an error sending your message. Please try again.");
      });
  };

  return (
    <DefaultLayout>
      <div className="flex h-full p-6" dir="rtl">
        <div className="space-y-6 w-full">
          {/* Account Info */}
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                  <UserPicHandling />
                <Grid item xs>
                  <Typography variant="h5">
                    {user.first_name} {user.last_name}, {user.age || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.username}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader title="פרטים אישיים" />
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
          <Card>
            <CardHeader title="טופס יצירת קשר" />
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
                  className="mt-4 w-full"
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

export default AccountPanel;