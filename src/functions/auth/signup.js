import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import swal from 'sweetalert';
import NotificationError from '../../components/Notifications/NotificationError'

export default function Signup({ formData }) {
  const navigate = useNavigate();

  axios.post('/auth/signup/', formData)
    .then((response) => {
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      console.log(response.data);
      swal({
        title: "👤 משתמש נוסף בהצלחה",
        icon: "success",
        timer: 1000,
        button: false,
      }).then(() => {
        navigate('/');
      });
    })
    .catch((error) => {
      console.error(error);
    //   <NotificationError/>
    });
}