import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { CiCamera, CiBookmark } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { TbCapture } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import saveProfilePicture from "../../../Talents/functions/crud/files/profile_picture/saveProfilePicture";
import deleteProfilePicture from "../../../Talents/functions/crud/files/profile_picture/deleteProfilePicture";
import getRecruiterDetails from "../../functions/crud/getRecruiterDetails";
import getCompanyDetails from "../../../Companies/functions/crud/company/getCompanyDetails";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import { jwtDecode } from "jwt-decode";



function RecruiterPicHandling() {
  checkRecruiterToken();
  const [recruiter, setRecruiter] = useState({});
  const [company, setCompany] = useState({});
  //   const [loading, setLoading] = useState(true);
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
      await saveProfilePicture(
        profilePicture,
        token,
        recruiter_id,
        setRecruiter
      );
    }
  };
  const handleDeleteProfilePicture = async () => {
    await deleteProfilePicture(
      setProfilePicture,
      token,
      recruiter_id,
      setRecruiter
    );
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

  const triggerProfilePictureUpload = () =>
    profilePictureInputRef.current.click();
  return (
    <>
    <div className="col-span-2">
      <div className="rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="font-medium text-black dark:text-white">
          Profile Picture
        </h3>
        <div className="p-7">
          <div className="mt-4 flex justify-center">
            {profilePicture ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                  recruiter.profile_picture
                }`}
                alt="User"
                // className="mx-auto h-32 w-32 rounded-full object-cover"
                className="h-32 w-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
              />
            ) : (
              <>
                <p>No Profile Picture</p>
                <p className="text-gray-500">No Profile Picture</p>
              </>
            )}
          </div>
          <div className="mt-2 flex flex-row flex-wrap justify-center gap-2.5 sm:flex-row">
            <button
              className="mt-2 flex justify-center rounded bg-purple-500 px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
              type="button"
              onClick={startCamera}
            >
              <CiCamera size={19} className="mb-1" />
            </button>
            <video
              ref={videoRef}
              style={{
                display: cameraActive ? "block" : "none",
                width: "100%",
              }}
              className="max-w-xs"
            ></video>
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width="640"
              height="480"
            ></canvas>
            {cameraActive && (
              <button
                className="mt-2 flex justify-center rounded bg-purple-500 px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
                type="button"
                onClick={takePhoto}
              >
                <TbCapture size={19} className="mb-1" />
              </button>
            )}

            {cameraActive && (
              <button
                className="mt-2 flex justify-center rounded bg-yellow-500 px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
                type="button"
                onClick={closeCamera}
              >
                <IoMdClose size={19} className="mb-1" />
              </button>
            )}
            {photoTaken && (
              <div>
                <h4 className="mt-2 text-sm font-medium">Captured Image:</h4>
                <img
                  src={photoTaken}
                  alt="Captured"
                  className="mt-2 h-24 w-24 rounded-full object-cover"
                />
              </div>
            )}
            <button
              className="mt-2 flex justify-center rounded bg-primary px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
              type="button"
              onClick={triggerProfilePictureUpload}
            >
              <MdOutlineDriveFolderUpload size={19} className="mb-1" />
            </button>
            <input
              type="file"
              ref={profilePictureInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />

            <button
              className="mt-2 flex justify-center rounded bg-success px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
              type="button"
              onClick={handleProfilePictureUpload}
            >
              <CiBookmark size={19} className="mb-1" />
            </button>
            <button
              className="mt-2 flex justify-center rounded bg-danger px-3 py-1.5 text-sm font-medium text-gray hover:bg-opacity-90"
              type="button"
              onClick={handleDeleteProfilePicture}
            >
              <IoTrashOutline size={19} className="mb-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

  );
  
}

export default RecruiterPicHandling;
