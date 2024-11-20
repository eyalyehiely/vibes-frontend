import React, { useEffect, useState } from "react";
import getNotificationsData from "../../Companies/functions/crud/company/getNotificationsData";
import { jwtDecode } from "jwt-decode"; // Corrected import
import getCompanyDetails from "../../Companies/functions/crud/company/getCompanyDetails";
import notificationSign from "../../images/notificationSign.png";

const CompanyBoard = () => {
  const [notifications, setNotifications] = useState([]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")).access
      : null;

    const decodedToken = jwtDecode(token);
    const company_id = decodedToken.company_id;

    if (token) {
      getNotificationsData(setNotifications, company_id, token);
      getCompanyDetails(setCompany, company_id, token);
    }
  }, []);

  return (
    <div className="col-span-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-start justify-between border-b border-stroke px-6 py-5 dark:border-strokedark">
        <div>
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            {company.first_name} Notifications
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-7">
          {notifications.length > 0 ? (
            notifications.map((notification, key) => (
              <div className="relative z-1 flex gap-5.5" key={key}>
                <div className="flex items-center justify-center">
                  <img
                    src={notificationSign || "default-avatar.png"}
                    alt="User"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-black dark:text-white">
                    <span className="font-medium">{notification.subject}</span>
                    {/* <span className="px-1">Sent a notification</span> */}
                  </p>
                  <span className="mt-1 block text-sm">
                    <span className="mt-1 block text-sm">
                      {new Date(notification.created_at).toLocaleTimeString()}{" "}
                      ago
                    </span>
                  </span>
                  <p className="mt-2.5 text-black dark:text-white">
                    {notification.message}
                  </p>
                </div>

                {key === 0 && (
                  <span className="absolute left-8 -z-1 block h-[300%] w-[1px] border-l border-dashed border-stroke dark:border-strokedark"></span>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No notifications available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyBoard;
