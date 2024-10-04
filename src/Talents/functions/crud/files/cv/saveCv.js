import axios from '../../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';
import getTalentDetails from "../../../../../Recruiters/functions/crud/getRecruiterDetails";

export default async function saveCv(cvFile, token, talent_id, setTalent) {
  if (cvFile && cvFile.file) {
    const formData = new FormData();
    formData.append('cv', cvFile.file);

    try {
      const response = await axios.post(`/users/manage-cv/${talent_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        swal({
          title: 'CV saved successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        });
        // Re-fetch the talent details after saving the CV
        getTalentDetails(token, setTalent, talent_id);
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      swal({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        button: 'OK',
      });
    }
  }
}