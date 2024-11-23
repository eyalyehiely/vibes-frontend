import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const deleteTalentFromJob = async (job_id, token, talent_id, updateJobState) => {
  try {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, this talent will be removed from the job!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      const response = await axios.delete(`users/recruiters/tags/${job_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { talent_id }, // Include talent_id in the request body
      });

      if (response.status === 200) {
        await swal({
          title: "Success! 🗑️",
          text: "The talent has been removed successfully.",
          icon: "success",
          timer: 2000,
          button: false,
        });

        // Call the state updater function if provided
        if (typeof updateJobState === 'function') {
          updateJobState(job_id, talent_id);
        }
      } else {
        console.error('Error:', response.data.message);
        swal({
          title: "Error!",
          text: "An error occurred while removing the talent.",
          icon: "warning",
          button: "OK",
        });
      }
    } else {
      swal("The talent was not removed.");
    }
  } catch (error) {
    console.error('There was an error deleting the talent!', error);
    swal({
      title: "Error!",
      text: "An error occurred while removing the talent.",
      icon: "error",
      button: "OK",
    });
  }
};

export default deleteTalentFromJob;