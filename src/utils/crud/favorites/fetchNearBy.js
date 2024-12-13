import axios from '../../../utils/config/axiosConfig';  // Import the configured Axios instance

// Function to fetch nearby places based on category and user location
export const fetchNearBy = async (latitude, longitude, category, token,radius) => {
  try {
    const response = await axios.get(`/authenticate/get-nearby-places/`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`  // Include the Bearer token in the headers
      },
      params: {
        latitude,
        longitude,
        radius: radius,  
        category,  // Send the selected category
      },
    });

    return response.data.places;  // Return the places data from the response
  } catch (error) {
    console.error('API Error:', error);
    throw error;  // Re-throw the error so it can be caught in the component
  }
};