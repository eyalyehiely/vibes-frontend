import axios from '../config/axiosConfig';
import swal from 'sweetalert';

export default function fetchData(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  axios.post('/users/auth/request-password-reset/', { email })
    .then((response) => {
      if (response.status === 200) {
        swal({
          title: "קישור נשלח בהצלחה",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          window.location.href = '/signin';
        });
      } else {
        swal({
          title: "משתמש לא נמצא",
          icon: "warning",
          button: "אישור",
        });
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      swal({
        title: "שגיאה",
        text: "משהו השתבש, אנא נסה שוב",
        icon: "warning",
        button: "אישור",
      })
      .then(()=>{
        window.location.href = '/signin';
      })
    });
}
