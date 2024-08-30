import axios from '../../../generalFunctions/config/axiosConfig';
import getRecruiterDetails from './getRecruiterDetails';
import swal from 'sweetalert'; 

export default function updateRecruiterInfo(setRecruiter, data, handleClose, recruiter_id, token) {
  axios.put(`/users/user/${recruiter_id}/`, data, {
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
          getRecruiterDetails(token, setRecruiter, recruiter_id);
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