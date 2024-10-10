import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Correct import

const checkCompanyToken = () => {
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
          navigate('/');  // Redirect to home if the token is expired
        }

        // Check if the user is not a 'Company'
        if (decodedToken.user_type !== 'Company') {
          navigate(-1);  // Navigate back to the previous page
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authTokens');
        navigate('/');  // Redirect to home if the token is invalid
      }
    } else {
      navigate('/');  // Redirect to home if no token is found
    }
  }, [navigate]);  // Runs only once on mount
};

export default checkCompanyToken;