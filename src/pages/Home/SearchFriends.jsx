import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import saveUserLocation from '../../utils/crud/user/saveUserLocation'

const SearchFriends = () => {
  const [friends, setFriends] = useState([]);
  const [radius, setRadius] = useState(5); // Default radius in kilometers
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
        saveUserLocation(latitude, longitude, token)
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
      toast.warning("Please update your location before searching.");
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
      const newSocket = new WebSocket(`ws://localhost:8000/ws/search-friends/?token=${token}`);

      newSocket.onopen = () => {
        console.log("WebSocket connected!");
        newSocket.send(
          JSON.stringify({ radius, latitude: location.latitude, longitude: location.longitude })
        );
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
        toast.error("Search stopped.");
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
  }, [radius]);

  return (
    <div>
      <h1>Search Friends</h1>
      <button onClick={getUserLocation} disabled={isFetchingLocation}>
        {isFetchingLocation ? "Updating Location..." : "Update My Location"}
      </button>
      <br />
      <input
        type="number"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        placeholder="Enter radius (km)"
        disabled={isSearching} // Disable radius input while searching
      />
      <button onClick={toggleSearch} disabled={isFetchingLocation}>
        {isSearching ? "Stop Searching" : "Start Searching"}
      </button>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.first_name} {friend.last_name} - {friend.distance} km away
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFriends;