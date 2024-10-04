import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect,useRef } from "react";
import RecruiterDefaultLayout from "../components/RecruiterDefaultLayout";
import EditRecruiterProfile from "./EditRecruiterProfile";
import getRecruiterDetails from "../functions/crud/getRecruiterDetails";
import checkRecruiterToken from "../functions/auth/checkRecruiterToken";
import { jwtDecode } from "jwt-decode";
import deleteRecruiter from "../functions/crud/deleteRecruiter";
import getCompanyDetails from "../../Companies/functions/crud/company/getCompanyDetails";
import saveProfilePicture from "../../Talents/functions/crud/files/profile_picture/saveProfilePicture";
import deleteProfilePicture from "../../Talents/functions/crud/files/profile_picture/deleteProfilePicture";

const RecruiterProfile = () => {
  checkRecruiterToken();
  const [recruiter, setRecruiter] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);

  const profilePictureInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);



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


  useEffect(() => {
    if (recruiter.profile_picture) {
      setProfilePicture({
        file: { name: recruiter.profile_picture.split("/").pop() },
        preview: `/assets/users/${
          recruiter.email
        }/profile_pictures/${recruiter.profile_picture.split("/").pop()}`,
      });
    }
  }, [recruiter]);

  const handleDelete = () => {
    deleteRecruiter(token, setRecruiter, recruiter_id);
  };


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const triggerProfilePictureUpload = () => {
    profilePictureInputRef.current.click();
  };

  const handleProfilePictureUpload = async () => {
    if (profilePicture) {
      await saveProfilePicture(profilePicture, token, recruiter_id, setRecruiter);
    }
  };

  const handleDeleteProfilePicture = async () => {
    await deleteProfilePicture(setProfilePicture, token, recruiter_id, setRecruiter);
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
    const file = new File([blob], `${userId}_profile_picture.png`, { type: "image/png" });
  
    // Set the file and preview for displaying in the UI
    setProfilePicture({
      file,
      preview: imageData,
    });
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                  {recruiter.first_name} Information
                  <EditRecruiterProfile />
                </h3>
              </div>
              <div className="p-7">
                {recruiter.first_name ? (
                  <div className="flex flex-col space-y-4">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* first name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="firstName"
                        >
                          First Name: {recruiter.first_name}
                        </label>
                      </div>

                      {/* last name */}
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="lastName"
                        >
                          Last Name: {recruiter.last_name}
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
                          Gender: {recruiter.gender}
                        </label>
                      </div>

                      {/* phone number */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number: {recruiter.phone_number}
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
                          Email Address: {recruiter.email}
                        </label>
                      </div>

                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="division"
                        >
                          Division:{" "}
                          {Array.isArray(recruiter.division)
                            ? recruiter.division.join(", ")
                            : recruiter.division}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Company */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="company"
                        >
                          Company: {company.name}
                        </label>
                      </div>

                      {/* Position */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="position"
                        >
                          Position: {recruiter.position}
                        </label>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      {/* Working Time */}
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="WorkingTime"
                        >
                          Working Time:
                        </label>

                        <div className="space-y-2">
                          {recruiter.working_time ? (
                            Object.keys(recruiter.working_time).map((day) => (
                              <div key={day} className="flex justify-between">
                                <span className="font-medium">{day}:</span>
                                {recruiter.working_time[day].selected ? (
                                  <span className="text-gray-500">
                                    {recruiter.working_time[day].start || "N/A"}{" "}
                                    - {recruiter.working_time[day].end || "N/A"}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">
                                    Not working
                                  </span>
                                )}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">
                              No working time available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5"></div>
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
            <div className="p-7">
                <h3 className="font-medium text-black dark:text-white">
                  Profile Picture
                </h3>
                <div>
                  {profilePicture ? (
                    <img
                      src={profilePicture.preview}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <p>No Profile Picture</p>
                  )}
                </div>

                <button
                  className="mt-3 flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                  onClick={startCamera}
                >
                  Take Picture
                </button>

                <video
                  ref={videoRef}
                  style={{
                    display: cameraActive ? "block" : "none",
                    width: "100%",
                  }}
                ></video>

                <canvas
                  ref={canvasRef}
                  style={{ display: "none" }}
                  width="640"
                  height="480"
                ></canvas>

                {cameraActive && (
                  <button
                    className="mt-3 flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="button"
                    onClick={takePhoto}
                  >
                    Capture
                  </button>
                )}

                {photoTaken && (
                  <div>
                    <h4 className="mt-3 font-medium">Captured Image:</h4>
                    <img
                      src={photoTaken}
                      alt="Captured"
                      className="mt-2 h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                )}

                <button
                  className="mt-3 flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                  onClick={triggerProfilePictureUpload}
                >
                  Upload from Computer
                </button>

                <input
                  type="file"
                  ref={profilePictureInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                />

                <button
                  className="mt-3 flex justify-center rounded bg-success px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                  onClick={handleProfilePictureUpload}
                >
                  Save
                </button>

                <button
                  className="mt-3 flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                  onClick={handleDeleteProfilePicture}
                >
                  Delete
                </button>
              </div>
          </div>
        </div>
      </div>
    </RecruiterDefaultLayout>
  );
};

export default RecruiterProfile;
