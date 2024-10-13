import axios from 'axios';
import swal from 'sweetalert';

export default async function getRecruiterChatRooms(recruiter_id,token, setChatRooms) {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/chat/${recruiter_id}/rooms/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if the response data is an array (chat rooms)
    if (Array.isArray(response.data)) {
      setChatRooms(response.data);
    } else {
      // Set an empty array and show a notification if no chat rooms are found
      setChatRooms([]);
      swal({
        title: 'No Chat Rooms Found!',
        text: 'No chat rooms were found for this recruiter.',
        icon: 'info',
        button: 'OK',
      });
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
  }
}