import React, { useState, useEffect } from 'react';
import NoNotificationFound from './components/NoNotificationFound';
import { useGetNotificationService } from '../../../features/general/notification/notificationService';
import NotificationCard from './components/NotificationCard';

function Notification() {
  const [notificationDataType, setNotificationDataType] = useState({});
  const { data: NotificationResponse, status } = useGetNotificationService();

  interface INotification {
    id: string;
    type: string;
    model_id: string;
    model_type: string;
    affected_model_id: null;
    affected_model_type: null;
    is_shown: number;
    created_at: string;
    created_by: {
      id: string;
      user: {
        id: string;
        name: string;
        email: string;
        avatar_path: null;
      };
      colour: string;
      initials: string;
      created_at: string;
      updated_at: string;
    };
    model: {
      id: string;
      name: string;
      list_id: string;
      parent_id: null;
      priority: null;
      status: string;
      start_date: null;
      end_date: null;
      updated_at: string;
      created_at: string;
      archived_at: null;
      deleted_at: null;
      descendants: [];
    };
  }

  useEffect(() => {
    if (status !== 'success') {
      return setNotificationDataType([]);
    }

    const notificationByCategory = NotificationResponse.reduce(
      (
        AccumulatedNotifications: { [key: string]: { name?: string; key?: string; notifications: INotification[] } },
        currentNotification
      ) => {
        if (!AccumulatedNotifications[currentNotification.type]) {
          AccumulatedNotifications[currentNotification.type] = {
            name: currentNotification.model.name,
            key: currentNotification.type,
            notifications: []
          };
        }
        AccumulatedNotifications[currentNotification.type].notifications.push(currentNotification);
        return AccumulatedNotifications;
      },
      {}
    );
    setNotificationDataType(
      notificationByCategory as { [key: string]: { name: string; key: string; notifications: INotification[] } }
    );

    return () => {
      true;
    };
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
