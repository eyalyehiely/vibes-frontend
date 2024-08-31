import axios from '../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';

export default async function deleteRecommendationLetter(token){
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this recommendation letter!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete('/users/manage_recommendation_letter/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRecommendationLetter(null);
          swal('Recommendation letter deleted successfully!', {
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting recommendation letter:', error);
        swal({
          title: 'Error!',
          text: 'Failed to delete recommendation letter.',
          icon: 'error',
          button: 'OK',
        });
      });
    } else {
      swal('Your recommendation letter is safe!');
    }
  });
};