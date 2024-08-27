import axios from '../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';
import getRecruitersPerCompany from './getRecruitersPerCompany';

export default function addRecruiter(token, setRecruiter, data, handleClose) {
  axios.post('/users/auth/signup/recruiter/', data, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setRecruiter((prevDebts) => [...prevDebts, response.data]);
    swal({
      title: "Recruiter added succsessfully",
      icon: "success",
      timer:1000,
      button: false,
    }).then(() => {
      handleClose();
      handleClose
      getRecruitersPerCompany(token,setRecruiter)
     
    });
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!Error ",
      icon: "warning",
      button: "OK",
    });
  });
}
