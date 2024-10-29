// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import SearchTalents from "../components/Jobs/SearchTalents"; 
// import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
// import checkCompanyToken from "../functions/auth/checkCompanyToken";
// import getJobDetails from "../functions/crud/job/getJobDetails"




// function CompanyTalentsPage() {
//   checkCompanyToken();
//   const token = localStorage.getItem("authTokens")
//     ? JSON.parse(localStorage.getItem("authTokens")).access
//     : null;
//   const { job_id } = useParams(); // Retrieve job_id from URL

//   useEffect(() => {
//     if (token && job_id) {
//       getJobDetails(job_id, token)
//     }
//   }, [token, job_id]); 
//   return (
//     <CompanyDefaultLayout>
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Talents for Job ID: {job_id}{job.company} </h2>
//       <SearchTalents job_id={job_id} />
//     </div>
//     </CompanyDefaultLayout>
//   );
// }

// export default CompanyTalentsPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchTalents from "../components/Jobs/SearchTalents";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import getJobDetails from "../functions/crud/job/getJobDetails";

function CompanyTalentsPage() {
  checkCompanyToken();
  
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const { job_id } = useParams(); // Retrieve job_id from URL

  const [job, setJob] = useState(null); // State to store job details

  useEffect(() => {
    if (token && job_id) {
      // Fetch job details and store them in state
      getJobDetails(job_id, token)
        .then((data) => {
          setJob(data); // Assuming getJobDetails returns job details
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    }
  }, [token, job_id]);

  return (
    <CompanyDefaultLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Talents for Job ID: {job_id}
          {job && job.company ? ` - ${job.title}` : ""}
        </h2>
        <SearchTalents job_id={job_id} />
      </div>
    </CompanyDefaultLayout>
  );
}

export default CompanyTalentsPage;