import axios from '../config/axiosConfig'
import swal from 'sweetalert';


export default function signin(formData) {
  axios.post('/users/auth/signin/', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      const token = response.data.access;  // Access token where custom claims are stored

      // Decode JWT token to access its claims
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded Token data:", decodedToken);  // Debugging log

      swal({
        title: "👤 Welcome",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        // Redirect based on the license type
        if (decodedToken.license_type === 'Company') {
          window.location.href = '/company/home';
        } else if (decodedToken.license_type === 'Talent') {
          window.location.href = '/talent/home';
        } else if (decodedToken.license_type === 'Recruiter') {
          window.location.href = '/recruiter/home';
        } else {
          console.error("Unknown license type:", decodedToken.license_type);
          swal({
            title: "Error",
            text: "Unknown user type.",
            icon: "warning",
            button: "OK",
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      if (error.response && error.response.status === 401) {
        swal({
          title: "Error",
          text: "Invalid email or password.",
          icon: "warning",
          button: "OK",
        });
      } else {
        swal({
          title: "Error",
          text: "An error occurred during sign-in.",
          icon: "warning",
          button: "OK",
        });
      }
    });
}