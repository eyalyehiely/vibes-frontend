import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default function talentSignup(formData) {
  axios.post('/users/auth/signup/talent/', formData)
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log(response.data);
      swal({
        title: "👤 User add successfully",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        window.location.href = '/talent/home';
      });
    })
    .catch((error) => {
      console.error(error);
      swal({
        title: "Error",
        text: "An error occurred during signup.",
        icon: "warning",
        button: "OK",
      });
    });
}