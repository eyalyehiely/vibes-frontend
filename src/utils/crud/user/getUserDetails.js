import axios from '../../../utils/config/axiosConfig';

export default async function getUserDetails(token, setUser, user_id) {
  try {
    const response = await axios.get(`/authenticate/user/${user_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setUser(response.data);
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current user data!', error);
  }
}