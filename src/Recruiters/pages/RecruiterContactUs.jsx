import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import sendContactUsEmail from "../../generalFunctions/sendContactUsEmail";
import { jwtDecode } from "jwt-decode";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import swal from "sweetalert";

const RecruiterContactUs = () => {
  checkRecruiterToken();

  const [recruiter, setRecruiter] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  const decodedToken = jwtDecode(token);
  const Recruiter_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getRecruiterDetails(token, setRecruiter, Recruiter_id);
    }
  }, [token]);

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: recruiter.first_name || "",
      lastName: recruiter.last_name || "",
      email: recruiter.email || "",
    });
  }, [recruiter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled before submitting
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      swal("All fields are required!");
      return;
    }

    sendContactUsEmail(formData, token)
      .then((response) => {
        console.log("Email sent successfully:", response);
        swal("Your message has been sent successfully!");
        setFormData({
          firstName: recruiter.first_name || "",
          lastName: recruiter.last_name || "",
          email: recruiter.email || "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        swal("There was an error sending your message. Please try again.");
      });
  };

  return (
    <RecruiterDefaultLayout>
      <Breadcrumb pageName="Contact Us" />

      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col gap-9">
          {/* Contact Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* First Name */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4.5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-4.5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subject <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    rows={10}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-purple-500 p-3 font-medium text-white hover:bg-purple-600"
                >
                  Send Us Message !
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
};

export default RecruiterContactUs;
