import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
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
import saveProfilePicture from "../functions/crud/files/profile_picture/saveProfilePicture";
import deleteProfilePicture from "../functions/crud/files/profile_picture/deleteProfilePicture";
import {
  CameraIcon,
  UploadIcon,
  PhotographIcon,
  TrashIcon,
  BookmarkIcon,
} from "@heroicons/react/solid";

const TalentProfile = () => {
  checkTalentToken();

  const [talent, setTalent] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [recommendationLetter, setRecommendationLetter] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cvInputRef = useRef(null);
  const recommendationLetterInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);

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

    if (talent.profile_picture) {
      setProfilePicture({
        file: { name: talent.profile_picture.split("/").pop() },
        preview: `/assets/users/${
          talent.email
        }/profile_pictures/${talent.profile_picture.split("/").pop()}`,
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
    if (talent.profile_picture) {
      setProfilePicture({
        file: { name: talent.profile_picture.split("/").pop() },
        preview: `/assets/users/${
          talent.email
        }/profile_pictures/${talent.profile_picture.split("/").pop()}`,
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
  const triggerProfilePictureUpload = () =>
    profilePictureInputRef.current.click();

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleProfilePictureUpload = async () => {
    if (profilePicture) {
      await saveProfilePicture(profilePicture, token, talent_id, setTalent);
    }
  };
  const handleDeleteProfilePicture = async () => {
    await deleteProfilePicture(setProfilePicture, token, talent_id, setTalent);
  };
  const startCamera = () => {
    setCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const closeCamera = () => {
    setCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop()); // Stop each track to close the camera
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL("image/png");
    setPhotoTaken(imageData);

    // Stop the camera after taking the picture
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setCameraActive(false);

    // Convert the base64 image to a file object for upload
    const base64ToBlob = (dataURL) => {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const buffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(buffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      return new Blob([buffer], { type: mimeString });
    };

    const blob = base64ToBlob(imageData);

    // Assuming you have access to the user's ID (e.g., from a decoded JWT token)
    const userId = decodedToken.user_id; // Or however you retrieve the user ID

    // Create a meaningful file name
    const file = new File([blob], `${userId}_profile_picture.png`, {
      type: "image/png",
    });

    // Set the file and preview for displaying in the UI
    setProfilePicture({
      file,
      preview: imageData,
    });
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
                        <div>
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="socialLinks"
                          >
                            Social Links:
                          </label>
                          {talent.social_links &&
                          Object.keys(talent.social_links).length > 0 ? (
                            Object.keys(talent.social_links).map(
                              (platform, index) => {
                                const link = talent.social_links[platform];
                                return (
                                  <div key={index}>
                                    <strong>{platform}:</strong>{" "}
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
            <div className="border-gray-300 rounded-lg border bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
              {/* Profile Picture Upload */}
              <div className="dark:bg-gray-800 rounded-lg bg-white p-7 shadow-md">
                <h3 className="text-gray-800 mb-4 font-semibold dark:text-white">
                  Profile Picture
                </h3>

                {/* Profile Image Display */}
                <div className="flex items-center justify-center">
                  {profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                        talent.profile_picture
                      }`}
                      alt="User Profile"
                      className="h-32 w-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500">No Profile Picture</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {/* Start Camera Button */}
                  <button
                    className="flex items-center justify-center space-x-2 rounded bg-purple-600 px-2 py-2 font-medium text-white transition duration-300 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    type="button"
                    onClick={startCamera}
                    aria-label="Start Camera to Take Picture"
                  >
                    <CameraIcon className="h-5 w-5" />
                    <span>Start Camera</span>
                  </button>

                  {/* Capture Photo Button (Visible when camera is active) */}
                  {cameraActive && (
                    <button
                      className="flex items-center justify-center space-x-2 rounded bg-green-500 px-2 py-2 font-medium text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                      type="button"
                      onClick={takePhoto}
                      aria-label="Capture Photo"
                    >
                      <PhotographIcon className="h-5 w-5" />
                      <span>Capture</span>
                    </button>
                  )}

                  {/* Upload from Computer Button */}
                  <button
                    className="flex items-center justify-center space-x-2 rounded bg-blue-500 px-2 py-2 font-medium text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    type="button"
                    onClick={triggerProfilePictureUpload}
                    aria-label="Upload Profile Picture from Computer"
                  >
                    <UploadIcon className="h-5 w-5" />
                    <span>Upload</span>
                  </button>

                  {/* Save Button */}
                  <button
                    className="flex items-center justify-center space-x-2 rounded bg-purple-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    type="button"
                    onClick={handleProfilePictureUpload}
                    aria-label="Save Profile Picture"
                  >
                    <BookmarkIcon className="h-5 w-5" />
                    <span>Save</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="button"
                    onClick={handleDeleteProfilePicture}
                    aria-label="Delete Profile Picture"
                  >
                    <TrashIcon className="h-6 w-6" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Video and Canvas Elements */}
                <div className="mt-6 flex flex-col items-center">
                  {cameraActive && (
                    <video
                      ref={videoRef}
                      className="w-full max-w-md rounded-lg shadow-md"
                      autoPlay
                    ></video>
                  )}
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                    width="640"
                    height="480"
                  ></canvas>
                </div>

                {/* Captured Photo Display */}
                {photoTaken && (
                  <div className="mt-6 text-center">
                    <h4 className="text-gray-800 mb-2 font-semibold dark:text-white">
                      Captured Image:
                    </h4>
                    <img
                      src={photoTaken}
                      alt="Captured Profile"
                      className="mx-auto h-32 w-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
                    />
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={profilePictureInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>

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
