
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
