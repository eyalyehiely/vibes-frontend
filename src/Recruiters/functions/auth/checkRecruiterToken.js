import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const checkRecruiterToken = () => {
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
          navigate('/');
        }

        // Check if the license type is not 'Talent'
        if (decodedToken.user_type !== 'Recruiter') {
          navigate(-1);  // Navigate back to the previous page
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authTokens');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);  // Only depends on `navigate`, runs on mount and route changes
};

export default checkRecruiterToken;