import axios from '../../functions/config/axiosConfig';
import getTalentDetails from './getTalentDetails';
import swal from 'sweetalert'; 

export default function updateTalentInfo(setTalent, data, handleClose, talent_id, token) {
  axios.put(`/users/talent/${talent_id}/`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.status === 200) {
        swal({
          title: 'User updated successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        }).then(() => {
          getTalentDetails(token, setTalent, talent_id);
          handleClose();
        });
      } else {
        console.log('Error:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error!', error);
      swal({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred during the update process.',
        icon: 'warning',
        button: 'OK',
      });
    });
}