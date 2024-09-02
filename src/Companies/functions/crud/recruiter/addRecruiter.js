import axios from '../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';
import getRecruitersPerCompany from './getRecruitersPerCompany';

export default function addRecruiter(token, setRecruiter, data, handleClose) {
  axios.post('/users/auth/signup/recruiter/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log(response.data);  // Inspect the response data
    if (response.status === 201) {
      setRecruiter((prevRecruiters) => [...prevRecruiters, response.data]);
      swal({
        title: "Recruiter added successfully",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        handleClose();
        getRecruitersPerCompany(token, setRecruiter);
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