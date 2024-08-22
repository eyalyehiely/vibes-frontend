import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import userThree from "../../../images/user/user-03.png";
import DefaultLayout from "../../../layout/DefaultLayout";
import EditTalentProfile from "./EditTalentProfile";
import getTalentDetails from "../../../functions/talents/getTalentDetails";
import checkTalentToken from "../../../Talents/functions/auth/checkTalentToken";
import { jwtDecode } from "jwt-decode";

const TalentProfile = () => {
  checkTalentToken();

  const [talent, setTalent] = useState({});
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const talent_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getTalentDetails(token, setTalent, talent_id);
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
    <DefaultLayout>
      <div className="max-w-270 mx-auto">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
              <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
                <h3 className="font-medium text-black dark:text-white">
                  Talent Information
                </h3>
              </div>
              <div className="p-7">
                {talent.first_name ? (
                  <form action="#">
                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      {/* first name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="firstName"
                        >
                          First Name: {talent.first_name}
                        </label>
                      </div>

                      {/* last name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="lastName"
                        >
                          Last Name: {talent.last_name}
                        </label>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="gender"
                        >
                          Gender: {talent.gender}
                        </label>
                      </div>

                      {/* phone number */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number: {talent.phone_number}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      {/* email */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Email Address: {talent.email}
                        </label>
                      </div>

                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="residence"
                        >
                          Residence:{" "}
                          {typeof talent.residence === "string"
                            ? talent.residence
                            : JSON.stringify(talent.residence)}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      {/* job type */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="jobType"
                        >
                          Job Type: {talent.job_type}
                        </label>
                      </div>

                      {/* job sitting */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="jobSitting"
                        >
                          Job Sitting: {talent.job_sitting}
                        </label>
                      </div>
                    </div>

                    {/* Fields of Interest */}
                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="FieldsOfInterest"
                        >
                          Fields of Interest:
                        </label>
                        {renderArrayField(talent.field_of_interest)}
                      </div>

                      {/* social_links */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="socialLinks"
                        >
                          Social Links:{" "}
                          {typeof talent.social_links === "string"
                            ? talent.social_links
                            : JSON.stringify(talent.social_links)}
                        </label>
                      </div>
                    </div>
                    <br />

                    {/* skills */}
                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="skills"
                        >
                          Skills:
                        </label>
                        {renderArrayField(talent.skills)}
                      </div>

                      {/* languages */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="languages"
                        >
                          Languages:
                        </label>
                        {renderArrayField(talent.languages)}
                      </div>
                    </div>

                    <div className="mb-5.5 gap-5.5 flex flex-col sm:flex-row">
                      {/* Work History */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="workHistory"
                        >
                          Work History:
                        </label>
                        {renderArrayField(talent.work_history)}
                      </div>

                      {/* Company Black List */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="CompanyBlackList"
                        >
                          Companies Black List:
                        </label>
                        {renderArrayField(talent.companies_black_list)}
                      </div>
                    </div>

                    {/* about me */}
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="aboutMe"
                      >
                        About Me: {talent.about_me}
                      </label>
                    </div>

                    {/* is open to work */}
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="isOpenToWork"
                      >
                        Open to Work: {talent.is_open_to_work ? "Yes" : "No"}
                      </label>
                    </div>

                    <div className="gap-4.5 flex justify-end">
                      <EditTalentProfile />
                    </div>
                    <button
                      className="bg-danger text-gray flex justify-center rounded px-6 py-2 font-medium hover:bg-opacity-90"
                      type="submit"
                      onClick={() => console.log("Delete Letter")}
                    >
                      Delete User
                    </button>
                  </form>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>

          {/* Docs */}

          {/* profile pic */}
          <div className="col-span-5 xl:col-span-2">
            <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
              {/* CV */}
              <div className="col-span-5 xl:col-span-2">
                <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
                  <div className="p-7">
                    <form action="#">
                      <div
                        id="FileUpload"
                        className="mb-5.5 border-primary bg-gray dark:bg-meta-4 sm:py-7.5 relative block w-full cursor-pointer appearance-none rounded border border-dashed px-4 py-4"
                      >
                        <span
                          type="file"
                          accept="application/pdf"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={(e) => console.log(e.target.files[0])} // handle file upload here
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="border-stroke dark:border-strokedark dark:bg-boxdark flex h-10 w-10 items-center justify-center rounded-full border bg-white">
                            {/* SVG for file upload icon */}
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1.5">PDF files only</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>

                      <div className="gap-4.5 flex justify-end">
                        <button
                          className="bg-primary text-gray flex justify-center rounded px-6 py-2 font-medium hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Save CV")}
                        >
                          Save
                        </button>

                        <button
                          className="bg-danger text-gray flex justify-center rounded px-6 py-2 font-medium hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Delete CV")}
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <br />
                {/* recommendation letter */}
                <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
                  <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
                    <h3 className="font-medium text-black dark:text-white">
                      Your Recommendation Letter
                    </h3>
                  </div>
                  <div className="p-7">
                    <form action="#">
                      <div
                        id="FileUpload"
                        className="mb-5.5 border-primary bg-gray dark:bg-meta-4 sm:py-7.5 relative block w-full cursor-pointer appearance-none rounded border border-dashed px-4 py-4"
                      >
                        <span
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={(e) => console.log(e.target.files[0])} // handle file upload here
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="border-stroke dark:border-strokedark dark:bg-boxdark flex h-10 w-10 items-center justify-center rounded-full border bg-white">
                            {/* SVG for file upload icon */}
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>

                      <div className="gap-4.5 flex justify-end">
                        <button
                          className="bg-primary text-gray flex justify-center rounded px-6 py-2 font-medium hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Save Letter")}
                        >
                          Save
                        </button>

                        <button
                          className="bg-danger text-gray flex justify-center rounded px-6 py-2 font-medium hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Delete Letter")}
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default TalentProfile;
