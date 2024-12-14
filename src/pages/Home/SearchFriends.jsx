
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import saveUserLocation from "../../utils/crud/user/saveUserLocation";

const SearchFriends = () => {
  const [friends, setFriends] = useState([]);
  const [radius, setRadius] = useState(5); // Default radius in kilometers
  const [searchTime, setSearchTime] = useState(5); // Default search time in minutes
  const [isSearching, setIsSearching] = useState(false); // Toggle trigger for WebSocket
  const [socket, setSocket] = useState(null); // Store the WebSocket instance
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false); // Disable button while fetching location

  const token = localStorage.getItem("authTokens");

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Your device does not support location detection.");
      return;
    }
    setIsFetchingLocation(true); // Disable button while fetching location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsFetchingLocation(false);
        saveUserLocation(latitude, longitude, token);
        toast.success("Your location has been updated successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to detect your location.");
        setIsFetchingLocation(false);
      }
    );
  };

  const toggleSearch = () => {
    if (!location.latitude || !location.longitude) {
      toast.error("Please update your location before searching.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    if (isSearching) {
      // Stop the search
      if (socket) {
        socket.close();
        console.log("WebSocket disconnected!");
      }
      setSocket(null);
      toast.dismiss(); // Dismiss loading toast if active
    } else {
      // Start the search
      const toastId = toast.loading("Searching for friends...");
      const newSocket = new WebSocket(
        `ws://localhost:8000/ws/search-friends/?token=${token}`
      );

      newSocket.onopen = () => {
        console.log("WebSocket connected!");
        newSocket.send(JSON.stringify({ radius: radius }));
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        toast.dismiss(toastId); // Dismiss loading toast
        if (data.error) {
          console.error(data.error);
          toast.error(`Error: ${data.error}`);
        } else {
          setFriends(data.friends);
          toast.success(`Found ${data.friends.length} friends nearby.`);
        }
      };

      newSocket.onclose = () => {
        console.log("WebSocket disconnected!");
        toast.dismiss(toastId);
        if (isSearching) {
          toast.error("Search stopped.");
        }
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.dismiss(toastId);
        toast.error("WebSocket connection failed.");
      };

      setSocket(newSocket);
    }

    setIsSearching(!isSearching); // Toggle the searching state
  };

  useEffect(() => {
    // Update the WebSocket with the new radius when it changes
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ radius }));
    }
  }, [radius, socket]);

  // UseEffect to handle automatic stopping of search after searchTime minutes
  useEffect(() => {
    let timerId;
    if (isSearching && searchTime > 0) {
      const milliseconds = searchTime * 60 * 1000; // Convert minutes to ms
      timerId = setTimeout(() => {
        // Stop searching after the set time
        if (socket) {
          socket.close();
          console.log("WebSocket disconnected due to timeout!");
        }
        setSocket(null);
        setIsSearching(false);
        toast.error("Search ended after the specified time.");
      }, milliseconds);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isSearching, searchTime, socket]);

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-gray-800 mb-6 text-center text-2xl font-semibold">
          Search Friends
        </h1>

        <div className="mb-6 flex flex-col space-y-4">
          <button
            onClick={getUserLocation}
            disabled={isFetchingLocation}
            className={`rounded-md px-4 py-2 font-medium transition-colors duration-200 
            ${
              isFetchingLocation
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFetchingLocation ? "Updating Location..." : "Update My Location"}
          </button>

          <div className="flex flex-col space-y-2">
          <span>הכנס את המרחק שברצונך לחפש</span>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius (km)"
              disabled={isSearching}
              className={`border-gray-300 w-full rounded-md border px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${isSearching ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            />
            <span>הכנס את הזמן שברצונך לחפש</span>
            <input
              type="number"
              value={searchTime}
              onChange={(e) => setSearchTime(e.target.value)}
              placeholder="Enter search duration (minutes)"
              disabled={isSearching}
              className={`border-gray-300 w-full rounded-md border px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-400 
              ${isSearching ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
            />

            <button
              onClick={toggleSearch}
              disabled={isFetchingLocation}
              className={`rounded-md px-4 py-2 font-medium transition-colors duration-200 
              ${
                isFetchingLocation
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : isSearching
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isSearching ? "Stop Searching" : "Start Searching"}
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="bg-gray-50 border-gray-200 hover:bg-gray-100 flex items-center justify-between rounded-md border p-3 transition"
            >
              <span className="text-gray-800 font-medium">
                {friend.first_name} {friend.last_name}
              </span>
              <span className="text-gray-600 text-sm">
                {friend.distance} km away
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchFriends;
