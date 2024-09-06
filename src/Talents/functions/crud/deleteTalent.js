import axios from '../../../generalFunctions/config/axiosConfig';

export default async function deleteTalent(token, setTalent, talent_id) {
  try {
    const response = await axios.delete(`/users/user/${talent_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      swal({
        title: 'Error!',
        text: response.data.message || 'An error occurred during the update process.',
        icon: 'warning',
        button: 'OK',
      }).then(()=>{
        setTalent(response.data);
        localStorage.removeItem('authToken')
        window.location.href='/'
      })
      
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error in fetching current user data!', error);
  }
}