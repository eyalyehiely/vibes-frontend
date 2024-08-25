import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default function companySignUp(formData) {
  axios.post('/users/auth/signup/company/', formData)
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log(response.data);
      swal({
        title: "👤 Company added successfully",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        window.location.href = '/company/home';
      });
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        // Check if the error is related to the email domain
        if (error.response.data.email && error.response.data.email.includes("Public email domains are not allowed for company registration.")) {
          swal({
            title: "Invalid Email",
            text: "Public email domains are not allowed for company registration.",
            icon: "warning",
            button: "OK",
          });
        } else {
          // Handle other 400 errors
          swal({
            title: "Error",
            text: "An error occurred during signup. Please check your input.",
            icon: "warning",
            button: "OK",
          });
        }
      } else {
        // Handle other errors
        console.error(error);
        swal({
          title: "Error",
          text: "An error occurred during signup.",
          icon: "warning",
          button: "OK",
        });
      }
    });
}