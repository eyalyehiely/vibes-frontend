import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
// import TableFive from "../../components/Tables/TableFive";
import RecruitersTable from "./ColleaguesTable";
import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";

function MyColleagues() {
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
