import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert'; 
import getCompanyJobs from './getCompanyJobs'

export default function createJob(data, company_id, token, setJobs, handleClose) {
  axios.post(`users/company/${company_id}/job/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (response.status === 201) {
        swal({
          title: 'Job created successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        }).then(() => {
          // Add the new job to the current list of jobs
          setJobs(prevJobs => [...prevJobs, response.data]);
          getCompanyJobs(company_id, token, setJobs)
          handleClose(); // Close the modal
        });
      } else {
        console.log('Error:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error creating job:', error.response?.data || error.message);
      swal({
        title: 'Error!',
        text: error.response?.data?.error || 'An error occurred while creating the job.',
        icon: 'warning',
        button: 'OK',
      });
    });
}