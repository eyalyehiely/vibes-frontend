// import axios from '../../../generalFunctions/config/axiosConfig';
// import getTalentDetails from './getTalentDetails';
// import swal from 'sweetalert'; 

// export default function updateTalentInfo(setTalent, data, handleClose, talent_id, token) {
//   axios.put(`/users/user/${talent_id}/`, data, {
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }
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
//       console.error('Error!', response.data.message);
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
    .catch(err => {
      console.error('Error!', err.response?.data?.message || err.message);
      swal({
        title: 'Error!',
        text: err.response?.data?.message || 'An error occurred during the update process.',
        icon: 'warning',
        button: 'OK',
      });
    });
}