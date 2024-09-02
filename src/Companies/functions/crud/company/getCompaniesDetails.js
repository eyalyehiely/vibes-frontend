import axios from '../../../../generalFunctions/config/axiosConfig';

export default async function getCompaniesDetails(token, setCompanies) {
  try {
    const response = await axios.get(`/users/companies/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
        setCompanies(response.data);
      
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current user data!', error);

  }
}