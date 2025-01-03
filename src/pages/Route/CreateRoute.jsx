
// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import swal from "sweetalert";
// import {
//   FaUtensils,
//   FaBowlingBall,
//   FaWineGlass,
//   FaTableTennis,
// } from "react-icons/fa";
// import { GiPartyPopper } from "react-icons/gi";
// import { BiCameraMovie } from "react-icons/bi";
// import DefaultLayout from "../../components/DefaultLayout";
// import createRoute from "../../utils/crud/route/createRoute";
// import getCity from "../../utils/general/getCity";
// import getAreaAndCity from "../../utils/general/getAreaAndCity";

// const steps = [
//   { number: 1, label: "סוג הבילוי" },
//   { number: 2, label: "מתי" },
//   { number: 3, label: "אזור" },
//   { number: 4, label: "עלות" },
//   { number: 5, label: "לבד/עם חברים" },
// ];

// const activities = [
//   { id: 1, label: "מסיבה", value: "מסיבה", icon: <GiPartyPopper size={34} /> },
//   { id: 2, label: "מסעדה", value: "מסעדה", icon: <FaUtensils size={32} /> },
//   { id: 3, label: "באולינג", value: "באולינג", icon: <FaBowlingBall size={32} /> },
//   { id: 4, label: "יין", value: "יין", icon: <FaWineGlass size={32} /> },
//   { id: 5, label: "לצפות בסרט", value: "לצפות בסרט", icon: <BiCameraMovie size={32} /> },
//   { id: 6, label: "לשחק", value: "לשחק", icon: <FaTableTennis size={32} /> },
// ];

// const costNotes = [
//   { value: 0, label: "בחינם" },
//   { value: 50, label: "גרדן" },
//   { value: 100, label: "קמצן" },
//   { value: 200, label: "יש משכורת" },
//   { value: 300, label: "יושב טוב" },
// ];

// function CreateRoute() {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [availableCities, setAvailableCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [formData, setFormData] = useState({
//     date_time: "",
//     area: "",
//     cost: 0,
//     company: "",
//     activity_type: "",
//   });
//   const token = localStorage.getItem("authTokens");

//   const handleNext = () => {
//     if (step === 1 && !selectedActivity) {
//       swal("נא לבחור סוג בילוי לפני ההמשך");
//       return;
//     }
//     setStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     if (step > 1) setStep((prevStep) => prevStep - 1);
//   };

//   const handleActivityClick = (id, value) => {
//     setSelectedActivity(id);
//     setFormData({ ...formData, activity_type: value });
//   };

//   const handleCostChange = (e) => {
//     setFormData({ ...formData, cost: Number(e.target.value) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submissionData = {
//       time: formData.date_time,
//       activity_type: formData.activity_type,
//       cost: formData.cost,
//       area: formData.area,
//       company: formData.company,
//     };

//     try {
//       const routeData = await createRoute(submissionData, token);
//       if (routeData && routeData.route_id) {
//         swal("המסלול נשמר בהצלחה!", "", "success");
//         navigate(`/route/${routeData.route_id}/`);
//       } else {
//         swal("הבקשה נשמרה אך לא התקבל מזהה מסלול.", "", "info");
//       }
//     } catch (err) {
//       console.error("Failed to create route:", err);
//       swal("שגיאה ביצירת המסלול.", "", "error");
//     }
//   };

//   const getUserLocation = async () => {
//     if (!navigator.geolocation) {
//       swal("המכשיר שלך אינו תומך בזיהוי מיקום.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const userArea = await getAreaAndCity(latitude, longitude);
//           setFormData({ ...formData, area: userArea });
//         } catch (error) {
//           console.error("Error fetching area and city:", error);
//           swal("שגיאה בזיהוי האזור או העיר.");
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         swal("לא ניתן לאתר את המיקום שלך.");
//       }
//     );
//   };

//   const fetchCities = async () => {
//     setIsLoading(true);
//     setErrorMessage("");
//     try {
//       const cities = await getCity();
//       setAvailableCities(cities);
//     } catch (error) {
//       setErrorMessage("שגיאה בטעינת הערים.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rtl">
//         {/* Header */}
//         <div className="bg-white shadow-lg">
//           <div className="container mx-auto px-4 py-6 flex items-center justify-between">
//             <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
//               <ArrowLeft className="h-6 w-6" />
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-800">יצירת מסלול חדש</h1>
//             <div className="w-6"></div>
//           </div>
//         </div>

