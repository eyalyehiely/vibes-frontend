
import axios from '../config/axiosConfig';


export default async function sendOtp(email) {
  try {
    const response = await axios.post('/authenticate/send-otp-email/', {
      username: email, // Match backend field
    });
    return response; // Return the full response object
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors
      const errorMessage = error.response.data.detail || 'שגיאה בשליחת קוד האימות';
      throw { status: error.response.status, data: { detail: errorMessage } }; // Include status and data
    } else {
      // Handle network or other errors
      throw { status: 500, data: { detail: 'שגיאה בחיבור לשרת' } };
    }
  }
}