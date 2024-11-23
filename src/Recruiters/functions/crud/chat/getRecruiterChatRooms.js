// getRecruiterChatRooms.js
import axios from 'axios';
import swal from 'sweetalert';

export default async function getRecruiterChatRooms(recruiter_id, token) {
  try {
    const response = await axios.get(`http://localhost:8060/api/v1/chat/recruiter/${recruiter_id}/rooms/`, { // Corrected URL
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if the response data is an array (chat rooms)
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      // Show a notification if no chat rooms are found
      swal({
        title: 'No Chat Rooms Found!',
        text: 'No chat rooms were found for this recruiter.',
        icon: 'info',
        button: 'OK',
      });
      return [];
    }
  } catch (error) {
    console.error('Error fetching chat room details:', error.response?.data || error.message);

    // Show an error message in SweetAlert
    swal({
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred while fetching the chat room details.',
      icon: 'warning',
      button: 'OK',
    });
    return [];
  }
}