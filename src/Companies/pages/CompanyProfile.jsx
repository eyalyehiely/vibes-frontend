import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import EditCompanyProfile from "./EditCompanyProfile";
import getCompanyDetails from "../functions/crud/getCompanyDetails";
import checkCompanyToken from "../functions/auth/checkCompanyToken";
import {jwtDecode} from "jwt-decode";
import deleteCompany from "../functions/crud/deleteCompany";

const CompanyProfile = () => {
  checkCompanyToken();

  const [company, setCompany] = useState({});
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token]);

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
    <CompanyDefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  Company Information
                  <EditCompanyProfile />
                </h3>
              </div>
              <div className="p-7">
                {company.name ? (
                  <div className="flex flex-col space-y-4">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Name"
                        >
                          Company Name: {company.name}
                        </label>
                      </div>

                      {/* Phone number */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number: {company.phone_number}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Email */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Admin Address: {company.email}
                        </label>
                      </div>

                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="licenseType"
                        >
                          License Type: {company.license_type}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Website */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="website"
                        >
                          Website:
                          {company.website ? (
                            <a
                              href={
                                company.website.startsWith("http")
                                  ? company.website
                                  : `http://${company.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {" "}
                              {company.website}
                            </a>
                          ) : (
                            " No website available"
                          )}
                        </label>
                      </div>
                      {/* Address */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="address"
                        >
                          Address:{" "}
                          {typeof company.address === "string"
                            ? company.address
                            : "N/A"}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Divisions */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="divisions"
                        >
                          Divisions:{" "}
                          {renderArrayField(company.divisions)}
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5"></div>
                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={() =>
                        deleteCompany(token, setCompany, company_id)
                      }
                    >
                      Delete User
                    </button>
                  </div>
                ) : (
                  <p> No data was found...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompanyDefaultLayout>
  );
};

export default CompanyProfile;