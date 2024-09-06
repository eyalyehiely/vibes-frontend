import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

// Example function to get recruiter details
export default async function getRecruiterDetails(recruiterId, token) {
  try {
    const response = await axios.get(`/users/recruiters/${recruiterId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  // Return the parsed data directly
  } catch (error) {
    swal({
      title: 'Failed to fetch recruiter details',
      text: error.response?.data?.message || 'Something went wrong',
      icon: "warning",
      timer: 1000,
      button: false,
    });
    console.error("Error fetching recruiter details:", error);
    return null;
  }
}