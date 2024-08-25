export default function updateTalentFiles(setTalent, formData, handleClose, talent_id, token) {
    axios.put(`/users/talent/${talent_id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      if (response.status === 200) {
        swal({
          title: 'Files updated successfully!',
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
    .catch(error => {
      console.error('Error!', error);
      swal({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred during the file upload process.',
        icon: 'warning',
        button: 'OK',
      });
    });
  }