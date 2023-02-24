import React, { useState, useEffect } from 'react';
import NoNotificationFound from './components/NoNotificationFound';
import { useGetNotificationService } from '../../../features/general/notification/notificationService';
import NotificationCard from './components/NotificationCard';

function Notification() {
  const [notificationDataType, setNotificationDataType] = useState([]);
  const { data: NotificationResponse, status } = useGetNotificationService();

  useEffect(() => {
    if (status !== 'success') {
      return setNotificationDataType([]);
    }

    const notificationByCategory = NotificationResponse.reduce(
      (AccumulatedNotifications, currentNotification) => {
        if (!AccumulatedNotifications[currentNotification.type]) {
          AccumulatedNotifications[currentNotification.type] = {
            name: currentNotification.model.name,
            key: currentNotification.type,
            notifications: [],
          };
        }
        AccumulatedNotifications[currentNotification.type].notifications.push(
          currentNotification
        );
        return AccumulatedNotifications;
      },
      {}
    );
    setNotificationDataType(notificationByCategory);

    return true;
  }, [NotificationResponse, status]);

  return (
    <>
      {Object.keys(notificationDataType).length === 0 ? (
        <div className="min-w-full">
          <NoNotificationFound />
        </div>
      ) : (
        <div className="overflow-auto">
          <NotificationCard cardItems={notificationDataType} />
        </div>
      )}
    </>
  );
}

export default Notification;
