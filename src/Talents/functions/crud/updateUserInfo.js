
import axios from '../../../utils/config/axiosConfig';
import swal from 'sweetalert';

export default function updateUserInfo(setUser, data, handleClose, user_id, token) {
  axios.put(`/authenticate/user/${user_id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      swal({
        title: 'User updated successfully!',
        icon: 'success',
        timer: 1000,
        button: false,
      }).then(() => {
        setUser(response.data); 
        handleClose();
      });
    })
    .catch(err => {
      console.error('Error!', err);
      let errorMessage = 'An error occurred during the update process.';
      if (err.response && err.response.data) {
        errorMessage = err.response.data.detail || 'An error occurred.';
      }
      swal({
        title: 'Error!',
        text: errorMessage,
        icon: 'warning',
        button: 'OK',
      });
    });
}