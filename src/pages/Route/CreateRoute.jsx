import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import createRoute from "../../Talents/functions/crud/createRoute";
import getCity from "../../generalFunctions/getCity";
import {
  FaBeer,
  FaUtensils,
  FaBowlingBall,
  FaWineGlass,
  FaTableTennis,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { BiCameraMovie } from "react-icons/bi";
import DefaultLayout from "../../Talents/components/DefaultLayout";
import getAreaAndCity from "../../generalFunctions/getAreaAndCity";

const steps = [
  { number: 1, label: "סוג הבילוי" },
  { number: 2, label: "מתי" },
  { number: 3, label: "אזור" },
  { number: 4, label: "עלות" },
  { number: 5, label: "לבד/עם חברים" },
];

const activities = [
  { id: 1, label: "מסיבה", value: "PARTY", icon: <GiPartyPopper size={34} /> },
  {
    id: 2,
    label: "מסעדה",
    value: "DINING_OUT",
    icon: <FaUtensils size={32} />,
  },
  {
    id: 3,
    label: "באולינג",
    value: "BOWLING",
    icon: <FaBowlingBall size={32} />,
  },
  { id: 4, label: "יין", value: "WINE", icon: <FaWineGlass size={32} /> },
  {
    id: 5,
    label: "לצפות בסרט",
    value: "WATCH_MOVIE",
    icon: <BiCameraMovie size={32} />,
  },
  {
    id: 6,
    label: "לשחק",
    value: "PLAY_GAME",
    icon: <FaTableTennis size={32} />,
  },
];

const costNotes = [
  { value: 0, label: "בחינם" },
  { value: 50, label: "גרדן" },
  { value: 100, label: "קמצן" },
  { value: 200, label: "יש משכורת" },
  { value: 300, label: "יושב טוב" },
];

const CreateRoute = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    date_time: "",
    area: "",
    cost: 0,
    company: "",
    activity_type: "",
  });
  const token = localStorage.getItem("authTokens");


  const handleNext = () => {
    if (step === 1 && !selectedActivity) {
      swal("נא לבחור סוג בילוי לפני ההמשך");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleActivityClick = (id, value) => {
    setSelectedActivity(id);
    setFormData({ ...formData, activity_type: value }); // Ensure 'value' is sent
  };

  const handleCostChange = (e) => {
    setFormData({ ...formData, cost: Number(e.target.value) }); // Convert to number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      time: formData.date_time,
      activity_type: formData.activity_type,
      cost: formData.cost,
      area: formData.area,
      company: formData.company,
    };

    try {
      const routeData = await createRoute(submissionData, token);

      if (routeData && routeData.route_id) {
        swal("המסלול נשמר בהצלחה!", "", "success");
        navigate(`/route/${routeData.route_id}/`);
      } else {
        swal("הבקשה נשמרה אך לא התקבל מזהה מסלול.", "", "info");
      }
    } catch (err) {
      console.error("Failed to create route:", err);
      swal("שגיאה ביצירת המסלול.", "", "error");
    }
  };

  const getCostLabel = (value) => {
    const note =
      costNotes.find((note) => value <= note.value) ||
      costNotes[costNotes.length - 1];
    return note.label;
  };

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      swal("המכשיר שלך אינו תומך בזיהוי מיקום.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
  
        try {
          const userArea = await getAreaAndCity(latitude, longitude); // Await the async function
          console.log('location:', userArea);
  
          setFormData({ ...formData, area: userArea });
        } catch (error) {
          console.error("Error fetching area and city:", error);
          swal("שגיאה בזיהוי האזור או העיר.");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        swal("לא ניתן לאתר את המיקום שלך.");
      }
    );
  };

  const fetchCities = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const cities = await getCity();
      setAvailableCities(cities);
    } catch (error) {
      setErrorMessage("שגיאה בטעינת הערים.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex h-screen flex-col bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100">
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 p-4 text-white shadow-md">
          <Link to="/" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">בחר מסלול</h1>
        </div>

        <div className="flex justify-center space-x-4 py-4">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center">
              <div
                className={`rounded-full px-4 py-2 text-center font-bold ${
                  step === s.number
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 bg-pink-200"
                }`}
              >
                {s.label}
              </div>
              {s.number !== steps.length && (
                <div
                  className={`h-1 w-12 ${
                    step >= s.number ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4">
          {step === 1 && (
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() =>
                    handleActivityClick(activity.id, activity.value)
                  }
                  className={`flex flex-col items-center justify-center rounded-lg border-4 p-6 shadow-lg transition-all hover:scale-105 ${
                    selectedActivity === activity.id
                      ? "border-purple-500 bg-purple-100 text-purple-700"
                      : "border-gray-300 text-gray-700 bg-white"
                  }`}
                >
                  {activity.icon}
                  <span className="mt-2 text-lg font-semibold">
                    {activity.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-md">
              <label className="mb-2 block text-lg font-bold text-blue-700">
                בחר תאריך ושעה
              </label>
              <input
                type="datetime-local"
                id="date_time"
                value={formData.date_time}
                onChange={(e) =>
                  setFormData({ ...formData, date_time: e.target.value })
                }
                required
                className="border-gray-300 w-full rounded-lg border-2 p-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={getUserLocation}
                className="rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 px-6 py-2 text-white shadow-md hover:shadow-lg"
              >
                המיקום שלי
              </button>
              <button
                onClick={fetchCities}
                className="rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 px-6 py-2 text-white shadow-md hover:shadow-lg"
              >
                חפש אזור
              </button>
              {isLoading && (
                <div className="mt-4 text-blue-500">
                  <span>טוען אזורים...</span>
                </div>
              )}
              {!isLoading && availableCities.length > 0 && (
                <ul className="mt-4 w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
                  {availableCities.map((city, index) => (
                    <li
                      key={index}
                      className="cursor-pointer p-2 text-blue-700 hover:bg-blue-100"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="w-full max-w-md">
              <label className="mb-2 block text-lg font-bold text-blue-700">
                עלות משוערת
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="cost"
                  min="0"
                  max="300"
                  step="50"
                  value={formData.cost}
                  onChange={handleCostChange}
                  className="w-full"
                />
                <span className="ml-4 text-lg font-bold text-blue-700">
                  {getCostLabel(formData.cost)} - {formData.cost} ₪
                </span>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, company: "myself" })}
                className={`flex flex-col items-center justify-center rounded-lg border-4 p-6 shadow-md transition-all hover:scale-105 ${
                  formData.company === "myself"
                    ? "border-blue-500 bg-blue-100 text-blue-700"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
              >
                <span className="mt-2 text-lg font-semibold">
                  אני אוהב את הלבד שלי
                </span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, company: "friends" })}
                className={`flex flex-col items-center justify-center rounded-lg border-4 p-6 shadow-md transition-all hover:scale-105 ${
                  formData.company === "friends"
                    ? "border-blue-500 bg-blue-100 text-blue-700"
                    : "border-gray-300 text-gray-700 bg-white"
                }`}
              >
                <span className="mt-2 text-lg font-semibold">עם חברים</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between bg-white px-4 py-6 shadow-md">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg px-6 py-2"
            >
              הקודם
            </button>
          )}
          {step < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              המשך
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
              onClick={handleSubmit}
            >
              סיים
            </button>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateRoute;
