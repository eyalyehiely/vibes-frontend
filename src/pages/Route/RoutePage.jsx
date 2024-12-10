import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../generalFunctions/config/axiosConfig";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaMoneyBillWave,
} from "react-icons/fa";
import DefaultLayout from "../../Talents/components/DefaultLayout";

const ActivityDetails = ({ activity }) => {
  const aiSuggestions = activity.ai_suggestion
    ? JSON.parse(activity.ai_suggestion)
    : null;

  const openGoogleMaps = (area) => {
    const encodedLocation = encodeURIComponent(area);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
      "_blank"
    );
  };

  return (
    <div
      className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-lg"
      style={{ direction: "rtl" }} // Right-to-left layout
    >
      <h2 className="mb-2 text-2xl font-bold">{activity.title}</h2>
      <p className="mb-4 text-sm italic">
        <FaCalendarAlt className="mr-2 inline" />
        {new Date(activity.time).toLocaleString("he-IL") || "לא סופק זמן"}
      </p>
      <div className="mt-4">
        <p>
          <FaUserFriends className="ml-1 mr-2 inline" />
          <strong>חברה: </strong>
          {activity.company === "myself"
            ? "לבד"
            : activity.company === "עם חברים"
            ? "עם חברים"
            : activity.company || "לא סופק"}{" "}
        </p>
        <p>
          <FaMapMarkerAlt className="ml-1 mr-2 inline" />
          <strong>אזור:</strong>{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => openGoogleMaps(activity.area)}
          >
            {activity.area || "לא סופק"}
          </span>
        </p>
        <p>
          <FaMoneyBillWave className="ml-1 mr-2 inline" />
          <strong>עלות משוערת: </strong> עד {activity.cost || "לא סופק"} ש"ח
        </p>
      </div>
      {aiSuggestions && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">הצעות מבוססות בינה מלאכותית</h3>
          {Object.keys(aiSuggestions).map((key, index) => (
            <div key={index} className="mt-2 rounded-lg bg-indigo-700 p-4">
              <p>
                <strong>אפשרות {index + 1}:</strong>
              </p>
              <p>
                <strong>פעילות:</strong> {aiSuggestions[key].Activity}
              </p>
              <p>
                <strong>מיקום:</strong>
                <span
                  onClick={() => openGoogleMaps(aiSuggestions[key].Location)}
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  {aiSuggestions[key]?.Location || "לא סופק"}
                </span>{" "}
              </p>
              <p>
                <strong>עלות:</strong> {aiSuggestions[key]["Estimated Cost"]}
              </p>
              <p>
                <strong>תיאור:</strong> {aiSuggestions[key].Description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RoutePage = () => {
  const { route_id } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      const token = localStorage.getItem("authTokens");

      if (!token) {
        setError("לא נמצא אסימון אימות חוקי.");
        return;
      }

      try {
        const response = await axios.get(`/authenticate/route/${route_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);
        setActivity(response.data);
      } catch (err) {
        console.error("Error fetching route details:", err.message);
        setError("שגיאה בעת שליפת פרטי המסלול. נסה שוב מאוחר יותר.");
      }
    };

    fetchRouteDetails();
  }, [route_id]);

  return (
    <DefaultLayout>
      <div
        className="container mx-auto p-6"
        style={{ direction: "rtl" }} // Set RTL for the entire page
      >
        <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-600">
          פרטי המסלול
        </h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : activity ? (
          <ActivityDetails activity={activity} />
        ) : (
          <p className="text-gray-600 text-center">טוען פרטי מסלול...</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default RoutePage;
