import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../generalFunctions/config/axiosConfig";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaMoneyBillWave } from "react-icons/fa";
import DefaultLayout from "../../Talents/components/DefaultLayout";


const ActivityDetails = ({ activity }) => {
  const aiSuggestions = activity.ai_suggestion
    ? JSON.parse(activity.ai_suggestion)
    : null;

  const openGoogleMaps = (area) => {
    const encodedLocation = encodeURIComponent(area);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank");
  };

  return (
    <div
      className="rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white"
      style={{ direction: "rtl" }} // Right-to-left layout
    >
      <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
      <p className="text-sm italic mb-4">
        <FaCalendarAlt className="inline mr-2" />
        {new Date(activity.time).toLocaleString("he-IL") || "לא סופק זמן"}
      </p>
      <div className="mt-4">
        <p>
          <FaUserFriends className="inline mr-2" />
          <strong>חברה:</strong> {activity.company || "לא סופק"}
        </p>
        <p>
          <FaMapMarkerAlt className="inline mr-2" />
          <strong>אזור:</strong>{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => openGoogleMaps(activity.area)}
          >
            {activity.area || "לא סופק"}
          </span>
        </p>
        <p>
          <FaMoneyBillWave className="inline mr-2" />
          <strong>עלות משוערת:</strong> {activity.cost || "לא סופק"} ש"ח
        </p>
      </div>
      {aiSuggestions && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">הצעות מבוססות בינה מלאכותית</h3>
          {Object.keys(aiSuggestions).map((key, index) => (
            <div key={index} className="mt-2 p-4 bg-indigo-700 rounded-lg">
              <p>
                <strong>אפשרות {index + 1}:</strong>
              </p>
              <p>
                <strong>פעילות:</strong> {aiSuggestions[key].Activity}
              </p>
              <p>
                <strong>מיקום:</strong> {aiSuggestions[key].Location}
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
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
        פרטי המסלול
      </h1>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : activity ? (
        <ActivityDetails activity={activity} />
      ) : (
        <p className="text-center text-gray-600">טוען פרטי מסלול...</p>
      )}
    </div>
    </DefaultLayout>

  );
};

export default RoutePage;