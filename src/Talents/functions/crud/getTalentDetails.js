import axios from '../../../functions/config/axiosConfig';

export default async function getTalentDetails(token, setTalent, talent_id) {
  try {
    const response = await axios.get(`/users/talent/${talent_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setTalent(response.data);
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current user data!', error);
  }
}