import axios from '../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function deleteTalent(token, setTalent, talent_id) {
  try {
    // Ask for confirmation before deleting
    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Do you really want to delete this talent? This action cannot be undone.',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    });

    if (willDelete) {
      const response = await axios.delete(`/users/user/${talent_id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 204) { // 204 No Content is common for successful DELETE
        swal({
          title: 'Success!',
          text: 'Talent has been successfully deleted.',
          icon: 'success',
          button: 'OK',
        }).then(() => {
          setTalent(null); // Clear the talent state
          localStorage.removeItem('authTokens'); // Optional: only if you need to log out the user
          window.location.href = '/'; // Optional: redirect if necessary
        });
      } else {
        swal({
          title: 'Error!',
          text: response.data.message || 'An unexpected error occurred.',
          icon: 'error',
          button: 'OK',
        });
      }
    } else {
      swal({
        title: 'Cancelled',
        text: 'Talent deletion has been cancelled.',
        icon: 'info',
        button: 'OK',
      });
    }
  } catch (error) {
    swal({
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred while deleting the talent.',
      icon: 'error',
      button: 'OK',
    });
    console.error('There was an error during the deletion process:', error);
  }
}