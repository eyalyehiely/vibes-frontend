// import axios from '../../../../generalFunctions/config/axiosConfig';
// import swal from 'sweetalert'; 

// export default function updateCompanyInfo(setCompany, data, handleClose, company_id, token) {
//   axios.put(`/users/user/${company_id}/`, data, {
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }
//   })
//     .then(response => {
//       if (response.status === 200) {
//         swal({
//           title: 'Company updated successfully!',
//           icon: 'success',
//           timer: 1000,
//           button: false,
//         }).then(() => {
//         setCompany(response.data)
//           handleClose();
//         });
//       } else {
//         console.log('Error:', response.data.message);
//       }
//     })
//     .catch(error => {
//       console.error('Error!', error);
//       swal({
//         title: 'Error!',
//         text: error.response?.data?.message || 'An error occurred during the update process.',
//         icon: 'warning',
//         button: 'OK',
//       });
//     });
// }

import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert'; 

export default function updateCompanyInfo(setCompany, data, handleClose, company_id, token) {
  axios.put(`/users/user/${company_id}/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.status === 200) {
        swal({
          title: 'Company updated successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        }).then(() => {
          // Update the company state with the response data to reflect changes immediately
          setCompany(response.data);
          // Close the modal or form after a successful update
          handleClose();
        });
      } else {
        console.error('Unexpected response:', response);
        swal({
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again.',
          icon: 'warning',
          button: 'OK',
        });
      }
    })
    .catch(error => {
      console.error('Error during update!', error);
      let errorMessage = 'An error occurred during the update process.';
      if (error.response && error.response.data) {
        // Check if there's a message or more detailed error information
        errorMessage = error.response.data.message || 
                       Object.values(error.response.data).flat().join('\n');
      }
      swal({
        title: 'Error!',
        text: errorMessage,
        icon: 'warning',
        button: 'OK',
      });
    });
}