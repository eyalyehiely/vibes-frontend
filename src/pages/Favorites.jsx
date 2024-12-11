import React, { useState, useEffect } from "react";
import DefaultLayout from "../Talents/components/DefaultLayout";
import {
  MapPin,
  DollarSign,
  Activity,
  ExternalLink,
  Phone,
  Star,
  Map as MapIcon,
  Trash2,
} from "lucide-react";
import getRoutesDetails from "../Talents/functions/crud/getRoutesDetails";
import getUserDetails from "../Talents/functions/crud/getUserDetails";
import deleteFavoritePlace from "../Talents/functions/crud/deleteFavoritePlace";
import { jwtDecode } from "jwt-decode";

function Favorites() {
  const [routes, setRoutes] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("routes");
  const token = localStorage.getItem("authTokens");

  const decodedToken = jwtDecode(token);
  const user_id = decodedToken?.user_id;

  useEffect(() => {
    async function fetchDetails() {
      if (!token || !user_id) {
        console.error("Missing token or user_id.");
        return;
      }

      try {
        setLoading(true);

        // Fetch routes and user details
        getRoutesDetails(token, setRoutes);
        getUserDetails(token, setUser, user_id); // Directly updates the user state
      } catch (error) {
        console.error("Error fetching details:", error.message || error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [token, user_id]);

  const favorites = Array.isArray(user.favorite_places)
    ? user.favorite_places
    : [];

  const handleDelete = async (place_id) => {
    try {
      await deleteFavoritePlace(token, user_id, place_id, (updatedPlaces) => {
        setUser((prevUser) => ({
          ...prevUser,
          favorite_places: updatedPlaces,
        }));
      });
    } catch (error) {
      console.error("Error deleting favorite place:", error);
    }
  };

  const handleOpenLocation = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  function LoadingState() {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  function EmptyState({ message }) {
    return (
      <div className="py-12 text-center">
        <MapIcon className="text-gray-400 mx-auto mb-4 h-16 w-16" />
        <h3 className="text-gray-900 mb-2 text-lg font-medium">{message}</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <DefaultLayout>
        <LoadingState />
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <h2 className="text-gray-900 mb-8 text-right text-3xl font-bold">
          המועדפים שלי
        </h2>

        {/* Tabs */}
        <div className="justify-right border-gray-200 mb-6 flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "routes"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("routes")}
          >
            מסלולים
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "favorites"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            מקומות מועדפים
          </button>
        </div>

        {/* Routes Tab */}
        {activeTab === "routes" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <div
                  key={route.id || index}
                  className="overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <div className="p-6">
                    <h3 className="text-gray-900 mb-4 text-xl font-semibold">
                      {route.title || "ללא כותרת"}
                    </h3>
                    <div className="mb-6 space-y-2">
                      <div className="text-gray-600 flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        <span>{route.area || "לא צוין"}</span>
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        <span>{route.cost || "לא צוין"}</span>
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <Activity className="mr-2 h-5 w-5" />
                        <span>{route.type || "לא צוין"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="לא נמצאו מסלולים" />
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.length > 0 ? (
              favorites.map((place, index) => (
                <div
                  key={place.id || index}
                  className="overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <div className="relative rounded-xl border bg-white p-6 shadow-md">
                    <h3 className="text-gray-900 mb-4 text-xl font-semibold">
                      {place.name}
                    </h3>
                    <div className="mb-6 space-y-2">
                      <div className="text-gray-600 flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        <span>{place.distance || "לא זמין"}</span>
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <Star className="mr-2 h-5 w-5" />
                        <span>{place.rating || "אין דירוג"}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {place.location && (
                        <button
                          onClick={() =>
                            handleOpenLocation(
                              place.location.lat,
                              place.location.lng
                            )
                          }
                          className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-2 text-blue-600 transition-colors hover:bg-blue-100"
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
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <Phone className="h-4 w-4" />
                        טלפון
                      </button>
                      <button
                        onClick={() => handleDelete(place.id)}
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <Trash2
                          className="text-red-600 h-5 w-5"
                          color="red"
                          size={18}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="לא נמצאו מקומות שמורים"  />
            )}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default Favorites;
