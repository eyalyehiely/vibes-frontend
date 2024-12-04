import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode

const ProtectedRoute = () => {
  // Retrieve the token directly from localStorage
  const token = localStorage.getItem('authTokens');

  if (!token) {
    // If no token exists, redirect to the login page
    return <Navigate to="/login" />;
  }

  try {
    // Decode the JWT token
    const decodedToken = jwtDecode(token); 

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired, clear it and redirect to login
      localStorage.removeItem('authTokens');
      return <Navigate to="/login" />;
    }

    // Token is valid, render the protected routes
    return <Outlet />;
  } catch (error) {
    // Handle errors (e.g., malformed tokens)
    console.error('Error decoding token:', error);
    localStorage.removeItem('authTokens'); // Remove invalid token
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;