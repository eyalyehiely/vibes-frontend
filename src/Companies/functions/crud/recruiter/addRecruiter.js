
import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default function addRecruiter(token, setRecruiters, data, handleClose) {
  axios.post('/users/auth/signup/recruiter/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 201) {
      // Add the new recruiter to the list
      setRecruiters((prevRecruiters) => [...prevRecruiters, response.data]);
      
      // Show success alert and close modal
      swal({
        title: "Recruiter added successfully",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        handleClose();
      });
    } else {
      console.log('Unexpected response:', response);
    }
  })
  .catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Error",
      text: error.response?.data?.message || "An error occurred.",
      icon: "warning",
      button: "OK",
    });
  });
}