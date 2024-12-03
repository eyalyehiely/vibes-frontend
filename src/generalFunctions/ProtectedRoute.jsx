import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure this is correctly imported

const ProtectedRoute = () => {
  const token = localStorage.getItem('authTokens'); // Retrieve the token directly

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT string
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authTokens'); // Remove expired token
      return <Navigate to="/login" />;
    }

    return <Outlet />; // Render the protected routes
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('authTokens'); // Handle invalid token
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;