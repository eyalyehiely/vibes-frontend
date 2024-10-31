// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';
// import './css/style.css';
// import './css/satoshi.css';
// import './css/simple-datatables.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
// import 'flatpickr/dist/flatpickr.min.css';
// import 'nouislider/dist/nouislider.css';
// import 'dropzone/dist/dropzone.css';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import './css/simple-datatables.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'nouislider/dist/nouislider.css';
import 'dropzone/dist/dropzone.css';

// Access the environment variable correctly
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Optionally, add a fallback or error handling
if (!GOOGLE_CLIENT_ID) {
  console.error('Google Client ID is not defined. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <App />
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);