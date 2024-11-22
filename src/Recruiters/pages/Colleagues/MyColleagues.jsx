import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
// import TableFive from "../../components/Tables/TableFive";
import RecruitersTable from "./ColleaguesTable";
import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";

function MyColleagues() {
  checkRecruiterToken();
  return (
    <RecruiterDefaultLayout>
      <Breadcrumb pageName="Colleagues" />

      <div className="flex-row gap-10">
        {/* <TableFive /> */}
        <br />
        <RecruitersTable />
      </div>
    </RecruiterDefaultLayout>
  );
}

export default MyColleagues;
