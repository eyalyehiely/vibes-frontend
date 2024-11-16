import axios from 'axios';
import swal from 'sweetalert';


export default async function fetchTalentsForJob(job_id, setTalents, token) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_HUNTER_API_URL}/${job_id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        setTalents(response.data.relevant_talents);
        console.log(response.data.relevant_talents);
    } catch (err) {
        // Clear talents in case of error
        setTalents([]);

        // Display error message
        swal({
            title: err.response?.data?.message || 'An error occurred while fetching talents.',
            icon: 'info',
            button: 'OK',
        });

        console.error('Error fetching talents:', err);
    }
}