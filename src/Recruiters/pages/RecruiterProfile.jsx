import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import EditrecruiterProfile from "./EditrecruiterProfile";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import { jwtDecode } from "jwt-decode";
import deleteRecruiter from "../functions/crud/deleteRecruiter";

const RecruiterProfile = () => {
  checkRecruiterToken();

  const [recruiter, setRecruiter] = useState({});
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const recruiter_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getRecruiterDetails(token, setRecruiter, recruiter_id);
    }
  }, [token]);

  // Render complex data like arrays or objects safely
  const renderArrayField = (field) => (
    <ul>
      {field && field.length > 0 ? (
        field.map((item, index) => <li key={index}>{item}</li>)
      ) : (
        <li>No items listed</li>
      )}
    </ul>
  );

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-270" >
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  Recruiter Information
                  <EditrecruiterProfile />
                </h3>
              </div>
              <div className="p-7">
                {recruiter.first_name ? (
                  <div className="flex flex-col space-y-4">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* first name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="firstName"
                        >
                          First Name: {recruiter.first_name}
                        </label>
                      </div>

                      {/* last name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="lastName"
                        >
                          Last Name: {recruiter.last_name}
                        </label>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="gender"
                        >
                          Gender: {recruiter.gender}
                        </label>
                      </div>

                      {/* phone number */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number: {recruiter.phone_number}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* email */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Email Address: {recruiter.email}
                        </label>
                      </div>

                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="division"
                        >
                          Division:{" "}
                          {typeof recruiter.division === "string"
                            ? recruiter.division
                            : JSON.stringify(recruiter.division)}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                     {/* Company */}
                     <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company"
                        >
                          Company: {recruiter.company}
                        </label>
                      </div>

                      {/* Position */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="position"
                        >
                          Position: {recruiter.position}
                        </label>
                      </div>

                     
                    </div>



                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Working Time */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="WorkingTime"
                        >
                          Working Time:
                        </label>
                        {renderArrayField(recruiter.working_time)}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5"></div>
                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={deleteRecruiter(token, setRecruiter, recruiter_id)}
                    >
                      Delete User
                    </button>
                  </div>
                ) : (
                  <p>No data available...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
};
export default RecruiterProfile;
