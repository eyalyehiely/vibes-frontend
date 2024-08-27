import axios from '../../../generalFunctions/config/axiosConfig';
import getCompanyDetails from './getCompanyDetails';
import swal from 'sweetalert'; 

export default function updateCompanyInfo(setCompany, data, handleClose, company_id, token) {
  axios.put(`/users/company/${company_id}/`, data, {
    headers: {
      'content-type': 'application/json',
      // Authorization: `Bearer ${token}`,
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
          getCompanyDetails(token, setCompany, company_id);
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