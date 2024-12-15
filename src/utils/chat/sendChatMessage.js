import axios from '../config/axiosConfig';

export default async function sendChatMessage (messageData, token){
  try {
    const response = await axios.post('/authenticate/send-message/', messageData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response.data);
  }
};
