
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
// import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
// import getTalentDetails from "../../../Talents/functions/crud/getTalentDetails";
// import CoverOne from "../../../images/cover/cover-01.png";
// import {
//   FaFacebookSquare,
//   FaInstagram,
//   FaLinkedin,
//   FaGithubSquare,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { SiCalendly } from "react-icons/si";
// import { CiLocationOn } from "react-icons/ci";

// function ReadTalentProfile() {
//   checkRecruiterToken();
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
//         return <FaFacebookSquare className="text-blue-600" />;
//       case "instagram":
//         return <FaInstagram className="text-pink-500" />;
//       case "linkedin":
//         return <FaLinkedin className="text-blue-500" />;
//       case "github":
//         return <FaGithubSquare className="text-gray-700" />;
//       case "x":
//         return <FaXTwitter className="text-black" />;
//       case "calendly":
//         return <SiCalendly className="text-purple-600" />;
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <RecruiterDefaultLayout>
//         <p className="text-center text-gray-600">Loading talent profile...</p>
//       </RecruiterDefaultLayout>
//     );
//   }

//   if (error) {
//     return (
//       <RecruiterDefaultLayout>
//         <p className="text-center text-red-500">{error}</p>
//       </RecruiterDefaultLayout>
//     );
//   }

//   return (
//     <RecruiterDefaultLayout>
//       <div className="rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
//         {/* Cover Image */}
//         <div className="relative h-56 md:h-72">
//           <img
//             src={talent?.cover_picture || CoverOne}
//             alt="Profile cover"
//             className="h-full w-full rounded-t-lg object-cover"
//           />
//         </div>

//         {/* Profile Picture and Basic Info */}
//         <div className="px-6 pb-10 text-center">
//           <div className="relative -mt-20 mx-auto h-40 w-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
//             <img
//               src={
//                 talent?.profile_picture
//                   ? `${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.profile_picture}`
//                   : "https://via.placeholder.com/150"
//               }
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           </div>

//           <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
//             {talent?.first_name || "Unknown"} {talent?.last_name || "Talent"}
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {talent?.job_type || "Job type not specified"}
//           </p>
//           <p className="mt-2 text-gray-500 dark:text-gray-400">
//             <CiLocationOn className="inline-block text-lg text-purple-600" />{" "}
//             {talent?.residence || "Location not specified"}
//           </p>
//         </div>

//         {/* About Section */}
//         <div className="px-6 pb-6">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//             About Me
//           </h3>
//           <p className="mt-3 text-gray-600 dark:text-gray-400">
//             {talent?.about_me || "No description provided."}
//           </p>
//         </div>

//         {/* Skills Section */}
//         {talent?.skills && (
//           <div className="px-6 pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Skills
//             </h3>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {talent.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-600 dark:bg-blue-800 dark:text-blue-200"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Languages Section */}
//         {talent?.languages && (
//           <div className="px-6 pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//               Languages
//             </h3>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {talent.languages.map((language, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-600 dark:bg-green-800 dark:text-green-200"
//                 >
//                   {language}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CV and Recommendation Letter */}
//         <div className="px-6 pb-6">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Additional Files
//           </h3>
//           <div className="mt-3 space-y-2">
//             {talent?.cv && (
//               <a
//                 href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.cv}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block rounded-lg bg-purple-500 px-4 py-2 text-center text-white hover:bg-purple-600"
//               >
//                 Download CV
//               </a>
//             )}
//             {talent?.recommendation_letter && (
//               <a
//                 href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.recommendation_letter}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block rounded-lg bg-purple-500 px-4 py-2 text-center text-white hover:bg-purple-600"
//               >
//                 Download Recommendation Letter
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Social Media Links */}
//         {talent?.social_links && (
//           <div className="px-6 pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
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
//     </RecruiterDefaultLayout>
//   );
// }

// export default ReadTalentProfile;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
import checkRecruiterToken from "../../functions/auth/checkRecruiterToken";
import getTalentDetails from "../../../Talents/functions/crud/getTalentDetails";
import CoverOne from "../../../images/cover/cover-01.png";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCalendly } from "react-icons/si";
import { CiLocationOn } from "react-icons/ci";

function ReadTalentProfile() {
  checkRecruiterToken();
  const { talent_id } = useParams();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        return <FaFacebookSquare className="text-blue-600 text-2xl" />;
      case "instagram":
        return <FaInstagram className="text-pink-500 text-2xl" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-500 text-2xl" />;
      case "github":
        return <FaGithubSquare className="text-gray-700 text-2xl" />;
      case "x":
        return <FaXTwitter className="text-black text-2xl" />;
      case "calendly":
        return <SiCalendly className="text-purple-600 text-2xl" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <RecruiterDefaultLayout>
        <p className="text-center text-gray-600">Loading talent profile...</p>
      </RecruiterDefaultLayout>
    );
  }

  if (error) {
    return (
      <RecruiterDefaultLayout>
        <p className="text-center text-red-500">{error}</p>
      </RecruiterDefaultLayout>
    );
  }

  return (
    <RecruiterDefaultLayout>
      <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
        {/* Cover Section */}
        <div className="relative h-56 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg">
          <img
            src={talent?.cover_picture || CoverOne}
            alt="Profile cover"
            className="absolute inset-0 h-full w-full object-cover opacity-30 rounded-t-lg"
          />
         
        </div>

        {/* Profile Section */}
        <div className="relative -mt-20 text-center">
          <div className="mx-auto h-40 w-40 rounded-full border-4 border-white shadow-lg dark:border-gray-800">
            <img
              src={
                talent?.profile_picture
                  ? `${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.profile_picture}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {talent?.first_name || "Unknown"} {talent?.last_name || "Talent"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {talent?.job_type || "Job type not specified"}
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            <CiLocationOn className="inline-block text-lg text-purple-600" />{" "}
            {talent?.residence || "Location not specified"}
          </p>
        </div>

        {/* About Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            About Me
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {talent?.about_me || "No description provided."}
          </p>
        </div>

        {/* Skills Section */}
        {talent?.skills && (
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Skills
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {talent.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {talent?.languages && (
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Languages
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {talent.languages.map((language, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CV and Recommendation Letter */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Additional Files
          </h3>
          <div className="mt-3 space-y-3">
            {talent?.cv && (
              <a
                href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.cv}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white hover:bg-blue-600"
              >
                Download CV
              </a>
            )}
            {talent?.recommendation_letter && (
              <a
                href={`${import.meta.env.VITE_BACKEND_API_BASE_URL}${talent.recommendation_letter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-purple-500 px-4 py-2 text-center font-semibold text-white hover:bg-purple-600"
              >
                Download Recommendation Letter
              </a>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        {talent?.social_links && (
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Follow Me
            </h3>
            <div className="mt-3 flex justify-center gap-4">
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
            </div>
          </div>
        )}
      </div>
    </RecruiterDefaultLayout>
  );
}

export default ReadTalentProfile;
