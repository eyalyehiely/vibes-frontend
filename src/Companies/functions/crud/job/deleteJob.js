import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const deleteJob = async (job_id,token, setJobs) => {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axios.delete(`users/company/job/${job_id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          swal({
            title: "Success! 🗑️",
            text: "The job has been deleted successfully.",
            icon: "success",
            timer: 2000,
            button: false,
          }).then(() => {
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== job_id));
          });
        } else {
          swal({
            title: "Error!",
            text: "An error occurred while deleting the job.",
            icon: "warning",
            button: "OK",
          });
          console.log('Error:', response.data.message);
        }
      } else {
        swal("Your job data is safe!");
      }
    });
  } catch (error) {
    console.error('There was an error deleting the job!', error);
    swal({
      title: "Error!",
      text: "An error occurred while deleting the job.",
      icon: "error",
      button: "OK",
    });
  }
};

export default deleteJob;