//         {/* Progress Steps */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-12 relative">
//             {steps.map((s, idx) => (
//               <div key={s.number} className="flex flex-col items-center relative z-10">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center
//                   ${step >= s.number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
//                   {s.number}
//                 </div>
//                 <span className={`mt-2 text-sm font-medium
//                   ${step >= s.number ? 'text-indigo-600' : 'text-gray-500'}`}>
//                   {s.label}
//                 </span>
//                 {idx < steps.length - 1 && (
//                   <div className={`absolute top-5 right-1/2 w-full h-0.5
//                     ${step > s.number ? 'bg-indigo-600' : 'bg-gray-200'}`} />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Content Area */}
//           <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//             {step === 1 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {activities.map((activity) => (
//                   <button
//                     key={activity.id}
//                     onClick={() => handleActivityClick(activity.id, activity.value)}
//                     className={`relative group p-6 rounded-xl transition-all duration-300
//                       ${selectedActivity === activity.id
//                         ? 'bg-indigo-50 border-2 border-indigo-500'
//                         : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
//                       flex flex-col items-center justify-center gap-4 hover:shadow-lg`}
//                   >
//                     <div className={`transition-colors duration-300
//                       ${selectedActivity === activity.id ? 'text-indigo-600' : 'text-gray-600'}`}>
//                       {activity.icon}
//                     </div>
//                     <span className={`text-lg font-medium transition-colors duration-300
//                       ${selectedActivity === activity.id ? 'text-indigo-600' : 'text-gray-700'}`}>
//                       {activity.label}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-6">
//                 <label className="block text-lg font-medium text-gray-700">
//                   מתי תרצה לצאת?
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={formData.date_time}
//                   onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
//                   className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500
//                     focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
//                 />
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-6">
//                 <div className="flex flex-col gap-4">
//                   <button
//                     onClick={getUserLocation}
//                     className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
//                       text-white font-medium hover:from-indigo-600 hover:to-purple-600
//                       transition-all duration-300 shadow-md hover:shadow-lg"
//                   >
//                     השתמש במיקום הנוכחי
//                   </button>
//                   <button
//                     onClick={fetchCities}
//                     className="w-full py-4 px-6 rounded-lg bg-white border-2 border-indigo-500
//                       text-indigo-500 font-medium hover:bg-indigo-50
//                       transition-all duration-300"
//                   >
//                     בחר עיר
//                   </button>
//                 </div>

//                 {isLoading && (
//                   <div className="flex justify-center py-8">
//                     <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500
//                       border-t-transparent"></div>
//                   </div>
//                 )}

//                 {availableCities.length > 0 && (
//                   <div className="mt-6 space-y-2">
//                     {availableCities.map((city, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setFormData({ ...formData, area: city })}
//                         className="w-full text-right py-3 px-4 rounded-lg hover:bg-indigo-50
//                           transition-colors duration-200 text-gray-700 hover:text-indigo-600"
//                       >
//                         {city}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {step === 4 && (
//               <div className="space-y-8">
//                 <div>
//                   <label className="block text-lg font-medium text-gray-700 mb-4">
//                     תקציב משוער
//                   </label>
//                   <input
//                     type="range"
//                     min="0"
//                     max="300"
//                     step="50"
//                     value={formData.cost}
//                     onChange={handleCostChange}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
//                       accent-indigo-500"
//                   />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   {costNotes.map((note) => (
//                     <div
//                       key={note.value}
//                       className={`text-center transition-colors duration-200
//                         ${formData.cost >= note.value ? 'text-indigo-600' : 'text-gray-400'}`}
//                     >
//                       <div className="font-medium">{note.value}₪</div>
//                       <div className="text-sm">{note.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {step === 5 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <button
//                   onClick={() => setFormData({ ...formData, company: "myself" })}
//                   className={`p-8 rounded-xl transition-all duration-300 text-center
//                     ${formData.company === "myself"
//                       ? 'bg-indigo-50 border-2 border-indigo-500'
//                       : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
//                     hover:shadow-lg`}
//                 >
//                   <span className="text-xl font-medium block mb-2">🎭</span>
//                   <span className="text-lg font-medium">לבד</span>
//                   <p className="text-gray-600 mt-2">אני אוהב את הלבד שלי</p>
//                 </button>

