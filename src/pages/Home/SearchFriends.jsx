import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import saveUserLocation from "../../utils/crud/user/saveUserLocation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const SearchFriends = () => {
  const [friends, setFriends] = useState([]);
  const [radius, setRadius] = useState(5); // Default radius in kilometers
  const [searchTime, setSearchTime] = useState(5); // Default search time in minutes
  const [isSearching, setIsSearching] = useState(false);
  const [socket, setSocket] = useState(null); // WebSocket instance
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [show, setShow] = useState(false); // Modal control

  const token = localStorage.getItem("authTokens");
  const WS_URL = `${import.meta.env.VITE_WS_API_URL}/ws/search-friends/`;

  
  // Get User Location
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Your device does not support location detection.");
      return;
    }
    setIsFetchingLocation(true);
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
        toast.error(
          "Unable to detect your location. Ensure permissions are granted."
        );
        setIsFetchingLocation(false);
      }
    );
  };

  // Toggle Searching Friends
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
      if (socket) socket.close();
      setSocket(null);
      toast.error("Search stopped.");
    } else {
      const newSocket = new WebSocket(`${WS_URL}?token=${token}`);

      newSocket.onopen = () => {
        console.log("WebSocket connected!");
        newSocket.send(JSON.stringify({ action: "start_search", radius }));
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.error) {
          toast.error(`Error: ${data.error}`);
        } else if (data.friends) {
          setFriends(data.friends);
          toast.success(`Found ${data.friends.length} friends nearby.`);
        }
      };

      newSocket.onclose = (e) => {
        console.log("WebSocket disconnected!", e.reason);
        setIsSearching(false);
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast.error("WebSocket connection failed.");
      };

      setSocket(newSocket);
    }
    setIsSearching(!isSearching);
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  const handleRadiusChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRadius(value > 0 ? value : 1);
  };

  const handleSearchTimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSearchTime(value > 0 ? value : 1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="d-flex align-items-center">
        🔍
      </Button>

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title>חפש חברים</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="mb-3">
              <Button
                onClick={getUserLocation}
                disabled={isFetchingLocation}
                className={`w-100 ${
                  isFetchingLocation ? "bg-gray-400" : "bg-primary"
                }`}
              >
                {isFetchingLocation ? "מעדכן מיקום..." : "עדכן את המיקום שלי"}
              </Button>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>מרחק לחיפוש (ק"מ)</Form.Label>
              <Form.Control
                type="number"
                value={radius}
                onChange={handleRadiusChange}
                disabled={isSearching}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>משך חיפוש (דקות)</Form.Label>
              <Form.Control
                type="number"
                value={searchTime}
                onChange={handleSearchTimeChange}
                disabled={isSearching}
              />
            </Form.Group>

            <Button
              variant={isSearching ? "danger" : "success"}
              onClick={toggleSearch}
              className="w-100"
              disabled={isFetchingLocation}
            >
              {isSearching ? "עצור חיפוש" : "התחל חיפוש"}
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <h5>חברים שנמצאו</h5>
          <ul className="list-group w-100">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <li key={friend.id} className="list-group-item">
                  {friend.first_name} {friend.last_name} - {friend.distance} ק"מ
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted text-center">
                לא נמצאו חברים
              </li>
            )}
          </ul>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchFriends;
