// import axios from './config/axiosConfig';
import axios from 'axios'
import swal from 'sweetalert';

export default function sendContactUsEmail(formData, token) {
  console.log(token);
  axios.post(`${import.meta.env.VITE_REACT_APP_NOTIFICATIONS_API_URL}/contact-us/`, formData, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
})
  .then(response => {
    if (response.status === 200) {
      swal({
        title: 'Message sent successfully!',
        icon: 'success',
        timer: 1000,
        button: false,
      }).then(() => {
        window.location.reload();
      });
    } else {
      const errorMessage = response.data.error || 'An unexpected error occurred';
      console.log("Form data:", formData);
      console.log('Error:', errorMessage);
      swal({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        button: 'OK',
      });
    }
  })
  .catch(error => {
    const errorDetails = error.response ? error.response.data : error.message;
    console.error('Error response:', errorDetails);
    swal({
      title: 'Error',
      text: errorDetails.detail || 'An unexpected error occurred',
      icon: 'error',
      button: 'OK',
    });
  });
}