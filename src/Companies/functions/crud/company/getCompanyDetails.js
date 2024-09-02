import axios from '../../../../generalFunctions/config/axiosConfig';

export default async function getCompanyDetails(setCompany, company_id, token) {
  try {
    const response = await axios.get(`/users/user/${company_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setCompany(response.data);
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current user data!', error.response ? error.response.data : error.message);
  }
}