import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function getCompanyJobs(company_id, token, setJobs) {
  try {
    const response = await axios.get(`users/company/${company_id}/jobs/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    });

    // Ensure that the response contains data and it's an array
    if (Array.isArray(response.data)) {
      setJobs(response.data);
    } else {
      setJobs([]); // Set an empty array if the response is not an array
      swal({
        title: 'No Jobs Found!',
        text: 'No jobs were found for this company.',
        icon: 'info',
        button: 'OK',
      });
    }
  } catch (error) {
    console.log('Error fetching job details:', error.response?.data || error.message);
    
    // Display appropriate error message in SweetAlert
    swal({
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred while fetching the job details.',
      icon: 'warning',
      button: 'OK',
    });
  } finally {
    setJobs([]);
  }
}