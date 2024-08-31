import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect, useRef } from "react";
import TalentDefaultLayout from "../components/TalentDefaultLayout";
import EditTalentProfile from "./EditTalentProfile";
import getTalentDetails from "../functions/crud/getTalentDetails";
import checkTalentToken from "../functions/auth/checkTalentToken";
import { jwtDecode } from "jwt-decode";
import saveCv from "../functions/crud/files/saveCv";
import saveRecommendationLetter from "../functions/crud/files/saveRecommendationLetter";
import deleteCv from "../functions/crud/files/deleteCv";
import deleteRecommendationLetter from "../functions/crud/files/deleteRecommendationLetter";

const TalentProfile = () => {
  checkTalentToken();

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
        file: { name: talent.cv.split('/').pop() },
        preview: `/assets/users/${talent.email}/cvs/${talent.cv.split('/').pop()}`,
      });
    }
    if (talent.recommendation_letter) {
      setRecommendationLetter({
        file: { name: talent.recommendation_letter.split('/').pop() },
        preview: `/assets/users/${talent.email}/recommendation_letters/${talent.recommendation_letter.split('/').pop()}`,
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

  const triggerCvUpload = () => {
    cvInputRef.current.click();
  };

  const triggerRecommendationLetterUpload = () => {
    recommendationLetterInputRef.current.click();
  };

  const handleSaveCv = () => {
    saveCv(cvFile, token, talent_id, setTalent);
  };

  const handleDeleteCv = () => {
    deleteCv(setCvFile, token, talent_id, setTalent);
  };

  const handleSaveRecommendationLetter = () => {
    saveRecommendationLetter(recommendationLetter, token, talent_id, setTalent);
  };

  const handleDeleteRecommendationLetter = () => {
    deleteRecommendationLetter(setRecommendationLetter, token, talent_id, setTalent);
  };

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
    <TalentDefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  Talent Information
                  <EditTalentProfile />
                </h3>
              </div>
              <div className="p-7">
                {talent.first_name ? (
                  <div className="flex flex-col space-y-4">
                    {/* Talent information fields */}
                    <div className="p-7">
                      <div className="flex flex-col space-y-4">
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                              Social Links:
                              <br />
                              {Array.isArray(talent.social_links) &&
                              talent.social_links.length > 0 ? (
                                talent.social_links.map((link, index) =>
                                  typeof link === "string" ? (
                                    <div key={index}>
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
                                  ) : (
                                    <span key={index}>Invalid link format</span>
                                  )
                                )
                              ) : (
                                <span>No social links provided</span>
                              )}
                            </label>
                          </div>
                        </div>
                        <br />

                        {/* skills */}
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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

                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
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
                            Open to Work:{" "}
                            {talent.is_open_to_work ? "Yes" : "No"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={() => console.log("Delete User")}
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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                    {cvFile ? (
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <a
                          href={cvFile.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <embed
                            src={cvFile.preview}
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
                          <span className="text-primary">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">PDF files only</p>
                      </div>
                    )}
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