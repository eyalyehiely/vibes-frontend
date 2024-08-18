import axios from 'axios';

export default async function getLanguages(setLanguagesResult) {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all/');
    const countries = response.data;

    // Extract and flatten languages
    const languages = countries.reduce((acc, country) => {
      if (country.languages) {
        acc.push(...Object.values(country.languages));
      }
      return acc;
    }, []);

    // Remove duplicates by converting to a Set and back to an array
    const uniqueLanguages = [...new Set(languages)];

    setLanguagesResult(uniqueLanguages);
  } catch (error) {
    console.error('Error fetching languages data:', error);
    setLanguagesResult([]); // Set empty array or handle error state as needed
  }
}