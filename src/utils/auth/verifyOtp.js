
import axios from '../config/axiosConfig';

export default async function verifyOtp(email, otp) {
  try {
    const response = await axios.post(
      '/authenticate/verify-otp-email/',
      { email, otp },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('OTP Verification Response:', response);

    if (response.status === 200) {
      // Store the token and redirect
      const { access } = response.data;

      console.log('OTP verified successfully. Token:', access);

      localStorage.setItem('authTokens', access); // Ensure the key matches other parts of your app
      return { success: true, status: response.status, data: response.data };
    }

    return { success: false, status: response.status, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || 'שגיאה באימות קוד האימות';

    console.error('Error verifying OTP:', errorMessage);

    return {
      success: false,
      status: error.response?.status || 500,
      data: error.response?.data || { detail: 'שגיאה בשרת' },
    };
  }
}