// authService.js
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export function isTokenValid(token) {
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert to seconds
  return decodedToken.exp > currentTime;
}

export async function refreshToken() {
  let authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const refresh = authTokens ? authTokens.refresh : null;

  if (refresh) {
    try {
      const response = await axios.post('http://localhost:8080/api/token/refresh/', {
        refresh,
      });
      authTokens.access = response.data.access;
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
      return authTokens.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle token refresh failure (e.g., redirect to login)
      localStorage.removeItem('authTokens');
      window.location.href = '/login'; // Adjust the path to your login route
      return null;
    }
  } else {
    // No refresh token available
    // Redirect to login or handle accordingly
    localStorage.removeItem('authTokens');
    window.location.href = '/login'; // Adjust the path to your login route
    return null;
  }
}

export async function getValidToken() {
  let authTokens = JSON.parse(localStorage.getItem('authTokens'));
  let token = authTokens ? authTokens.access : null;

  if (!token || !isTokenValid(token)) {
    console.log('Access token expired or missing, attempting to refresh...');
    token = await refreshToken();
  }

  return token;
}