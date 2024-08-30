import React, { useState, useEffect } from 'react';
import getRecruitersPerCompany from '../functions/crud/getRecruitersPerCompany';
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import{jwtDecode} from "jwt-decode";

function RecruitersTable() {
  checkCompanyToken();

  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = token ? jwtDecode(token) : null;
  const company_id = decodedToken ? decodedToken.user_id : null;

  useEffect(() => {
    if (token && company_id) {
      getRecruitersPerCompany(token, setRecruiters, company_id)
        .finally(() => setLoading(false));  // Stop loading after request completes
    } else {
      setLoading(false);  // Stop loading if no valid company_id
      console.error('Company ID is missing or invalid.');
    }
  }, [token, company_id]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1170px]">
        {/* table header start */}
        <div className="grid grid-cols-12 rounded-t-[10px] bg-primary px-5 py-4 lg:px-7.5 2xl:px-11">
          <div className="col-span-1">
            <h5 className="font-medium text-white">Number</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium text-white">Name</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium text-white">Position</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium text-white">Email</h5>
          </div>
          <div className="col-span-1">
            <h5 className="font-medium text-white">Role</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-right font-medium text-white">Edit</h5>
          </div>
        </div>
        {/* table header end */}

        {/* table body start */}
        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {recruiters.length > 0 ? (
            recruiters.map((recruiter, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
              >
                <div className="col-span-1">
                  <p className="text-[#637381] dark:text-bodydark">{index + 1}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-[#637381] dark:text-bodydark">
                    {recruiter.first_name} {recruiter.last_name}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-[#637381] dark:text-bodydark">
                    {recruiter.position}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-[#637381] dark:text-bodydark">
                    {recruiter.email}
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="text-[#637381] dark:text-bodydark">
                    {recruiter.license_type}
                  </p>
                </div>
                <div className="relative col-span-1">
                  <DropdownFour
                    classes={
                      index < 2
                        ? 'top-full mt-1'
                        : index >= recruiters.length - 2
                        ? 'bottom-full mb-1'
                        : ''
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-[#637381] dark:text-bodydark">
              No data was found.
            </div>
          )}
        </div>
        {/* table body end */}
      </div>
    </div>
  );
}

export default RecruitersTable;