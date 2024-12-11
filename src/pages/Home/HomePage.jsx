import React, { useState, useEffect } from "react";
import DefaultLayout from "../../Talents/components/DefaultLayout";
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
import { fetchNearBy } from "../../Talents/functions/crud/fetchNearBy";
import { updateFavorites } from "../../Talents/functions/crud/updateFavorites";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

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
          setUserLocation({ latitude, longitude });
        },
        () => {
          setError("Error getting location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchPlaces = async (category, radius) => {
    if (!userLocation) {
      setError("Unable to get user location.");
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
      setError("Failed to fetch nearby places.");
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
    fetchPlaces(selectedCategory, radius);
  };

  const handleSavePlace = async (place) => {
    try {
      if (!token) {
        setError("You must be logged in to save places.");
        return;
      }
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken?.user_id;
      await updateFavorites(token, place, user_id);
    } catch {
      setError("Error saving place.");
    }
  };

  const handleOpenLocation = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <DefaultLayout>
      <WelcomeNote />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">חיפוש מסביבי</h1>

        {error && (
          <p className="text-red-600 bg-red-50 mb-4 rounded-lg p-3">{error}</p>
        )}

        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors
                ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 bg-white"
                } 
                ${
                  !userLocation || loading
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
                border-gray-200 border shadow-sm`}
              disabled={!userLocation || loading}
            >
              {React.createElement(category.icon, { className: "w-5 h-5" })}
              {category.label}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 border-gray-200 hover:bg-gray-100 flex items-center gap-2 rounded-lg 
                border bg-white px-4 py-2 shadow-sm"
            >
              רדיוס: {selectedRadius / 1000} ק״מ
            </button>

            {dropdownOpen && (
              <div
                className="border-gray-200 absolute top-full z-10 mt-1 w-full rounded-lg 
                border bg-white shadow-lg"
              >
                {radii.map((radius) => (
                  <button
                    key={radius}
                    onClick={() => handleRadiusSelection(radius)}
                    className="hover:bg-gray-100 w-full px-4 py-2 text-left first:rounded-t-lg 
                      last:rounded-b-lg"
                  >
                    {radius / 1000} km
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={getUserLocation}
            className="text-gray-700 border-gray-200 hover:bg-gray-100 flex items-center gap-2 rounded-lg 
              border bg-white px-4 py-2 shadow-sm"
          >
            <MapPin className="h-5 w-5" />
            עדכן מיקום
          </button>
        </div>

        {loading && (
          <p className="text-gray-600 py-4 text-center">טוען מקומות...</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 ? (
            places.map((place, index) => (
              <div
                key={place.id || index}
                className="overflow-hidden rounded-xl bg-white shadow-md"
              >
                <div className="p-6">
                  <h3 className="text-gray-900 mb-4 text-xl font-semibold">
                    {place.name}
                  </h3>

                  <div className="mb-6 space-y-2">
                    <div className="text-gray-600 flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      <span>
                        ק״מ ממך{" "}
                        {place.distance ? `${place.distance}` : "Nearby"}
                      </span>
                    </div>
                    <div className="text-gray-600 flex items-center">
                      <Star className="mr-2 h-5 w-5" />
                      <span> {place.rating || "No rating available"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSavePlace(place)}
                      className="flex items-center gap-2 rounded-lg bg-green-50 px-3 
                        py-2 text-green-600 transition-colors hover:bg-green-100"
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
                        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 
                          py-2 text-blue-600 transition-colors hover:bg-blue-100"
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
                          alert("Phone number is not available");
                        }
                      }}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 
                        py-2 text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Phone className="h-4 w-4" />
                      טלפון
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full py-4 text-center">
              לא נמצאו מקומות
            </p>
          )}
        </div>
      </div>
      <NavLink to="/create-route">
        <CirclePlus size={20} color="blue" />
      </NavLink>
    </DefaultLayout>
  );
}

export default HomePage;
