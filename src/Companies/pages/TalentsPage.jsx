import React from "react";
import { useParams } from "react-router-dom";
import SearchTalents from "../components/Jobs/SearchTalents"; 
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import checkCompanyToken from "../functions/auth/checkCompanyToken";


function TalentsPage() {
  checkCompanyToken();
  const { job_id } = useParams(); // Retrieve job_id from URL

  return (
    <CompanyDefaultLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Talents for Job ID: {job_id} </h2>
      <SearchTalents job_id={job_id} />
    </div>
    </CompanyDefaultLayout>
  );
}

export default TalentsPage;