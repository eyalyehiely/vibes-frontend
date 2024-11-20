import React, { useState, useEffect, useRef } from "react";
// import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import EditRecruiterProfile from "./EditRecruiterProfile";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import { jwtDecode } from "jwt-decode";
import deleteRecruiter from "../functions/crud/deleteRecruiter";
import getCompanyDetails from "../../Companies/functions/crud/company/getCompanyDetails";

import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCalendly } from "react-icons/si";
import RecruiterPicHandling from "./RecruiterPicHandling";

const RecruiterProfile = () => {
  checkRecruiterToken();
  const [recruiter, setRecruiter] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
 

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const recruiter_id = decodedToken.user_id;
  const company_id = decodedToken.company_id;

  useEffect(() => {
    if (token) {
      getRecruiterDetails(token, setRecruiter, recruiter_id).finally(() =>
        setLoading(false)
      );
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token]);

  

  const handleDelete = () => {
    deleteRecruiter(token, setRecruiter, recruiter_id);
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  const getSocialMediaIcon = (platform) => {
    const icons = {
      facebook: <FaFacebookSquare color="#1877F2" />,
      instagram: <FaInstagram color="#E4405F" />,
      linkedin: <FaLinkedin color="#0077B5" />,
      github: <FaGithubSquare color="#333" />,
      x: <FaXTwitter color="#000000" />,
      calendly: <SiCalendly color="#6638B6" />,
    };

    return icons[platform] || null; // Return null if no icon is found
  };

  return (
    // <RecruiterDefaultLayout>
    <div className="mx-auto max-w-270 px-4 sm:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {/* Recruiter Information */}
        <div className="col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                {recruiter?.first_name
                  ? `${recruiter.first_name} Information`
                  : "Recruiter Information"}
                <EditRecruiterProfile
                  setRecruiter={setRecruiter}
                  recruiter={recruiter}
                />
              </h3>
            </div>
            <div className="p-7">
              {recruiter.first_name ? (
                <div className="flex flex-col space-y-4">
                  {/* Name and Gender */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        First Name: {recruiter.first_name}
                      </label>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Last Name: {recruiter.last_name}
                      </label>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Gender: {recruiter.gender}
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone Number: {recruiter.phone_number}
                      </label>
                    </div>
                  </div>

                  {/* Email, Division, and Company */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Email Address: {recruiter.email}
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Division:{" "}
                        {Array.isArray(recruiter.division)
                          ? recruiter.division.join(", ")
                          : recruiter.division}
                      </label>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Company: {company.name}
                      </label>
                    </div>
                    <div className="w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Position: {recruiter.position}
                      </label>
                    </div>
                  </div>

                  {/* social links */}
                  <div className="w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="socialLinks"
                    >
                      Social Links:
                      <br />
                      {recruiter.social_links &&
                      Object.keys(recruiter.social_links).length > 0 ? (
                        Object.keys(recruiter.social_links).map(
                          (platform, index) => {
                            const link = recruiter.social_links[platform];
                            const icon = getSocialMediaIcon(platform); // Get the appropriate icon
                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                {icon && (
                                  <span className="text-gray-700 text-xl dark:text-white">
                                    {icon}
                                  </span>
                                )}
                                <a
                                  href={
                                    link.startsWith("http://") ||
                                    link.startsWith("https://")
                                      ? link
                                      : `http://${link}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  {link}
                                </a>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <span>No social links provided</span>
                      )}
                    </label>
                  </div>

                  {/* is sign to newsletter */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="isOpenToWork"
                    >
                      Sign to newsletter ? :{" "}
                      {recruiter.newsletter ? "Yes" : "No"}
                    </label>
                  </div>

                  {/* working time */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Working Time:
                      </label>
                      {recruiter.working_time ? (
                        <div className="overflow-x-auto">
                          <table className="dark:bg-gray-800 w-full border-collapse rounded-lg border border-purple-300 bg-white">
                            <thead>
                              <tr className="bg-purple-100 text-left text-sm font-medium text-purple-700 dark:bg-purple-800 dark:text-purple-200">
                                <th className="border border-purple-300 px-4 py-2">
                                  Day
                                </th>
                                <th className="border border-purple-300 px-4 py-2">
                                  Status
                                </th>
                                <th className="border border-purple-300 px-4 py-2">
                                  Working Hours
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(recruiter.working_time).map(
                                (day, index) => (
                                  <tr
                                    key={index}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-purple-50"
                                        : "dark:bg-gray-700 bg-white"
                                    }`}
                                  >
                                    <td className="border border-purple-300 px-4 py-2 font-medium text-black dark:text-white">
                                      {day}
                                    </td>
                                    <td className="text-gray-600 dark:text-gray-300 border border-purple-300 px-4 py-2">
                                      {recruiter.working_time[day].selected
                                        ? "Working"
                                        : "Not Working"}
                                    </td>
                                    <td className="text-gray-600 dark:text-gray-300 border border-purple-300 px-4 py-2">
                                      {recruiter.working_time[day].selected
                                        ? `${
                                            recruiter.working_time[day].start ||
                                            "N/A"
                                          } - ${
                                            recruiter.working_time[day].end ||
                                            "N/A"
                                          }`
                                        : "N/A"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          No working time available
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    onClick={handleDelete}
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

        <RecruiterPicHandling />
      </div>
    </div>
    // </RecruiterDefaultLayout>
  );
};

export default RecruiterProfile;
