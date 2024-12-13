import axios from '../../config/axiosConfig';
import toast from "react-hot-toast";

export async function updateFavorites(token, place,user_id) {
  try {
    const response = await axios.put(`/authenticate/manage-favorites/${user_id}/`,
      { place }, // Data to send (the place to save)
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        },
      }
    );
    toast.success(`${place.name} has been added to your saved places.`,);

    return response.data; 
  } catch (error) {
    toast.error('There was a problem saving this place.',)
    console.error('Error updating user savings:', error);
    throw error;
  }
}