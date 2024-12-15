import axios from '../config/axiosConfig';

export default async function fetchMessages(setMessages, token, chat_id) {
  try {
    const response = await axios.get(`/authenticate/fetch-messages/?chat_room=${chat_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setMessages(response.data.messages); // Use `messages` array from the response
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}