//                 <button
//                   onClick={() => setFormData({ ...formData, company: "friends" })}
//                   className={`p-8 rounded-xl transition-all duration-300 text-center
//                     ${formData.company === "friends"
//                       ? 'bg-indigo-50 border-2 border-indigo-500'
//                       : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
//                     hover:shadow-lg`}
//                 >
//                   <span className="text-xl font-medium block mb-2">👥</span>
//                   <span className="text-lg font-medium">עם חברים</span>
//                   <p className="text-gray-600 mt-2">יותר כיף ביחד</p>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8">
//             {step > 1 && (
//               <button
//                 onClick={handlePrevious}
//                 className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium
//                   hover:bg-gray-200 transition-colors duration-200"
//               >
//                 הקודם
//               </button>
//             )}
//             {step < steps.length ? (
//               <button
//                 onClick={handleNext}
//                 className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium
//                   hover:bg-indigo-600 transition-colors duration-200 mr-auto"
//               >
//                 הבא
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
//                   text-white font-medium hover:from-indigo-600 hover:to-purple-600
//                   transition-all duration-300 shadow-md hover:shadow-lg mr-auto"
//               >
//                 סיים ושמור
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }

// export default CreateRoute;



import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  FaUtensils,
  FaBowlingBall,
  FaWineGlass,
  FaTableTennis,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { BiCameraMovie } from "react-icons/bi";
import DefaultLayout from "../../components/DefaultLayout";
import createRoute from "../../utils/crud/route/createRoute";
import getCity from "../../utils/general/getCity";
import getAreaAndCity from "../../utils/general/getAreaAndCity";

const steps = [
  { number: 1, label: "סוג הבילוי", icon: "🎯" },
  { number: 2, label: "מתי", icon: "🕒" },
  { number: 3, label: "אזור", icon: "📍" },
  { number: 4, label: "עלות", icon: "💰" },
  { number: 5, label: "לבד/עם חברים", icon: "👥" },
];

const activities = [
  { id: 1, label: "מסיבה", value: "מסיבה", icon: <GiPartyPopper className="w-8 h-8" /> },
  { id: 2, label: "מסעדה", value: "מסעדה", icon: <FaUtensils className="w-8 h-8" /> },
  { id: 3, label: "באולינג", value: "באולינג", icon: <FaBowlingBall className="w-8 h-8" /> },
  { id: 4, label: "יין", value: "יין", icon: <FaWineGlass className="w-8 h-8" /> },
  { id: 5, label: "לצפות בסרט", value: "לצפות בסרט", icon: <BiCameraMovie className="w-8 h-8" /> },
  { id: 6, label: "לשחק", value: "לשחק", icon: <FaTableTennis className="w-8 h-8" /> },
];

const costNotes = [
  { value: 0, label: "בחינם", emoji: "🆓" },
  { value: 50, label: "גרדן", emoji: "💵" },
  { value: 100, label: "קמצן", emoji: "💰" },
  { value: 200, label: "יש משכורת", emoji: "💎" },
  { value: 300, label: "יושב טוב", emoji: "🤑" },
];

