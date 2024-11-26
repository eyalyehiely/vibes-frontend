// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
// // import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
// import getTalentDetails from "../../../Talents/functions/crud/getTalentDetails";
// import CoverOne from "../../../images/cover/cover-01.png";
// import { ArrowLeft } from "lucide-react";

// import {
//   FaFacebookSquare,
//   FaInstagram,
//   FaLinkedin,
//   FaGithubSquare,
//   FaPhone,
//   FaEnvelope,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { SiCalendly } from "react-icons/si";
// import { CiLocationOn } from "react-icons/ci";

// function ReadTalentProfile() {
//   // checkRecruiterToken();
//   const { talent_id } = useParams();
//   const [talent, setTalent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("authTokens")
//     ? JSON.parse(localStorage.getItem("authTokens")).access
//     : null;

//   useEffect(() => {
//     if (token && talent_id) {
//       getTalentDetails(token, setTalent, talent_id)
//         .then(() => setLoading(false))
//         .catch((err) => {
//           setError("Failed to fetch talent details.");
//           console.error(err);
//           setLoading(false);
//         });
//     }
//   }, [token, talent_id]);

//   const getSocialMediaIcon = (platform) => {
//     switch (platform) {
//       case "facebook":
//         return <FaFacebookSquare className="text-3xl text-blue-600" />;
//       case "instagram":
//         return <FaInstagram className="text-3xl text-pink-500" />;
//       case "linkedin":
//         return <FaLinkedin className="text-3xl text-blue-500" />;
//       case "github":
//         return <FaGithubSquare className="text-gray-700 text-3xl" />;
//       case "x":
//         return <FaXTwitter className="text-3xl text-black" />;
//       case "calendly":
//         return <SiCalendly className="text-3xl text-purple-600" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       // <RecruiterDefaultLayout>
//       <p className="text-gray-600 text-center">Loading talent profile...</p>
//       // </RecruiterDefaultLayout>
//     );
//   }

//   if (error) {
//     return (
//       // <RecruiterDefaultLayout>
//       <p className="text-red-500 text-center">{error}</p>
//       // </RecruiterDefaultLayout>
//     );
//   }

//   return (
//     // <RecruiterDefaultLayout>
//     <>
//     <button>
//     <ArrowLeft/>

//     </button>

//       <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 mx-auto max-w-5xl rounded-lg border bg-white shadow-lg">
//         {/* Cover Section */}
//         <div className="relative h-56 rounded-t-lg bg-gradient-to-r from-purple-500 to-blue-500">
//           <img
//             src={talent?.cover_picture || CoverOne}
//             alt="Profile cover"
//             className="absolute inset-0 h-full w-full rounded-t-lg object-cover opacity-30"
//           />
//         </div>
//         {/* Profile Section */}
//         <div className="relative -mt-20 text-center">
//           <div className="dark:border-gray-800 mx-auto h-40 w-40 rounded-full border-4 border-white shadow-lg">
//             <img
//               src={
//                 talent?.profile_picture
//                   ? `${import.meta.env.VITE_BACKEND_API_BASE_URL}${
//                       talent.profile_picture
//                     }`
//                   : "https://via.placeholder.com/150"
//               }
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           </div>
//           <h2 className="text-gray-900 mt-4 text-2xl font-bold dark:text-white">
//             {talent?.first_name || "Unknown"} {talent?.last_name || "Talent"}
//           </h2>
//           <p className="text-gray-500 dark:text-gray-400">
//             {talent?.job_type || "Job type not specified"}
//           </p>
//           <p className="text-gray-500 dark:text-gray-400 mt-2">
//             <CiLocationOn className="inline-block text-lg text-purple-600" />{" "}
//             {talent?.residence || "Location not specified"}
//           </p>
//         </div>

//         {/* About Section */}
//         <div className="px-6 py-4">
//           <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//             About Me
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mt-3">
//             {talent?.about_me || "No description provided."}
//           </p>
//         </div>
//         {/* Skills Section */}
//         {talent?.skills && (
//           <div className="px-6 py-4">
//             <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//               Skills
//             </h3>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {talent.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-sm font-semibold text-white"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//         {/* Languages Section */}
//         {talent?.languages && (
//           <div className="px-6 py-4">
//             <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//               Languages
//             </h3>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {talent.languages.map((language, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-sm font-semibold text-white"
//                 >
//                   {language}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//         {/* Desired salary */}
//         <div className="px-6 py-4">
//           <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//             Desired Salary
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mt-3">
//             {talent?.desired_salary || "No salary provided."}
//           </p>
//         </div>
//         {/* Contact details */}
//         <div className="px-6 py-4">
//           <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//             Contact Details
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 mt-3 flex items-center">
//             <FaPhone className="mr-2 text-blue-600" />
//             {talent?.phone_number ? (
//               <a
//                 href={`tel:${talent.phone_number}`}
//                 className="text-blue-500 hover:underline"
//               >
//                 {talent.phone_number}
//               </a>
//             ) : (
//               "No phone number provided."
//             )}
//           </p>
//           <p className="text-gray-600 dark:text-gray-400 mt-3 flex items-center">
//             <FaEnvelope className="text-red-600 mr-2" />
//             {talent?.username ? (
//               <a
//                 href={`mailto:${talent.username}`}
//                 className="text-blue-500 hover:underline"
//               >
//                 {talent.username}
//               </a>
//             ) : (
//               "No email provided."
//             )}
//           </p>
//         </div>

