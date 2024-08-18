import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const checkToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authTokens');
          navigate('/signin');
        }
        // No else block needed: If token is valid, do nothing and let the component render.
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authTokens');
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);  // Only depends on `navigate`, runs on mount and route changes
};

export default checkToken;
