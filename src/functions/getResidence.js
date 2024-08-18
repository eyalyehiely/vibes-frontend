import axios from 'axios';

export default async function getAddress(setAddressResults) {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all/');
    setAddressResults(response.data.result.name.official);
  } catch (error) {
    console.error('Error fetching address data:', error);
    setAddressResults([]); // Set empty array or handle error state as needed
  }
}
