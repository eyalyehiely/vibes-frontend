import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import getRecruitersPerCompany from "../../functions/crud/recruiter/getRecruitersPerCompany";
import checkCompanyToken from "../../functions/auth/checkCompanyToken";
import { jwtDecode } from "jwt-decode";
import EditRecruiterProfile from "../../../Recruiters/pages/EditRecruiterProfile";
import deleteRecruiter from "../../../Recruiters/functions/crud/deleteRecruiter";
import saveEditRecruiter from "../../functions/crud/recruiter/saveEditRecruiter";
import getCompanyDetails from "../../functions/crud/company/getCompanyDetails";

function RecruitersTable() {
  checkCompanyToken();
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [editingRecruiterId, setEditingRecruiterId] = useState(null);
  const [editedRecruiter, setEditedRecruiter] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState({ divisions: [] });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;
  const company_name = decodedToken.first_name

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

  useEffect(() => {
    console.log(company); // Check if divisions are being set properly
  }, [company]);

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

  // Handle editing
  const startEdit = (recruiter) => {
    setEditingRecruiterId(recruiter.id);
    setEditedRecruiter({ ...recruiter });
  };

  const handleEditClick = (recruiter) => {
    setCurrentRecruiter(recruiter);
    setShowEditModal(true); // Show modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Hide modal
    setCurrentRecruiter(null); // Reset current recruiter
  };

  const cancelEdit = () => {
    setEditingRecruiterId(null);
    setEditedRecruiter({});
  };

  const saveChanges = () => {
    saveEditRecruiter(
      token,
      editedRecruiter,
      editingRecruiterId,
      (updatedRecruiter) => {
        const updatedRecruiters = recruiters.map((recruiter) =>
          recruiter.id === editingRecruiterId ? updatedRecruiter : recruiter
        );
        setRecruiters(updatedRecruiters);
      }
    );
    setEditingRecruiterId(null);
    setEditedRecruiter({});
  };

  const handleEditChange = (event, field) => {
    setEditedRecruiter({
      ...editedRecruiter,
      [field]: event.target.value,
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
        icon: "warning", // Changed 'danger' to 'warning', as 'danger' is not a valid Swal icon
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
              placeholder="Search recruiters..."
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
          <div className="col-span-1">
            <h5 className="text-right font-medium text-white">Actions</h5>
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
                <div className="col-span-1 text-right">
                  {editingRecruiterId === recruiter.id ? (
                    <>
                      <button
                        className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                        onClick={saveChanges}
                      >
                        <span className="sr-only">Save</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="green"
                          className="bi bi-check2-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
                      </button>
                      <button
                        className="square-full text-rose-500 hover:text-rose-600"
                        onClick={cancelEdit}
                      >
                        <span className="sr-only">Cancel</span>
                        <svg
                          className="h-6 w-10 fill-current"
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm7 19a1 1 0 0 1-1.414 1.414L16 17.414l-5.586 5.586A1 1 0 0 1 9 21.586l5.586-5.586L9 10.414A1 1 0 0 1 10.414 9l5.586 5.586 5.586-5.586A1 1 0 0 1 23 10.414l-5.586 5.586Z" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                        onClick={() => startEdit(recruiter)}
                      >
                        <span className="sr-only">Edit</span>
                        <svg
                          className="h-8 w-8 fill-current"
                          viewBox="0 0 32 32"
                        >
                          <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                        </svg>
                      </button>
                      <button
                        className="ml-4 rounded-full text-rose-500 hover:text-rose-600"
                        onClick={() =>
                          deleteRecruiter(token, setRecruiters, recruiter.id)
                        }
                      >
                        <span className="sr-only">Delete</span>
                        <svg
                          className="h-8 w-8 fill-current"
                          viewBox="0 0 32 32"
                        >
                          <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                          <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                        </svg>
                      </button>
                    </>
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

      {/* Conditionally render EditRecruiterProfile based on the state */}
      {showEditModal && (
        <EditRecruiterProfile
          recruiter={currentRecruiter}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default RecruitersTable;
