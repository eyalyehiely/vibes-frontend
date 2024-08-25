import axios from 'axios';

export default async function getResidence(setResidenceResults) {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all/');
    const countryNames = response.data.map(country => country.name.official);
    setResidenceResults(countryNames);
  } catch (error) {
    console.error('Error fetching residence data:', error);
    setResidenceResults([]); // Set empty array or handle error state as needed
  }
}