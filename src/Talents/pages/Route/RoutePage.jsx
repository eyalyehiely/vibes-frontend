import React, { useEffect, useState } from 'react';
import RouteMap from './RouteMap';
import RouteTimeline from './RouteTimeline';
import axios from '../../../generalFunctions/config/axiosConfig';

const RoutePage = () => {
  const [routeData, setRouteData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      const token = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens')).access
        : null;

      if (!token) {
        setError('No valid authentication token found.');
        return;
      }

      try {
        const response = await axios.get('/authenticate/manage-route/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Format route data with validation
        const activities = response.data.activities
          .filter(
            (activity) =>
              activity.latitude !== undefined &&
              activity.longitude !== undefined &&
              !isNaN(activity.latitude) &&
              !isNaN(activity.longitude)
          )
          .map((activity) => ({
            title: activity.title,
            time: activity.time,
            cost: activity.cost,
            ai_suggestion: activity.ai_suggestion,
            location: [activity.latitude, activity.longitude],
          }));

        setRouteData(activities);
      } catch (err) {
        console.error('Error fetching route data:', err);
        setError('Failed to fetch route data. Please try again later.');
      }
    };

    fetchRouteData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Your Route</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!error && routeData.length > 0 && <RouteMap routeData={routeData} />}
      {!error && routeData.length > 0 && <RouteTimeline routeData={routeData} />}
      {!error && routeData.length === 0 && (
        <p className="text-gray-500 text-center">No valid routes available.</p>
      )}
    </div>
  );
};

export default RoutePage;