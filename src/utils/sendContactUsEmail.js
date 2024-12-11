import toast from "react-hot-toast";
import axios from "./config/axiosConfig";

export default function sendContactUsEmail(formData, token) {
  return axios.post(`/authenticate/contact-us/`,
      {
        contactMessage: formData.message, // Map to backend expected field
        contactSubject: formData.subject, // Map to backend expected field
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        toast.success("נהיה בקשר 😉!");
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reload after 2 seconds to let the user see the success message
      } else {
        const errorMessage =
          response.data.error || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    })
    .catch((error) => {
      const errorDetails =
        error.response?.data?.detail || "An unexpected error occurred";
      toast.error(errorDetails);
    });
}