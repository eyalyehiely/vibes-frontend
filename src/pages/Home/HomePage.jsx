import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../Talents/components/DefaultLayout';
import WelcomeNote from '../../Talents/components/welcomeNote';
import getRoutesDetails from '../../Talents/functions/crud/getRoutesDetails';

function HomePage() {
  const [routes, setRoutes] = useState([]);
  const token = localStorage.getItem('authTokens');

  useEffect(() => {
    if (token) {
      getRoutesDetails(token, (data) => {
        console.log('Fetched Routes:', data); // Debugging
        setRoutes(data);
      });
    }
  }, [token]);

  const columns = ['מסלול', 'אזור', 'עלות', 'סוג פעילות', 'הצעה'];

  return (
    <DefaultLayout>
      <WelcomeNote />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Routes Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="border border-gray-300 bg-gray-100 px-4 py-2 text-left"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((route, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {route.title || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {route.area || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {route.cost || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {route.type || 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {route.ai_suggestion
                        ? `${route.ai_suggestion.option_1 || ''} ${route.ai_suggestion.option_2 || ''}`.trim()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default HomePage;