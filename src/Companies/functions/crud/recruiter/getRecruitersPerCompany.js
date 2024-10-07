import axios from '../../../../generalFunctions/config/axiosConfig';

export default async function getRecruitersPerCompany(token, setRecruiters, company_id) {
  try {
    const response = await axios.get(`/users/company/${company_id}/recruiters/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data) {
      setRecruiters(response.data);
    } else {
      console.log('Unexpected response:', response);
      setRecruiters([]); // Set to an empty array if no data is returned
    }
  } catch (error) {
    console.error('There was an error in fetching recruiters data!', error.message || error);
    setRecruiters([]); // Reset recruiters to an empty array in case of an error
  }
}