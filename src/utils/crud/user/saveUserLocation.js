import axios from '../../../utils/config/axiosConfig';
import toast from "react-hot-toast";

export default async function saveUserLocation(latitude, longitude, token) {
  try {
    // Send the location to the server
    const response = await axios.post('/authenticate/save-user-location/',
      { latitude, longitude }, // Send as an object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Notify success
    toast.success(response.data.message);
    return response.data; // Return server response
  } catch (err) {
    // Handle errors
    if (err.response) {
      // Unauthorized error
      if (err.response.status === 401) {
        toast.error('Session expired. Please log in again.');
        return; // Exit the function
      }

      // Server-provided error message
      const errorMessage = err.response.data?.detail || 'An error occurred.';
      toast.error(errorMessage);
    } else {
      // Generic error
      toast.error('Failed to save location. Please try again.');
    }

    throw err; // Re-throw for further error handling
  }
}