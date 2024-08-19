
import axios from '../config/axiosConfig';

export default async function getTalentDetails(setTalent,talent_id) {

    await axios.get(`/usres/talent/${talent_id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        setTalent(response.data);
        
      } else {
        console.log('Error:', response.data.message);
      }
    }).catch(error => {
      console.error('There was an error in fetching current user data!', error);
    });
  }