import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function deleteRecruiter(token, setRecruiter, recruiter_id) {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Recruiter!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axios.delete(`/users/user/${recruiter_id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          swal({
            title: "Success! 🗑️",
            text: "The Recruiter has been deleted successfully.",
            icon: "success",
            timer: 2000,
            button: false,
          }).then(() => {
            setRecruiter(response.data);
            localStorage.removeItem('authToken');
            window.location.href = '/';
          });
        } else {
          swal({
            title: "Error!",
            text: "An error occurred while deleting the Recruiter.",
            icon: "warning",
            button: "OK",
          });
          console.log('Error:', response.data.message);
        }
      } else {
        swal("Your Recruiter data is safe!");
      }
    });
  } catch (error) {
    console.error('There was an error deleting the Recruiter!', error);
    swal({
      title: "Error!",
      text: "An error occurred while deleting the Recruiter.",
      icon: "error",
      button: "OK",
    });
  }
}