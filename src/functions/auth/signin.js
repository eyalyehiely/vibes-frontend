import axios from '../config/axiosConfig';
import swal from 'sweetalert';

export default function signin(formData) {
  axios.post('/users/auth/signin/', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log(response.data);
      swal({
        title: "👤 Welcome",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        window.location.href = '/';
      });
    })
    .catch((error) => {
      console.error(error);
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