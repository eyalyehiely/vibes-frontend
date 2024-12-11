// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import getUserDetails from "../../Talents/functions/crud/getUserDetails";

// function WelcomeNote() {
//   const [user, setUser] = useState([]);
//   const token = localStorage.getItem("authTokens");
//   const decodedToken = jwtDecode(token);
//   const user_id = decodedToken.user_id;
//   useEffect(() => {
//     if (token) {
//       getUserDetails(token, setUser, user_id);
//     }
//   }, [token]);

//   const first_name = user ? user.first_name : "";
//   const currentTime = new Date();
//   const currentHour = currentTime.getHours();
//   let greeting;

//   if (currentHour >= 5 && currentHour < 12) {
//     greeting = "בוקר טוב";
//   } else if (currentHour >= 12 && currentHour < 16) {
//     greeting = "צהריים טובים";
//   } else if (currentHour >= 16 && currentHour < 19) {
//     greeting = "אחר הצהריים טובים";
//   } else if (currentHour >= 19 && currentHour < 21) {
//     greeting = "ערב טוב";
//   } else {
//     greeting = "לילה טוב";
//   }

//   return (
//     <div className="relative mb-8 overflow-hidden rounded-full bg-indigo-200 p-4 dark:bg-indigo-800 sm:p-6">
//       {/* Content */}
//       <div dir="rtl" className="relative flex items-center">
//         <h1 className="md:text-md mb-1 flex items-center text-xl font-bold text-slate-800 dark:text-slate-100">
//           <span className="mb-1 flex items-center text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
//             {greeting}, {first_name} 👋🏻
//           </span>
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default WelcomeNote;
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import
import getUserDetails from "../../Talents/functions/crud/getUserDetails";

function WelcomeNote() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken?.user_id;
      getUserDetails(token, setUser, user_id);
    }
  }, [token]);

  const first_name = user?.first_name || "משתמש";
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const greeting =
    currentHour >= 5 && currentHour < 12
      ? "בוקר טוב"
      : currentHour >= 12 && currentHour < 16
      ? "צהריים טובים"
      : currentHour >= 16 && currentHour < 19
      ? "אחר הצהריים טובים"
      : currentHour >= 19 && currentHour < 21
      ? "ערב טוב"
      : "לילה טוב";

  return (
    <div className="relative mb-8 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-500 p-6 shadow-lg dark:from-indigo-700 dark:to-blue-900">
      {/* Content */}
      <div dir="rtl" className="relative flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {greeting}, {first_name} 👋🏻
          </h1>
          <p className="mt-2 text-lg text-indigo-100">
            שמחים לראות אותך שוב! מקווים שיהיה לך יום נפלא.
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default WelcomeNote;
