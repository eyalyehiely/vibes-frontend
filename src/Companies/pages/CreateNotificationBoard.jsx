import React, { useEffect, useState } from "react";
import CompanyDefaultLayout from "../components/CompanyDefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import getCompanyDetails from "../functions/crud/company/getCompanyDetails";
import { jwtDecode } from "jwt-decode"; // Correct import
import swal from "sweetalert"; // To show feedback on submission
import createNotification from "../functions/crud/company/createNotification";

function CreateNotificationBoard() {

  const [company, setCompany] = useState({});
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const decodedToken = jwtDecode(token);
  const company_id = decodedToken.user_id;

  useEffect(() => {
    if (token && company_id) {
      getCompanyDetails(setCompany, company_id, token);
    }
  }, [token, company_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !recipients || !message || !date) {
      swal("Error", "All fields are required!", "error");
      return;
    }
    {console.log('subject',subject,'recipients',recipients,'message',message,company_id,date)}
    // Call the function to create a notification
    createNotification(token, subject, recipients, message, date, company_id);

    // Show success message
    swal("Success", "Notification created successfully!", "success");

    // Clear form after submission
    setSubject("");
    setRecipients("");
    setDate("");
    setMessage("");
  };

  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Notifications" />
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Subject */}
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your Subject"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* End Date */}
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Until when?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter end date"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              to?
            </label>
          <select
            multiple
            value={recipients}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setRecipients(selectedOptions); // Update recipients state as an array
            }}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="all_recruiters">All recruiters</option>
            {company.divisions?.map((division, index) => (
              <option key={index} value={division}>
                {division}
              </option>
            ))}
          </select>
          </div>

          {/* Message */}
          <div className="mb-6 mt-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Message
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-purple-500 p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Create & Send Notification
          </button>
        </div>
      </form>
    </CompanyDefaultLayout>
  );
}

export default CreateNotificationBoard;
