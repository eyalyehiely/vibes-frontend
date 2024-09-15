import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import SearchingsTable from "../components/SearchingsTable";
import TalentDefaultLayout from "../components/TalentDefaultLayout";
import checkTalentToken from "../functions/auth/checkTalentToken";

function MySearchings() {
  checkTalentToken()
  return (
    <TalentDefaultLayout>
      <Breadcrumb pageName="Searchings" />

      <div className="flex-row gap-10">
        {/* <TableFive /> */}
        <br />
        <SearchingsTable />
      </div>
    </TalentDefaultLayout>
  );
}

export default MySearchings;
