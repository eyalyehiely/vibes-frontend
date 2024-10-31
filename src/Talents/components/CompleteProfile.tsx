// // src/components/CompleteProfile.tsx

// import React, { useState } from 'react';
// import axios from 'axios';

// const CompleteProfile: React.FC = () => {
//   const [formData, setFormData] = useState({
//     gender: '',
//     birth_date: '',
//     phone_number: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/v1/users/complete-profile/', formData, {
//         withCredentials: true, // Include cookies for session-based auth
//       });

//       if (res.data.success) {
//         window.location.href = '/talent/home';
//       } else {
//         alert('Failed to complete profile.');
//       }
//     } catch (error) {
//       console.error('Error completing profile:', error);
//       alert('An error occurred while completing your profile.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Complete Your Profile</h2>
//       <label>
//         Gender:
//         <select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </label>
//       <br />
//       <label>
//         Birth Date:
//         <input
//           type="date"
//           name="birth_date"
//           value={formData.birth_date}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Phone Number:
//         <input
//           type="tel"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default CompleteProfile;


// src/components/CompleteProfile.tsx

import React, { useState } from 'react';
import axios from 'axios';

const CompleteProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    gender: '',
    birth_date: '',
    phone_number: '',
    // Optionally, allow editing of first and last names
    first_name: '',
    last_name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/users/complete-profile/',
        formData,
        {
          withCredentials: true, // Include cookies for session-based auth
        }
      );

      if (res.data.success) {
        window.location.href = '/talent/home';
      } else {
        alert('Failed to complete profile.');
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      alert('An error occurred while completing your profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Complete Your Profile</h2>
      {/* Optionally, include first and last name fields */}
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Birth Date:
        <input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CompleteProfile;