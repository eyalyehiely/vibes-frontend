import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import WelcomeNote from "./welcomeNote";
import {
  MapPin,
  Utensils,
  Hotel,
  Camera,
  Star,
  Bookmark,
  ExternalLink,
  Phone,
  Coffee,
  CirclePlus,
} from "lucide-react";
import { fetchNearBy } from "../../utils/crud/favorites/fetchNearBy";
import { updateFavorites } from "../../utils/crud/favorites/updateFavorites";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import saveUserLocation from "../../utils/crud/user/saveUserLocation";

function HomePage() {
  const categories = [
    { name: "Attractions", label: "אטרקציות", icon: Camera },
    { name: "Restaurants", label: "מסעדות", icon: Utensils },
    { name: "Accommodations", label: "מלונות", icon: Hotel },
    { name: "Cafe", label: "בתי קפה", icon: Coffee },
  ];

  const radii = [1000, 3000, 5000];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(3000);
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("authTokens");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          saveUserLocation(latitude,longitude,token)
          setUserLocation({ latitude, longitude });
        },
        () => {
          setError("שגיאה באיתור המיקום. אנא אפשר שירותי מיקום.");
        }
      );
    } else {
      setError("גלישה ללא תמיכה ב-GPS.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchPlaces = async (category, radius) => {
    if (!userLocation) {
      setError("לא ניתן לאתר את המיקום שלך.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const placesData = await fetchNearBy(
        userLocation.latitude,
        userLocation.longitude,
        category,
        token,
        radius
      );
      setPlaces(placesData);
    } catch (err) {
      setError("נכשל בבקשת מקומות קרובים.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchPlaces(category, selectedRadius);
  };

  const handleRadiusSelection = (radius) => {
    setSelectedRadius(radius);
    setDropdownOpen(false);
    if (selectedCategory) {
      fetchPlaces(selectedCategory, radius);
    }
  };

  const handleSavePlace = async (place) => {
    try {
      if (!token) {
        setError("יש להתחבר כדי לשמור מקומות.");
        return;
      }
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken?.user_id;
      await updateFavorites(token, place, user_id);
    } catch {
      setError("שגיאה בשמירת המקום.");
    }
  };

  const handleOpenLocation = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-50 min-h-screen">
        <WelcomeNote />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-gray-800 mb-6 text-3xl font-bold">
            חיפוש מסביבי
          </h1>

          {error && (
            <p className="bg-red-50 text-red-600 mb-4 rounded-lg p-3">
              {error}
            </p>
          )}

          <div className="mb-8 flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`border-gray-300 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors
                ${
                  selectedCategory === category.name
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 bg-white"
                }
                ${(!userLocation || loading) && "cursor-not-allowed opacity-50"}
                `}
                disabled={!userLocation || loading}
              >
                {React.createElement(category.icon, { className: "h-5 w-5" })}
                {category.label}
              </button>
            ))}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium"
              >
                רדיוס: {selectedRadius / 1000} ק״מ
              </button>

              {dropdownOpen && (
                <div className="border-gray-200 absolute top-full z-10 mt-1 w-full rounded-md border bg-white shadow-md">
                  {radii.map((radius) => (
                    <button
                      key={radius}
                      onClick={() => handleRadiusSelection(radius)}
                      className="hover:bg-gray-100 w-full px-4 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md"
                    >
                      {radius / 1000} ק"מ
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={getUserLocation}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium"
            >
              <MapPin className="h-5 w-5" />
              עדכן מיקום
            </button>

            <NavLink
              to="/create-route"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <CirclePlus size={20} />
              צור מסלול
            </NavLink>
          </div>

          {loading && (
            <p className="text-gray-600 py-4 text-center">טוען מקומות...</p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0
              ? places.map((place, index) => (
                  <div
                    key={place.id || index}
                    className="border-gray-200 flex flex-col overflow-hidden rounded-md border bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="p-4">
                      <h3 className="text-gray-900 mb-2 text-xl font-semibold">
                        {place.name}
                      </h3>

                      <div className="text-gray-600 mb-4 space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>
                            {place.distance
                              ? `${place.distance} ק"מ ממך`
                              : "לא זמין"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4" />
                          <span>{place.rating || "אין דירוג"}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleSavePlace(place)}
                          className="flex items-center gap-1 rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                        >
                          <Bookmark className="h-4 w-4" />
                          שמור
                        </button>

                        {place.location && (
                          <button
                            onClick={() =>
                              handleOpenLocation(
                                place.location.lat,
                                place.location.lng
                              )
                            }
                            className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                          >
                            <ExternalLink className="h-4 w-4" />
                            מיקום
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (place.phone_number) {
                              window.location.href = `tel:${place.phone_number}`;
                            } else {
                              alert("מספר טלפון אינו זמין");
                            }
                          }}
                          className="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                        >
                          <Phone className="h-4 w-4" />
                          טלפון
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : !loading && (
                  <p className="text-gray-600 col-span-full py-4 text-center">
                    לא נמצאו מקומות
                  </p>
                )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default HomePage;
