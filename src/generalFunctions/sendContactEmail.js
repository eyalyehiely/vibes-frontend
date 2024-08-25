
import axios from './config/axiosConfig';

export default function sendContactEmail(formData, token) {
  return axios.post('/users/contact-us/', formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        console.log('Email sent successfully!');
        return response.data;
      } else {
        console.log("form data", formData);
        console.log('Error:', response.data.error);
        return Promise.reject(response.data.error);
      }
    })
    .catch(error => {
      console.error('There was an error sending the email:', error.response || error.message);
      return Promise.reject(error.response?.data || error.message);
    });
}