function CreateRoute() {
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
      swal("שים לב", "נא לבחור סוג בילוי לפני ההמשך", "warning");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleActivityClick = (id, value) => {
    setSelectedActivity(id);
    setFormData({ ...formData, activity_type: value });
  };

  const handleCostChange = (e) => {
    setFormData({ ...formData, cost: Number(e.target.value) });
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
        swal("מעולה!", "המסלול נשמר בהצלחה", "success");
        navigate(`/route/${routeData.route_id}/`);
      } else {
        swal("אופס", "הבקשה נשמרה אך לא התקבל מזהה מסלול", "info");
      }
    } catch (err) {
      console.error("Failed to create route:", err);
      swal("שגיאה", "לא הצלחנו ליצור את המסלול", "error");
    }
  };

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      swal("שגיאה", "המכשיר שלך אינו תומך בזיהוי מיקום", "error");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const userArea = await getAreaAndCity(latitude, longitude);
          setFormData({ ...formData, area: userArea });
          swal("מצוין!", "המיקום שלך אותר בהצלחה", "success");
        } catch (error) {
          console.error("Error fetching area and city:", error);
          swal("שגיאה", "לא הצלחנו לזהות את האזור שלך", "error");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        swal("שגיאה", "לא הצלחנו לאתר את המיקום שלך", "error");
        setIsLoading(false);
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
      setErrorMessage("שגיאה בטעינת הערים");
      swal("שגיאה", "לא הצלחנו לטעון את רשימת הערים", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rtl pb-12">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              יצירת מסלול חדש
            </h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-12 relative max-w-4xl mx-auto">
            <div className="absolute top-5 h-0.5 bg-gray-200 w-full -z-10"></div>
            {steps.map((s, idx) => (
              <div key={s.number} className="flex flex-col items-center relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-500 transform
                  ${step >= s.number 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-110' 
                    : 'bg-white text-gray-500 border-2 border-gray-200'}`}>
                  <span className="text-lg">{s.icon}</span>
                </div>
                <span className={`mt-2 text-sm font-medium hidden sm:block
                  transition-colors duration-500
                  ${step >= s.number ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-500">
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity.id, activity.value)}
                      className={`relative group p-6 rounded-xl transition-all duration-300
                        transform hover:scale-105
                        ${selectedActivity === activity.id
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-500 shadow-md'
                          : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
                        flex flex-col items-center justify-center gap-4`}
                    >
                      <div className={`transition-colors duration-300
                        ${selectedActivity === activity.id ? 'text-indigo-600' : 'text-gray-600'}`}>
                        {activity.icon}
                      </div>
                      <span className={`text-lg font-medium transition-colors duration-300
                        ${selectedActivity === activity.id ? 'text-indigo-600' : 'text-gray-700'}`}>
                        {activity.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <label className="block text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                    מתי תרצה לצאת? 🗓️
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date_time}
                    onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500
                      focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 text-lg"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={getUserLocation}
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
                        text-white font-medium hover:from-indigo-600 hover:to-purple-600
                        transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <>
                          <span>📍</span>
                          <span>השתמש במיקום הנוכחי</span>
                        </>
                      )}
                    </button>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transform -rotate-1"></div>
                      <button
                        onClick={fetchCities}
                        disabled={isLoading}
                        className="relative w-full py-4 px-6 rounded-lg bg-white
                          text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500
                          font-medium border-2 border-transparent hover:border-indigo-500
                          transition-all duration-300 transform hover:scale-105
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🏙️ בחר עיר
                      </button>
                    </div>
                  </div>

                  {availableCities.length > 0 && (
                    <div className="mt-6 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {availableCities.map((city, index) => (
                        <button
                          key={index}
                          onClick={() => setFormData({ ...formData, area: city })}
                          className={`w-full text-right py-3 px-4 rounded-lg transition-all duration-200
                            ${formData.area === city
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                              : 'hover:bg-gray-50 text-gray-700 hover:text-indigo-600'}`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 max-w-lg mx-auto">
                  <div>
                    <label className="block text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
                      תקציב משוער 💰
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      step="50"
                      value={formData.cost}
                      onChange={handleCostChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                        accent-indigo-500"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    {costNotes.map((note) => (
                      <div
                        key={note.value}
                        className={`text-center transition-all duration-300 transform
                          ${formData.cost >= note.value 
                            ? 'text-indigo-600 scale-110' 
                            : 'text-gray-400 scale-100'}`}
                      >
                        <div className="text-2xl mb-2">{note.emoji}</div>
                        <div className="font-medium">{note.value}₪</div>
                        <div className="text-sm">{note.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <button
                    onClick={() => setFormData({ ...formData, company: "myself" })}
                    className={`p-8 rounded-xl transition-all duration-300 transform hover:scale-105
                      ${formData.company === "myself"
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-500 shadow-md'
                        : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
                      text-center`}
                  >
                    <span className="text-4xl font-medium block mb-4">🎭</span>
                    <span className="text-xl font-medium block mb-2">לבד</span>
                    <p className="text-gray-600">אני אוהב את הלבד שלי</p>
                  </button>

                  <button
                    onClick={() => setFormData({ ...formData, company: "friends" })}
                    className={`p-8 rounded-xl transition-all duration-300 transform hover:scale-105
                      ${formData.company === "friends"
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-500 shadow-md'
                        : 'bg-white border-2 border-gray-100 hover:border-indigo-200'}
                      text-center`}
                  >
                    <span className="text-4xl font-medium block mb-4">👥</span>
                    <span className="text-xl font-medium block mb-2">עם חברים</span>
                    <p className="text-gray-600">יותר כיף ביחד</p>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-lg bg-white text-gray-700 font-medium
                    hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow
                    flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>הקודם</span>
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
                    text-white font-medium hover:from-indigo-600 hover:to-purple-600
                    transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 mr-auto"
                >
                  הבא
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
                    text-white font-medium hover:from-indigo-600 hover:to-purple-600
                    transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 mr-auto
                    flex items-center gap-2"
                >
                  <span>סיים ושמור</span>
                  <span>✨</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CreateRoute;