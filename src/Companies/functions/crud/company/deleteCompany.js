import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function deleteCompany(token, setCompany, company_id) {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this company!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axios.delete(`/users/user/${company_id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          swal({
            title: "Success! 🗑️",
            text: "The company has been deleted successfully.",
            icon: "success",
            timer: 2000,
            button: false,
          }).then(() => {
            setCompany(response.data);
            localStorage.removeItem('authToken');
            window.location.href = '/auth/signin';
          });
        } else {
          swal({
            title: "Error!",
            text: "An error occurred while deleting the company.",
            icon: "warning",
            button: "OK",
          });
          console.log('Error:', response.data.message);
        }
      } else {
        swal("Your company data is safe!");
      }
    });
  } catch (error) {
    console.error('There was an error deleting the company!', error);
    swal({
      title: "Error!",
      text: "An error occurred while deleting the company.",
      icon: "error",
      button: "OK",
    });
  }
}