import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function getJobDetails(job_id, token, setJobs) {
  try {
    const response = await axios.get(`users/company/job/${job_id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setJobs(response.data);
  } catch (error) {
    console.error('Error fetching job details:', error.response?.data || error.message);
    swal({
      title: 'Error!',
      text: error.response?.data?.error || 'An error occurred while fetching the job details.',
      icon: 'warning',
      button: 'OK',
    });
  }
};