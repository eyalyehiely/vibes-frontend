import axios from '../../../../generalFunctions/config/axiosConfig';
import swal from 'sweetalert';

export default async function createNotification (token, subject, recipients, message, end_date, company_id){
  try {
    console.log('Token:', token);
    console.log('Request Data:', {
      subject,
      company_id,
      recipients,
      message,
      end_date,
    });

    const response = await axios.post(
      `http://localhost:8070/api/v1/notifications/company/${company_id}/`,
      {
        subject: subject,
        company_id: company_id,
        recipients: recipients, // Ensure this is an array of expected values (e.g., "all_recruiters" or list of divisions)
        message: message,
        end_date: end_date,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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
    console.error('Error creating notification:', error.response?.data || error.message);
    swal({
      title: 'Error!',
      text: error.response?.data?.error || 'An error occurred while creating the notification.',
      icon: 'warning',
      button: 'OK',
    });
  }
};
