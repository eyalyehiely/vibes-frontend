import axios from '../config/axiosConfig';

export default async function userChats(setChates,token){
    try {
        const response = await axios.get(`/authenticate/chats/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.status === 200) {
            setChates(response.data.chats);
        } else {
          console.log('Error:', response.data.message);
        }
      } catch (error) {
        console.error('There was an error in fetching current Routes data!', error);
      }
    }