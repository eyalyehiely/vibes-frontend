import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
// import TableFive from "../../components/Tables/TableFive";
import RecruitersTable from "../components/Recruiters/RecruitersTable";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import AddRecruiter from "../components/Recruiters/AddRecruiter";

function CompanyRecruitersPage() {
  checkCompanyToken()
  const [recruiters, setRecruiters] = useState([]);
  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Recruiters" />

      <div className="flex-row gap-10">
        {/* <TableFive /> */}
        <AddRecruiter setRecruiters={setRecruiters} />
        <br />
        <RecruitersTable recruiters={recruiters} setRecruiters={setRecruiters} />
      </div>
    </CompanyDefaultLayout>
  );
  
}

export default CompanyRecruitersPage;
