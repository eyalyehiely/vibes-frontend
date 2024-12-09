import axios from "../generalFunctions/config/axiosConfig";
import swal from "sweetalert";

export default function sendContactUsEmail(formData, token) {
  return axios
    .post(`/authenticate/contact-us/`, {
      contactMessage: formData.message, // Map to backend expected field
      contactSubject: formData.subject, // Map to backend expected field
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        swal({
          title: "נהיה בקשר 😉!",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          window.location.reload();
        });
      } else {
        const errorMessage = response.data.error || "An unexpected error occurred";
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
          button: "OK",
        });
      }
    })
    .catch((error) => {
      const errorDetails = error.response ? error.response.data : error.message;
      swal({
        title: "Error",
        text: errorDetails.detail || "An unexpected error occurred",
        icon: "error",
        button: "OK",
      });
    });
}