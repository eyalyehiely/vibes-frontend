import React, { useState, useEffect, useRef } from "react";
import TalentDefaultLayout from "../components/TalentDefaultLayout";
import EditTalentProfile from "./EditTalentProfile";
import getTalentDetails from "../functions/crud/getTalentDetails";
import checkTalentToken from "../functions/auth/checkTalentToken";
import { jwtDecode } from "jwt-decode";
import saveCv from "../functions/crud/files/cv/saveCv";
import saveRecommendationLetter from "../functions/crud/files/recommendation_file/saveRecommendationLetter";
import deleteCv from "../functions/crud/files/cv/deleteCv";
import deleteRecommendationLetter from "../functions/crud/files/recommendation_file/deleteRecommendationLetter";
import deleteTalent from "../functions/crud/deleteTalent";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const TalentProfile = () => {
  checkTalentToken();

  const navigate = useNavigate();
  const [talent, setTalent] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [recommendationLetter, setRecommendationLetter] = useState(null);

  const cvInputRef = useRef(null);
  const recommendationLetterInputRef = useRef(null);

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

  useEffect(() => {
    if (talent.cv) {
      setCvFile({
        file: { name: talent.cv.split("/").pop() },
        preview: `/assets/users/${talent.email}/cvs/${talent.cv
          .split("/")
          .pop()}`,
      });
    }
    if (talent.recommendation_letter) {
      setRecommendationLetter({
        file: { name: talent.recommendation_letter.split("/").pop() },
        preview: `/assets/users/${
          talent.email
        }/recommendation_letters/${talent.recommendation_letter
          .split("/")
          .pop()}`,
      });
    }
  }, [talent]);

  const renderArrayField = (field) => (
    <ul>
      {field && field.length > 0 ? (
        field.map((item, index) => <li key={index}>{item}</li>)
      ) : (
        <li>No items listed</li>
      )}
    </ul>
  );

  useEffect(() => {
    if (token) {
      getTalentDetails(token, setTalent, talent_id);
    }
  }, [token]);

  useEffect(() => {
    if (talent.cv) {
      setCvFile({
        file: { name: talent.cv.split("/").pop() },
        preview: `/assets/users/${talent.email}/cvs/${talent.cv
          .split("/")
          .pop()}`,
      });
    }
    if (talent.recommendation_letter) {
      setRecommendationLetter({
        file: { name: talent.recommendation_letter.split("/").pop() },
        preview: `/assets/users/${
          talent.email
        }/recommendation_letters/${talent.recommendation_letter
          .split("/")
          .pop()}`,
      });
    }
  }, [talent]);

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleRecommendationLetterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecommendationLetter({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const triggerCvUpload = () => cvInputRef.current.click();
  const triggerRecommendationLetterUpload = () =>
    recommendationLetterInputRef.current.click();

  const handleSaveCv = () => saveCv(cvFile, token, talent_id, setTalent);
  const handleSaveRecommendationLetter = () =>
    saveRecommendationLetter(recommendationLetter, token, talent_id, setTalent);
  const handleDeleteCv = () => deleteCv(setCvFile, token, talent_id, setTalent);
  const handleDeleteRecommendationLetter = () =>
    deleteRecommendationLetter(
      setRecommendationLetter,
      token,
      talent_id,
      setTalent
    );

  const getSocialMediaIcon = (platform) => {
    const icons = {
      facebook: <FaFacebookSquare color="#1877F2" />,
      instagram: <FaInstagram color="#E4405F" />,
      linkedin: <FaLinkedin color="#0077B5" />,
      github: <FaGithubSquare color="#333" />,
      x: <FaXTwitter color="#000000" />,
    };

    return icons[platform] || null; // Return null if no icon is found
  };

  const handleViewTalent = (talent_id) => {
    navigate(`/talent/preview/${talent_id}/`);
  };
  return (
    <TalentDefaultLayout>
      <div className="mx-auto max-w-270">
        {/* <Breadcrumb pageName="Profile" /> */}
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  {talent.first_name} information
                  <EditTalentProfile setTalent={setTalent} talent={talent} />
                  <button
                    className="flex items-center justify-center rounded-full bg-purple-500 px-2 py-1 text-white hover:bg-purple-600"
                    onClick={() => handleViewTalent(talent_id)}
                    title="View Talent"
                  >
                    <CiSearch size={16} />
                  </button>
                </h3>
              </div>
              <div className="p-7">
                {talent.first_name ? (
                  <div className="flex flex-col space-y-4">
                    {/* Talent information fields */}
                    <div className="p-7">
                      <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
                        {/* First Name */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="firstName"
                          >
                            First Name: {talent.first_name}
                          </label>
                        </div>

                        {/* Last Name */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="lastName"
                          >
                            Last Name: {talent.last_name}
                          </label>
                        </div>

                        {/* Gender */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="gender"
                          >
                            Gender: {talent.gender}
                          </label>
                        </div>

                        {/* Age */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="age"
                          >
                            Age: {talent.age || "N/A"}
                          </label>
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                          >
                            Phone Number: {talent.phone_number}
                          </label>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="emailAddress"
                          >
                            Email Address: {talent.email}
                          </label>
                        </div>

                        {/* Residence */}
                        <div>
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

                        {/* Job Type */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="jobType"
                          >
                            Job Type: {talent.job_type}
                          </label>
                        </div>

                        {/* Job Sitting */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="jobSitting"
                          >
                            Job Sitting: {talent.job_sitting}
                          </label>
                        </div>

                        {/* Social Links */}
                        <div className="w-1/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="socialLinks"
                          >
                            Social Links:
                            <br />
                            {talent.social_links &&
                            Object.keys(talent.social_links).length > 0 ? (
                              Object.keys(talent.social_links).map(
                                (platform, index) => {
                                  const link = talent.social_links[platform];
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

                        {/* Skills */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="skills"
                          >
                            Skills:
                          </label>
                          {renderArrayField(talent.skills)}
                        </div>

                        {/* Desired Salary */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="desiredSalary"
                          >
                            Desired Salary: {talent.desired_salary || 0}
                          </label>
                        </div>

                        {/* Languages */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="languages"
                          >
                            Languages:
                          </label>
                          {renderArrayField(talent.languages)}
                        </div>

                        {/* Company Black List */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="CompanyBlackList"
                          >
                            Companies Black List:
                          </label>
                          {renderArrayField(talent.companies_black_list)}
                        </div>

                        {/* About Me */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="aboutMe"
                          >
                            About Me: {talent.about_me}
                          </label>
                        </div>

                        {/* Open to Work */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="isOpenToWork"
                          >
                            Open to Work? :{" "}
                            {talent.is_open_to_work ? "Yes" : "No"}
                          </label>
                        </div>

                        {/* Newsletter Signup */}
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="newsletter"
                          >
                            Sign to Newsletter? :{" "}
                            {talent.newsletter ? "Yes" : "No"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={() => deleteTalent(token, setTalent, talent_id)}
                    >
                      Delete User
                    </button>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <div className="border-gray-300 rounded-lg border bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
              <hr />
              {/* CV Upload */}
              <div className="p-7">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  CV Upload
                </h3>
                <br />
                <form action="#">
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleCvChange}
                      ref={cvInputRef}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      {cvFile ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <a
                            href={`${
                              import.meta.env.VITE_BACKEND_API_BASE_URL
                            }${talent.cv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <embed
                              src={
                                `${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                                  talent.cv
                                }`.preview
                              }
                              type="application/pdf"
                              className="h-64 w-full"
                            />
                          </a>
                          <p>{cvFile.file.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            +
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1.5">PDF files only</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={triggerCvUpload}
                    >
                      Upload
                    </button>
                    <button
                      className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={handleSaveCv}
                    >
                      Save
                    </button>

                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={handleDeleteCv}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
              <hr />
              {/* Recommendation Letter Upload */}
              <div className="p-7">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  Recommendation Letter Upload
                </h3>
                <br />
                <form action="#">
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="application/pdf, .doc, .docx"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleRecommendationLetterChange}
                      ref={recommendationLetterInputRef}
                    />
                    {recommendationLetter ? (
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <a
                          href={recommendationLetter.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <embed
                            src={recommendationLetter.preview}
                            type="application/pdf"
                            className="h-64 w-full"
                          />
                        </a>
                        <p>{recommendationLetter.file.name}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          +
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">PDF, DOC, or DOCX files</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={triggerRecommendationLetterUpload}
                    >
                      Upload
                    </button>
                    <button
                      className="flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={handleSaveRecommendationLetter}
                    >
                      Save
                    </button>

                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                      onClick={handleDeleteRecommendationLetter}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </TalentDefaultLayout>
  );
};

export default TalentProfile;
