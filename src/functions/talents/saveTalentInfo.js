import axios from '../config/axiosConfig'
import getTalentDetails from './getTalentDetails';

export default function saveTalentInfo(setTalent,profileFormData) {
  axios.put(`/auth/edit_user/`, profileFormData, {
    headers: {
      'content-type': 'application/json',
      // Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: 'User updated successfully!',
          icon: 'success',
          timer:1000,
          button: false,
        }).then(()=>{
          getTalentDetails(token, setTalent);
          window.location.reload()
          handleClose();
        })
       
      } else {
        console.log('Error:', response.data.message);

      }
    })
    .catch(error => {
      console.error('שגיאה!', error);
      swal({
        title: 'Error!',
        icon: 'warning',
        button: 'OK',
      });
    });
}
