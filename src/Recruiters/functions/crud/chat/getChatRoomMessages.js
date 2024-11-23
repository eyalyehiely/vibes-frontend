import axios from 'axios';
import swal from 'sweetalert';

export default async function getChatRoomMessages(chat_id, token, setChatRoom) {
  try {
    const response = await axios.get(`http://localhost:8060/api/v1/chat/room/${chat_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Log the response to see the structure
    console.log(response.data);

    // Access messages based on the structure of the response
    if (response.data && response.data.data && Array.isArray(response.data.data.messages)) {
      setChatRoom(response.data.data.messages);
    } else {
      setChatRoom([]);
      swal({
        title: 'No Messages Found!',
        text: 'No messages were found for this chat room.',
        icon: 'info',
        button: 'OK',
      });
    }
  } catch (error) {
    console.error('Error fetching chat room details:', error.response?.data || error.message);

    // Handle 404 error specifically
    if (error.response?.status === 404) {
      swal({
        title: 'Chat Room Not Found!',
        text: 'The chat room you are looking for does not exist.',
        icon: 'warning',
        button: 'OK',
      });
    } else {
      // Show a general error message in SweetAlert
      swal({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred while fetching the chat room details.',
        icon: 'warning',
        button: 'OK',
      });
    }
  }
}