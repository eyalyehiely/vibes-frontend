import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
// import TableFive from "../../components/Tables/TableFive";
import RecruitersTable from "../components/Recruiters/RecruitersTable";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import AddRecruiter from "../components/Recruiters/AddRecruiter";

function CompanyRecruitersPage() {
  checkCompanyToken()
  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Recruiters" />

      <div className="flex-row gap-10">
        {/* <TableFive /> */}
        <AddRecruiter/>
        <br />
        <RecruitersTable />
      </div>
    </CompanyDefaultLayout>
  );
}

export default CompanyRecruitersPage;
