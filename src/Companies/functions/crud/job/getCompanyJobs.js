import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function getCompanyJobs(company_id, token, setJobs) {
  try {
    const response = await axios.get(`users/company/${company_id}/jobs/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setJobs(response.data);
  } catch (response) {
    console.error('Error fetching job details:', error.response?.data || error.message);
    
    // Display appropriate error message in SweetAlert
    swal({
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred while fetching the job details.',
      icon: 'warning',
      button: 'OK',
    });
  }
}