import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const getCompanyJobs = async (company_id, token, setJobs) => {
  try {
    
    const response = await axios.get(`users/company/${company_id}/jobs/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setJobs(response.data);
  } catch (error) {
    console.error('Error fetching job details:', error.response?.data || error.message);
    swal('Error!', error.response?.data?.error || 'An error occurred while fetching job details.', 'error');
    throw error;
  }
};

export default getCompanyJobs;