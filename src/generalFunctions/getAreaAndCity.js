import axios from 'axios';

const getAreaAndCity = async (latitude, longitude) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_GEO_API; // Replace with your API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results && results.length > 0) {
      // Extract area and city from the address components
      let area = null;
      let city = null;

      for (const component of results[0].address_components) {
        if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
          area = component.long_name; // Example: דיזינגוף
        }
        if (component.types.includes('locality')) {
          city = component.long_name; // Example: תל אביב
        }
      }

      if (area && city) {
        return `${area}, ${city}`;
      } else if (city) {
        return city; // Return city alone if area is not found
      } else {
        return 'Area and city not found';
      }
    } else {
      return 'No results found for the given coordinates';
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
    return 'Failed to fetch location data';
  }
};

export default getAreaAndCity;