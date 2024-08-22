import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const checkTalentToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authTokens');
          navigate('/auth/talent/signin');
        }

        // Check if the license type is not 'Talent'
        if (decodedToken.license_type !== 'Talent') {
          navigate(-1);  // Navigate back to the previous page
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authTokens');
        navigate('/auth/talent/signin');
      }
    } else {
      navigate('/auth/talent/signin');
    }
  }, [navigate]);  // Only depends on `navigate`, runs on mount and route changes
};

export default checkTalentToken;