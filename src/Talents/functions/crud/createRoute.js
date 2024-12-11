import axios from '../../../utils/config/axiosConfig';
import swal from 'sweetalert';

export default async function createRoute(formData, token) {
  try {
    // Validate form data
    // if (!formData.date_time || !formData.area || !formData.cost || !formData.company) {
    //   swal({
    //     title: 'Missing Fields!',
    //     text: 'Please complete all fields before submitting.',
    //     icon: 'warning',
    //     button: 'OK',
    //   });
    //   return;
    // }

    const response = await axios.post('/authenticate/manage-route/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    swal({
      title: 'Route Created Successfully!',
      icon: 'success',
      timer: 1000,
      button: false,
    });

    return response.data; // Return data to the calling component
  } catch (err) {
    let errorMessage = 'An error occurred.';
    if (err.response) {
      if (err.response.status === 401) {
        swal({
          title: 'Session Expired',
          text: 'Please log in again.',
          icon: 'warning',
          button: 'OK',
        });
        window.location.href = '/login'; // Redirect to login
        return;
      }
      errorMessage = err.response.data?.detail || 'An error occurred.';
    }
    swal({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      button: 'OK',
    });

    throw err; // Re-throw error for further handling
  }
}