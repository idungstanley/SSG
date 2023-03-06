import React, { Fragment, useEffect, useState } from 'react';
import { NotificationData } from './DummyData';
import { classNames } from '../../../../utils';

export default function NotificaitonTablle() {
  const [notificationsByCategory, setNotificationsByCategory] = useState([]);

  useEffect(() => {
    if (!NotificationData) {
      return setNotificationsByCategory([]);
    }
    const notificationsByCategoryTemp = NotificationData.reduce((notificationSoFar, currentNotification) => {
      if (!notificationSoFar[currentNotification.notificationCategory.key]) {
        notificationSoFar[currentNotification.notificationCategory.key] = {
          name: currentNotification.notificationCategory.name,
          key: currentNotification.notificationCategory.key,
          notifications: []
        };
      }
      notificationSoFar[currentNotification.notificationCategory.key].notifications.push(currentNotification);
      return notificationSoFar;
    }, {});

    setNotificationsByCategory(notificationsByCategoryTemp);
  }, [NotificationData]);

  return (
    <div className="flex flex-col -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-6">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Actions
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Mobile
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  In-App
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Browser
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Object.keys(notificationsByCategory).map((key) => (
                <Fragment key={notificationsByCategory[key].key}>
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={5}
                      scope="colgroup"
                      className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6 capitalize w-full"
                    >
                      {notificationsByCategory[key].name}
                    </th>
                  </tr>
                  {notificationsByCategory[key].notifications.map((notification, index) => (
                    <tr
                      key={notification.key}
                      className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-row z-50">{notification.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* <PermissionsCheckbox
                            teamMemberRoleKey="guest"
                            workspacePermissionKey={permission.key}
                          /> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* <PermissionsCheckbox
                            teamMemberRoleKey="low"
                            workspacePermissionKey={permission.key}
                          /> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* <PermissionsCheckbox
                            teamMemberRoleKey="high"
                            workspacePermissionKey={permission.key}
                          /> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* <PermissionsCheckbox
                            teamMemberRoleKey="admin"
                            workspacePermissionKey={permission.key}
                          /> */}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* <PermissionsCheckbox
                            teamMemberRoleKey="owner"
                            workspacePermissionKey={permission.key}
                          /> */}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
