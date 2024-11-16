import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import swal from 'sweetalert'
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);  // Check if `access_token` is present
      const { access_token } = tokenResponse;

      if (!access_token) {
        swal('Access token missing. Please try again.');
        return;
      }

      try {
        // Fetch user info from Google using the access token
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log("User Info Response:", userInfoResponse.data); // Log to verify user data

        const { email, name, picture, sub: googleUserId } = userInfoResponse.data;

        // Send the data to your backend
        const res = await axios.post(
          'http://localhost:8000/api/v1/users/google-login/',
          {
            email,
            googleUserId,
            name,
            picture,
          },
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          // Store JWT access token in localStorage if successful
          localStorage.setItem('authTokens', JSON.stringify(res.data));

          // Redirect based on profile completion
          if (res.data.missing_info) {
            window.location.href = '/complete-profile';
          } else {
            window.location.href = '/talent/home';
          }
        } else {
          swal(res.data.message || 'Google Sign-In failed.');
        }
      } catch (error) {
        console.error('Error during Google Sign-In:', error);
        swal('An error occurred during Google Sign-In.');
      }
    },
    onError: (errorResponse) => {
      console.error('Google Sign-In Error:', errorResponse);
      swal('Google Sign-In was unsuccessful. Please try again.');
    },
    scope: 'openid email profile',  // Ensure `openid` scope is included for ID token
  });

  return (
    <button
      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
      onClick={() => login()}
    >
      <span className="w-8 h-8">
        <FcGoogle className="w-full h-full" />
      </span>
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;