import axios from '../../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';

export default async function  deleteCv(setCvFile, token, talent_id, setTalent) {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this CV!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`/users/manage-cv/${talent_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure correct formatting
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTalent(response.data)
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