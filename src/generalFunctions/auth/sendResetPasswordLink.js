import axios from '../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default function sendResetPasswordLink(email) {
  axios.post('/users/auth/request-password-reset/', { email })
    .then((response) => {
      if (response.status === 200) {
        swal({
          title: "Link has been sent successfully",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          window.location.href = '/';
        });
      } else if (response.status === 404) {
        swal({
          title: "User not found",
          icon: "warning",
          button: "OK",
        });
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      swal({
        title: "Error",
        text: error.response?.data?.error || "An unexpected error occurred",
        icon: "warning",
        button: "OK",
      });
    });
}