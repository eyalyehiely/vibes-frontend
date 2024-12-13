import axios from '../config/axiosConfig';
import swal from 'sweetalert';

export default function signup(formData) {
  axios.post('authenticate/signup/', formData)
    .then((response) => {
      localStorage.setItem('authTokens', response.data.access);
      console.log(response.data);
      swal({
        title: "הצטרפת אלינו!",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        window.location.href = '/';
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