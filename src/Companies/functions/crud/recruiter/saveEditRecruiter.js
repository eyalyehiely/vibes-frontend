import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const saveEditRecruiter = async (token, editedRecruiter, recruiterId, updateRecruitersState) => {
  try {
    const response = await axios.put(
      `/users/user/${recruiterId}/`, 
      {
        first_name: editedRecruiter.first_name,
        last_name: editedRecruiter.last_name,
        division: editedRecruiter.division,
        position: editedRecruiter.position,
        // Add any additional required fields here
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      swal({
        title: 'Recruiter updated successfully!',
        icon: 'success',
        timer: 1000,
        button: false,
      });
      updateRecruitersState(response.data);
    }
  } catch (error) {
    console.error('Error response:', error.response || error);
    swal({
      title: 'Error!',
      text: error.response?.data?.detail || 'Failed to update recruiter.',
      icon: 'error',
      button: 'OK',
    });
  }
};

export default saveEditRecruiter;