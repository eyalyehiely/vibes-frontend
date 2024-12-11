import axios from '../../../../../utils/config/axiosConfig'
import swal from 'sweetalert';
import getUserDetails from "../../getUserDetails";

export default async function saveProfilePicture(profilePic, token, user_id, setUser) {
  if (profilePic && profilePic.file) {
    const formData = new FormData();
    formData.append('profile_picture', profilePic.file);

    try {
      const response = await axios.post(`/authenticate/manage-profile-pic/${user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        swal({
          title: 'profile picture saved successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        });
        // Re-fetch the talent details after saving the profile picture
        getUserDetails(token, setUser, user_id);
      }
    } catch (error) {
      console.error('Error saving profile picture:', error);
      swal({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        button: 'OK',
      });
    }
  }
}