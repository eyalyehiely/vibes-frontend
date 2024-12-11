// src/services/profileService.ts
import axios from '../../../utils/config/axiosConfig';
import Swal from 'sweetalert';

export default async function completeProfileUsingGoogle(formData, token){
  try {
    const response = await axios.post('/users/complete-profile/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (response.status === 201 || response.data.success) {
      Swal({
        icon: 'success',
        title: 'Profile Completed',
        text: 'Your profile has been completed successfully!',
        timer: 2500,
        button: false,
      }).then(() => {
        window.location.href = '/talent/home';
      });
    } else {
      Swal({
        icon: 'error',
        title: 'Profile Completion Failed',
        text: 'Failed to complete your profile. Please try again.',
      });
    }
  } catch (error) {
    console.error('Error completing profile:', error);
    Swal({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while completing your profile. Please try again later.',
    });
    throw new Error('An error occurred while completing your profile.');
  }
};