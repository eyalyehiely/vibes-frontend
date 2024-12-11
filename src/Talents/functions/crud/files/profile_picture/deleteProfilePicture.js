import axios from '../../../../../utils/config/axiosConfig'
import swal from 'sweetalert';

export default async function deleteProfilePicture(setProfilePicture, token, talent_id, setTalent) {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this ProfilePicture!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`/authenticate/manage-profile-pic/${talent_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure correct formatting
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTalent(response.data)
          setProfilePicture(null);
          swal('Profile picture deleted successfully!', {
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting Profile picture:', error);
        swal({
          title: 'Error!',
          text: 'Failed to delete Profile picture.',
          icon: 'error',
          button: 'OK',
        });
      });
    } else {
      swal('Your Profile picture is safe!');
    }
  });
};