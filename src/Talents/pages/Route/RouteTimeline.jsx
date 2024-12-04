import React from 'react';

const RouteTimeline = ({ routeData }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Route</h2>
      <ul className="relative border-l border-blue-500">
        {routeData.map((activity, index) => (
          <li key={index} className="mb-6 ml-4">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 top-2"></div>
            <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
            <p className="text-sm text-gray-600">{activity.time}</p>
            {activity.cost && <p className="text-sm text-gray-600">Cost: ${activity.cost}</p>}
            {activity.ai_suggestion && (
              <p className="italic text-sm text-gray-500">{activity.ai_suggestion}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteTimeline;