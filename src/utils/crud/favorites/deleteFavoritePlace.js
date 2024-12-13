import axios from '../../../utils/config/axiosConfig';
import swal from 'sweetalert';

export default async function deleteFavoritePlace(token, user_id, place_id, setPlaces) {
  try {
    // Ask for confirmation before deleting
    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Do you really want to delete this place? This action cannot be undone.',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    });

    if (willDelete) {
      const response = await axios.delete(
        `/authenticate/manage-favorites/${user_id}/?place_id=${place_id}`,
        
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { id: place_id }, // Sending place_id in the request body
        }
      );

      if (response.status === 200 || response.status === 204) {
        swal({
          title: 'Success!',
          text: 'The place has been successfully deleted.',
          icon: 'success',
          button: 'OK',
        }).then(() => {
          // Update the state to remove the deleted place
          setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== place_id));
        });
      } else {
        swal({
          title: 'Error!',
          text: response.data?.error || 'An unexpected error occurred.',
          icon: 'error',
          button: 'OK',
        });
      }
    } else {
      swal({
        title: 'Cancelled',
        text: 'The deletion has been cancelled.',
        icon: 'info',
        button: 'OK',
      });
    }
  } catch (error) {
    swal({
      title: 'Error!',
      text: error.response?.data?.error || 'An error occurred while deleting the place.',
      icon: 'error',
      button: 'OK',
    });
    console.error('Error during deletion process:', error);
  }
}