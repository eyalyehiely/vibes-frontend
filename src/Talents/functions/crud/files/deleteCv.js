import axios from '../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';

export default async function deleteCv(token, setCvFile) {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this CV!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete('/users/manage-cv/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure correct formatting
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCvFile(null); // Clear the CV file in the state
          swal('CV deleted successfully!', {
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting CV:', error);
        swal({
          title: 'Error!',
          text: 'Failed to delete CV.',
          icon: 'error',
          button: 'OK',
        });
      });
    } else {
      swal('Your CV is safe!');
    }
  });
};