//         {/* Social Media Links */}
//         {talent?.social_links && (
//           <div className="px-6 py-4">
//             <h3 className="text-gray-800 text-lg font-semibold dark:text-white">
//               Follow Me
//             </h3>
//             <div className="mt-3 flex justify-center gap-4">
//               {Object.keys(talent.social_links).map((platform) => (
//                 <a
//                   href={talent.social_links[platform]}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   key={platform}
//                   className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
//                 >
//                   {getSocialMediaIcon(platform)}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//     </>
//     // {/* </RecruiterDefaultLayout> */}
//   );
// }

// export default ReadTalentProfile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
// import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import getTalentDetails from "../../../Talents/functions/crud/getTalentDetails";
import CoverOne from "../../../images/cover/cover-01.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  FaUserAlt,
  FaTools,
  FaGlobeAmericas,
  FaDollarSign,
} from "react-icons/fa";
import Rights from "../../../components/Rights";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithubSquare,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCalendly } from "react-icons/si";
import { CiLocationOn } from "react-icons/ci";

function ReadTalentProfile() {
  // checkRecruiterToken();
  const { talent_id } = useParams();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;

  useEffect(() => {
    if (token && talent_id) {
      getTalentDetails(token, setTalent, talent_id)
        .then(() => setLoading(false))
        .catch((err) => {
          setError("Failed to fetch talent details.");
          console.error(err);
          setLoading(false);
        });
    }
  }, [token, talent_id]);

  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookSquare className="text-xl text-blue-600" />;
      case "instagram":
        return <FaInstagram className="text-2xl text-pink-500" />;
      case "linkedin":
        return <FaLinkedin className="text-xl text-blue-500" />;
      case "github":
        return <FaGithubSquare className="text-gray-700 text-xl" />;
      case "x":
        return <FaXTwitter className="text-xl text-black" />;
      case "calendly":
        return <SiCalendly className="text-xl text-purple-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      // <RecruiterDefaultLayout>
      <p className="text-gray-600 text-center">Loading talent profile...</p>
      // </RecruiterDefaultLayout>
    );
  }

  if (error) {
    return (
      // <RecruiterDefaultLayout>
      <p className="text-red-500 text-center">{error}</p>
      // </RecruiterDefaultLayout>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 mx-auto max-w-5xl rounded-lg border bg-white shadow-lg">
        {/* Cover Section */}
        <div className="relative h-56 rounded-t-lg bg-gradient-to-r from-purple-500 to-blue-500">
          <img
            src={talent?.cover_picture || CoverOne}
            alt="Profile cover"
            className="absolute inset-0 h-full w-full rounded-t-lg object-cover opacity-30"
          />
          <button
            onClick={handleGoBack}
            className="dark:text-gray-100 absolute inset-x-0 mb-22 ml-3 mt-2 text-left"
            title="Go Back"
          >
            <ArrowLeft color="black" size={36} />
          </button>
          <h2 className="dark:text-gray-100 absolute inset-x-0 bottom-4 mb-18 text-center text-4xl font-bold text-white">
            {talent?.first_name || "Unknown"} {talent?.last_name || "Talent"},{" "}
            {talent?.age || "Age"}
          </h2>
        </div>

        {/* Profile Section */}
        <div className="relative -mt-20 text-center">
          <div className="dark:border-gray-800 mx-auto h-40 w-40 rounded-full border-4 border-white shadow-lg">
            <img
              src={
                talent?.profile_picture
                  ? `${import.meta.env.VITE_BACKEND_API_BASE_URL}${
                      talent.profile_picture
                    }`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            {talent?.job_type || "Job type not specified"}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            <CiLocationOn className="inline-block text-lg text-purple-600" />{" "}
            {talent?.residence || "Location not specified"}
          </p>
        </div>

        <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {talent?.phone_number ? (
                <a
                  href={`tel:${talent.phone_number}`}
                  className="text-blue-500 hover:underline"
                >
                  <FaPhone className="mr-2 text-blue-600" color="blue" />
                </a>
              ) : (
                "No phone number provided."
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {talent?.username ? (
                <a
                  href={`mailto:${talent.username}`}
                  className="text-blue-500 hover:underline"
                >
                  <FaEnvelope className="text-red-600 mr-2" color="blue" />
                </a>
              ) : (
                "No email provided."
              )}
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 px-2 xsm:flex-row">
            <span className="font-semibold text-black dark:text-white">
              {Object.keys(talent.social_links).map((platform) => (
                <a
                  href={talent.social_links[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={platform}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {getSocialMediaIcon(platform)}
                </a>
              ))}
            </span>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-b px-6 py-6">
          <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
            <FaUserAlt className="text-blue-500" /> About Me
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {talent?.about_me || "No description provided."}
          </p>
        </div>

        {/* Skills Section */}
        {talent?.skills && (
          <div className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 border-b px-6 py-6">
            <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
              <FaTools className="text-green-500" /> Skills
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {talent.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {talent?.languages && (
          <div className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-b px-6 py-6">
            <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
              <FaGlobeAmericas className="text-teal-500" /> Languages
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {talent.languages.map((language, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-md"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Desired Salary Section */}
        <div className="bg-gray-100 dark:bg-gray-900 px-6 py-6">
          <h3 className="text-gray-800 flex items-center gap-2 text-xl font-semibold dark:text-white">
            <FaDollarSign className="text-yellow-500" /> Desired Salary
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="mb-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-md">
              {talent?.desired_salary || "No salary provided."}
            </span>
          </div>
        </div>
      </div>
      <Rights />
    </>
  );
}

export default ReadTalentProfile;
