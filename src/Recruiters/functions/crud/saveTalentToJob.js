import axios from "../../../generalFunctions/config/axiosConfig";
import swal from "sweetalert";

const saveTalentToJob = async (jobId, firstName, lastName, talentId, talentForm, talentCv, token)=> {
  try {
    const response = await axios.post(`/users/company/job/${jobId}/`,
    { talent_id: talentId,
      first_name: firstName,
      last_name: lastName,
      match_by_cv: talentCv,
      match_by_form: talentForm 
    },
  
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    swal({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    console.log("talent_id", talentId);
    return response.data;
  } catch (error) {
    swal({
      title: "Error!",
      text: error.response?.data?.message || "An error occurred.",
      icon: "error",
      timer: 2000,
      buttons: false,
    });
    throw error;
  }
};

export default saveTalentToJob;