import React, { useState, useEffect } from "react";
import getRecruitersPerCompany from "../../Companies/functions/crud/recruiter/getRecruitersPerCompany";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import {jwtDecode} from "jwt-decode"; // Corrected import
import getCompanyDetails from "../../Companies/functions/crud/company/getCompanyDetails";
import swal from "sweetalert";
import * as XLSX from "xlsx"; // Importing XLSX for Excel export functionality

function ColleaguesTable() {
  checkRecruiterToken();
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState({ divisions: [] });
  const [editingRecruiterId, setEditingRecruiterId] = useState(null); // Manage edit state
  const [editedRecruiter, setEditedRecruiter] = useState({});

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.company_id;
  const company_name = decodedToken.name; // Assuming this is the company name from token

  useEffect(() => {
    if (token && company_id) {
      getCompanyDetails(setCompany, company_id, token).finally(() =>
        setLoading(false)
      );
      getRecruitersPerCompany(token, setRecruiters, company_id);
    } else {
      setLoading(false);
      console.error("Company ID is missing or invalid.");
    }
  }, [token, company_id]);

  // Filter recruiters based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredRecruiters(
        recruiters.filter(
          (recruiter) =>
            recruiter.first_name.toLowerCase().includes(query) ||
            recruiter.last_name.toLowerCase().includes(query) ||
            recruiter.username.toLowerCase().includes(query) ||
            recruiter.position.toLowerCase().includes(query) ||
            recruiter.division.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredRecruiters(recruiters);
    }
  }, [searchQuery, recruiters]);

  const handleEditChange = (e, field) => {
    setEditedRecruiter({
      ...editedRecruiter,
      [field]: e.target.value,
    });
  };

  const exportToExcel = () => {
    if (filteredRecruiters.length > 0) {
      const dataToExport = filteredRecruiters.map((recruiter, index) => ({
        Number: index + 1,
        Name: `${recruiter.first_name} ${recruiter.last_name}`,
        username: recruiter.username,
        Division: recruiter.division,
        Position: recruiter.position,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Recruiters");
      XLSX.writeFile(workbook, `${company_name}-recruiters.xlsx`);
    } else {
      swal({
        title: "No Recruiters to export",
        icon: "warning", // Use valid Swal icon
        timer: 1000,
        button: false,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1170px]">
        <div className="w-full overflow-x-auto">
          <div className="col-span-12 mb-4">
            <input
              type="text"
              placeholder="Search colleagues..."
              className="form-control w-1/2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportToExcel}
              className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              Export to Excel
            </button>
          </div>
        </div>
        <br />
        <hr />
        <div className="grid grid-cols-12 rounded-t-[10px] bg-purple-500 px-5 py-4 lg:px-7.5 2xl:px-11">
          {" "}
          <div className="col-span-1">
            <h5 className="font-medium text-white">Number</h5>
          </div>
          <div className="col-span-2">
            <h5 className="font-medium text-white">Name</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium text-white">Username</h5>
          </div>
          <div className="col-span-2">
            <h5 className="font-medium text-white">Division</h5>
          </div>
          <div className="col-span-2">
            <h5 className="font-medium text-white">Position</h5>
          </div>
        </div>

        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {filteredRecruiters.length > 0 ? (
            filteredRecruiters.map((recruiter, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
              >
                <div className="col-span-1">
                  <p className="text-[#637381] dark:text-bodydark">
                    {index + 1}
                  </p>
                </div>
                <div className="col-span-2">
                  {editingRecruiterId === recruiter.id ? (
                    <input
                      type="text"
                      id="first_name"
                      className="text-right"
                      value={editedRecruiter.first_name || ""}
                      onChange={(e) => handleEditChange(e, "first_name")}
                    />
                  ) : (
                    <p className="text-[#637381] dark:text-bodydark">
                      {recruiter.first_name} {recruiter.last_name}
                    </p>
                  )}
                </div>
                <div className="col-span-3">
                  {editingRecruiterId === recruiter.id ? (
                    <input
                      type="text"
                      id="username"
                      className="text-right"
                      value={editedRecruiter.username || ""}
                      onChange={(e) => handleEditChange(e, "username")}
                    />
                  ) : (
                    <p className="text-[#637381] dark:text-bodydark">
                      {recruiter.username}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  {editingRecruiterId === recruiter.id ? (
                    <select
                      id="division"
                      className="text-right"
                      value={editedRecruiter.division || ""}
                      onChange={(e) => handleEditChange(e, "division")}
                    >
                      <option value="">Select Division</option>
                      {company.divisions?.map((division, index) => (
                        <option key={index} value={division}>
                          {division}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-[#637381] dark:text-bodydark">
                      {recruiter.division}
                    </p>
                  )}
                </div>
                <div className="col-span-2 text-left">
                  {editingRecruiterId === recruiter.id ? (
                    <input
                      type="text"
                      id="position"
                      className="text-right"
                      value={editedRecruiter.position || ""}
                      onChange={(e) => handleEditChange(e, "position")}
                    />
                  ) : (
                    <p className="text-[#637381] dark:text-bodydark">
                      {recruiter.position}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-[#637381] dark:text-bodydark">
              No data was found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColleaguesTable;