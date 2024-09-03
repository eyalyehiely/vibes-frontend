import axios from './config/axiosConfig';
import swal from 'sweetalert';

export default function sendContactUsEmail(formData, token) {
  axios.post('/chat/support/', formData, {
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
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
      console.error('There was an error sending the email:', errorMessage);
      swal({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        button: 'OK',
      });
    });
}