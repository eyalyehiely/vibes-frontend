import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ requiredRole }) => {
  const tokenData = localStorage.getItem('authTokens');
  const token = tokenData ? JSON.parse(tokenData).access : null;

  if (!token) {
    return <Navigate to="/signin" />; // Redirect to sign-in if no token
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authTokens');
      return <Navigate to="/signin" />;
    }

    // Check if the user type matches the required role
    if (requiredRole && decodedToken.user_type !== requiredRole) {
      return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
    }

    return <Outlet />; // Render the protected component
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('authTokens');
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;