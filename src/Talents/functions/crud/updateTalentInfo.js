
// import axios from '../../../generalFunctions/config/axiosConfig';
// import getTalentDetails from './getTalentDetails';
// import swal from 'sweetalert';

// export default function updateTalentInfo(setTalent, data, handleClose, talent_id, token) {
//   axios.put(`/users/user/${talent_id}/`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(response => {
//       if (response.status === 200) {
//         swal({
//           title: 'User updated successfully!',
//           icon: 'success',
//           timer: 1000,
//           button: false,
//         }).then(() => {
//           getTalentDetails(token, setTalent, talent_id);
//           handleClose();
//         });
//       } else {
//         console.log('Error:', response.data.message);
//       }
//     })
//     .catch(err => {
//       console.error('Error!', response.data.message || err.message);
//       swal({
//         title: 'Error!',
//         text: response.data.message || 'An error occurred during the update process.',
//         icon: 'warning',
//         button: 'OK',
//       });
//     });
// }

import axios from '../../../generalFunctions/config/axiosConfig';
import getTalentDetails from './getTalentDetails';
import swal from 'sweetalert';

export default function updateTalentInfo(setTalent, data, handleClose, talent_id, token) {
  axios.put(`/users/user/${talent_id}/`, data, {
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
        getTalentDetails(token, setTalent, talent_id);
        handleClose();
      });
    })
    .catch(err => {
      console.error('Error!', err);
      console.log('Error Response Data:', err.response.data);
    
      let errorMessage = 'An error occurred during the update process.';
      if (err.response && err.response.data) {
        if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (typeof err.response.data === 'object') {
          errorMessage = Object.values(err.response.data)
            .flat()
            .join('\n');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      }
    
      swal({
        title: 'Error!',
        text: errorMessage,
        icon: 'warning',
        button: 'OK',
      });
    });
}