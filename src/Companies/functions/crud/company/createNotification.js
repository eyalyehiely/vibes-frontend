import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

const createNotification = async (token, subject, recipients, message, end_date,company_id) => {
  try {
    const response = await axios.post(`/notifications/company/${company_id}/`,
      {
        subject: subject,
        company_id:company_id,
        recipients: recipients, // This should be an array of user IDs
        message: message,
        end_date: end_date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      swal("Success", "Notification sent successfully!", "success");
    } else {
      swal("Error", "Failed to send the notification.", "error");
    }
  } catch (error) {
    console.error('Error creating notification:', error);
    swal({
      title: 'Error!',
      text: error.response?.data?.error || 'An error occurred while creating the notification.',
      icon: 'warning',
      button: 'OK',
    });
  }
};

export default createNotification;