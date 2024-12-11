import axios from '../config/axiosConfig';

export default async function sendOtp(email) {
  try {
    const response = await axios.post('/authenticate/send-otp-email/', {
      username: email, // Match backend field
    });
    return response.data; // Return response if needed
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors
      const errorMessage = error.response.data.detail || 'שגיאה בשליחת קוד האימות'; // Use detail if provided
      throw new Error(errorMessage);
    } else {
      // Handle network or other errors
      throw new Error('שגיאה בחיבור לשרת');
    }
  }
}