import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const DEFAULT_LOCATION = [40.7128, -74.006]; // Example: New York City

const RouteMap = ({ routeData }) => {
  const center = routeData.length > 0 ? routeData[0].location : DEFAULT_LOCATION;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routeData.map((activity, index) => (
        <Marker key={index} position={activity.location || DEFAULT_LOCATION}>
          <Popup>
            <strong>{activity.title || "Untitled Activity"}</strong>
            <br />
            {activity.cost ? `Cost: ${activity.cost}` : "Cost not available"}
            <br />
            {activity.ai_suggestion || "No suggestions available"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RouteMap;
