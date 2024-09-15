import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';
import getJobDetails from '../job/getJobDetails'; 

export default async function updateJob(job_id, jobData, token, handleClose, setJobs) {
  try {
    const response = await axios.put(`users/company/job/${job_id}/`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      swal({
        title: 'Job updated successfully!',
        icon: 'success',
        timer: 1000,
        button: false,
      }).then(() => {
        handleClose(); // Close the modal after the success alert
        getJobDetails(job_id, token, setJobs);
      });
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('Error!', error);
    swal({
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred during the update process.',
      icon: 'warning',
      button: 'OK',
    });
  }
}


  