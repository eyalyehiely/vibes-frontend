import React from "react";

const RouteTimeline = ({ routeData }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold text-blue-600">Your Route</h2>
      <ul className="relative border-l border-blue-500">
        {routeData.length > 0 ? (
          routeData.map((activity, index) => (
            <li key={index} className="mb-6 ml-4">
              <div className="absolute -left-2.5 top-2 h-4 w-4 rounded-full bg-blue-500"></div>
              <h3 className="text-gray-800 text-lg font-semibold">
                {activity.title || "Untitled Activity"}
              </h3>
              <p className="text-gray-600 text-sm">
                {activity.time || "No time specified"}
              </p>
              {activity.cost && (
                <p className="text-gray-600 text-sm">Cost: ${activity.cost}</p>
              )}
              {activity.ai_suggestion && (
                <p className="text-gray-500 text-sm italic">
                  {activity.ai_suggestion}
                </p>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">
            No activities available for this route.
          </p>
        )}
      </ul>
    </div>
  );
};

export default RouteTimeline;
