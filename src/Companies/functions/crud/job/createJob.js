
import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';
export default async function createJob(data, company_id, token, setJobs = () => {}, handleClose) {
  try {
    const response = await axios.post(`users/company/${company_id}/job/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      handleClose(); // Close the modal first
      swal({
        title: 'Job created successfully!',
        icon: 'success',
        timer: 1000,
        button: false,
      });

      setJobs((prevJobs) => [...prevJobs, response.data]); // Add the new job to the list
      return response.data; // Return the created job
    } else {
      console.log('Error:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error creating job:', error.response?.data || error.message);
    swal({
      title: 'Error!',
      text: error.response?.data?.error || 'An error occurred while creating the job.',
      icon: 'warning',
      button: 'OK',
    });
    return null;
  }
}