import React from "react";
import { useParams } from "react-router-dom";
import RecruiterSearchTalents from "../components/Jobs/RecruiterSearchTalents"; 
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";


function RecruiterTalentsPage() {
  checkRecruiterToken();
  const { job_id } = useParams(); 

  return (
    <RecruiterDefaultLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Talents for Job ID: {job_id} </h2>
      <RecruiterSearchTalents job_id={job_id} />
    </div>
    </RecruiterDefaultLayout>
  );
}

export default RecruiterTalentsPage;