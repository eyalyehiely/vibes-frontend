import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const updateJob = async (job_id,company_id, jobData, token) => {
  try {
    const response = await axios.put(`users/company/${company_id}/job/${job_id}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    swal('Success!', 'Job updated successfully!', 'success');
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error.response?.data || error.message);
    swal('Error!', error.response?.data?.error || 'An error occurred while updating the job.', 'error');
    throw error;
  }
};

export default updateJob;