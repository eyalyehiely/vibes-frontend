import axios from '../axiosConfig';
import swal from 'sweetalert';

export default function signup(formData) {
  axios.post('/users/auth/signup/talent/', formData)
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log(response.data);
      swal({
        title: "👤 משתמש נוסף בהצלחה",
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
        title: "שגיאה",
        text: "An error occurred during signup.",
        icon: "warning",
        button: "אישור",
      });
    });
}