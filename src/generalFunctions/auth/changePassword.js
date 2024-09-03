import axios from '../config/axiosConfig';
import swal from 'sweetalert';

export default function changePassword( token, email, newPassword) {
  axios.put(`/users/auth/reset-password/${token}/`, { email, newPassword })
    .then((response) => {
      if (response.status === 200) {
        swal({
          title: "Password has been changed successfully",
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
      } else {
        swal({
          title: "An unexpected error occurred",
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