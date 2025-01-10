// saveProfilePicture.js

import axios from '../../utils/config/axiosConfig';
import swal from 'sweetalert';
import getUserDetails from "../crud/user/getUserDetails";

export default async function saveProfilePicture(profilePic, token, setUser) {
  if (profilePic && profilePic.file) {
    const formData = new FormData();
    formData.append('profile_picture', profilePic.file);

    try {
      const response = await axios.post(`/authenticate/manage-profile-pic/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        swal({
          title: 'Profile picture saved successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        });
      }
    } catch (error) {
      console.error('Error saving profile picture:', error);
      swal({
        title: 'Error!',
        text: error.response?.data?.message || error.message,
        icon: 'error',
        button: 'OK',
      });
    }
  }
}