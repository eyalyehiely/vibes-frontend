import axios from 'axios';
import swal from 'sweetalert';

export default async function sendMessage({ room_id, sender, receiver, content, token }) {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/chat/send-message/`, {
      room_id,   // Chat room ID
      sender,    // Sender's user ID
      receiver,  // Receiver's user ID
      content    // Message content
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // If message is sent successfully
    if (response.status === 201) {
        console.log('Message Sent!');
      return response.data.data; // Returning the message data in case needed
    } else {
     console.log('Message Not Sent!');
    }
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);

    // Handle different types of errors
    if (error.response?.status === 404) {
      swal({
        title: 'Invalid Room or User!',
        text: 'The room or user you are trying to message does not exist.',
        icon: 'warning',
        button: 'OK',
      });
    } else {
      swal({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred while sending the message.',
        icon: 'error',
        button: 'OK',
      });
    }
  }
}