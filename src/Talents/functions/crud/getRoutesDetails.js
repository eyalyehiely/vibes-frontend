import axios from '../../../utils/config/axiosConfig';

export default async function getRoutesDetails(token, setRoutes) {
  try {
    const response = await axios.get(`/authenticate/manage-route/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setRoutes(response.data.activities);
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current Routes data!', error);
  }
}