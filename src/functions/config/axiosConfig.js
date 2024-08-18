import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_API_BASE_URL || 'http://localhost:8000/api/v1/',
  // other axios options if needed
});

export default instance;