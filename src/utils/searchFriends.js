import axios from "./config/axiosConfig";

export default async function searchFriends(token, setToggleStatus, setIsToggling) {
  try {
    const response = await axios.post(
      'authenticate/search-friends',
      { search_friend: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setToggleStatus(true); // Update UI to reflect the toggle
      setTimeout(() => setToggleStatus(false), 3600 * 1000); // Reset after 1 hour
    } else {
      alert('Failed to activate search friend.');
    }
  } catch (error) {
    console.error('Error toggling search friend:', error);
    alert('Something went wrong. Please try again later.');
  } finally {
    setIsToggling(false);
  }
}