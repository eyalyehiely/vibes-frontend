import React, { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DropdownDefault from "../../components/Dropdowns/DropdownDefault";
import TaskHeader from "../components/Jobs/JobHeader";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";

import taskOne from "../../images/task/task-01.jpg";
import Drag from "../../js/drag";

function AvailableJobs() {
  useEffect(() => {
    Drag();
  });

  return (
    <CompanyDefaultLayout>
      <div className="mx-auto max-w-5xl">
        {/* <!-- Task Header Start --> */}
        <TaskHeader />
        {/* <!-- Task Header End --> */}

        {/* <!-- Task List Wrapper Start --> */}
        <div className="mt-9 grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
          {/* <!-- Todo list --> */}
          <div className="swim-lane flex flex-col gap-5.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              company available jobs (number)
            </h4>
          </div>
        </div>
        {/* <!-- Task List Wrapper End --> */}
      </div>
    </CompanyDefaultLayout>
  );
}

export default AvailableJobs;
