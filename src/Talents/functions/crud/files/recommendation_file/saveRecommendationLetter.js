import axios from '../../../../../generalFunctions/config/axiosConfig'
import swal from 'sweetalert';
import getTalentDetails from "../../../../../Recruiters/functions/crud/getRecruiterDetails";


export default async function saveRecommendationLetter(recommendationLetter, token, talent_id, setTalent){
  if (recommendationLetter && recommendationLetter.file) {
    const formData = new FormData();
    formData.append('recommendation_letter', recommendationLetter.file);

    try {
      const response = await axios.post(`/users/manage-recommendation-letter/${talent_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        swal({
          title: 'Recommendation letter saved successfully!',
          icon: 'success',
          timer: 1000,
          button: false,
        });
        getTalentDetails(token, setTalent, talent_id);
      }
    } catch (error) {
      console.error('Error saving recommendation letter:', error);
      swal({
        title: 'Error!',
        text: 'Failed to save recommendation letter.',
        icon: 'error',
        button: 'OK',
      });
    }
  }
};