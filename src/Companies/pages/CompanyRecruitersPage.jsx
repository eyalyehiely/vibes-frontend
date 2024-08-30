import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
// import TableFive from "../../components/Tables/TableFive";
import RecruitersTable from "../components/RecruitersTable";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import AddRecruiter from "../components/AddRecruiter";

function RecruitersPage() {
  checkCompanyToken()
  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Recruiters" />

      <div className="flex flex-col gap-10">
        {/* <TableFive /> */}
        <AddRecruiter/>
        <RecruitersTable />
      </div>
    </CompanyDefaultLayout>
  );
}

export default RecruitersPage;
