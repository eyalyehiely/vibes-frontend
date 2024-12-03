import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function createRoute(formData) {
  try {
    const response = await axios.post('/authenticate/manage-route/', formData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    });

    swal({
      title: 'הוספנו את בקשתך',
      icon: 'success',
      timer: 1000,
      button: false,
    });

    return response.data; // Return data to the calling component
  } catch (err) {
    console.error('Error!', err);
    let errorMessage = 'An error occurred during the update process.';
    if (err.response && err.response.data) {
      errorMessage = err.response.data.detail || 'An error occurred.';
    }
    swal({
      title: 'Error!',
      text: errorMessage,
      icon: 'warning',
      button: 'OK',
    });

    throw err; // Re-throw error for further handling
  }
}