import React, { useState, useEffect } from 'react';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import NoNotificationFound from './components/NoNotificationFound';
import AvatarWithInitials from '../../../components/avatar/AvatarWithInitials';
import { AiFillFlag, AiOutlineEye } from 'react-icons/ai';
import { useGetNotificationService } from '../../../features/general/notification/notificationService';
// import { classNames } from '../../../utils';
// import { NotificationType } from './components/notificaiton.interface';

function Notification() {
  const [notificationDataType, setNotificationDataType] = useState([]);
  const { data: NotificationResponse, status } = useGetNotificationService();

  useEffect(() => {
    if (status !== 'success') {
      return setNotificationDataType([]);
    }

    const permissionsByCategoryTemp = NotificationResponse.reduce(
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
    setNotificationDataType(permissionsByCategoryTemp);

    return true;
  }, [NotificationResponse, status]);

  console.log(notificationDataType);

  return (
    <main className="mx-40 mt-10 flex flex-col -my-2 overflow-x-auto ">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <div className="min-w-full">
            {Object.keys(notificationDataType).length === 0 ? (
              <NoNotificationFound />
            ) : (
              <>
                <section className="bg-white">
                  <div>
                    <div
                      id="breadcrumb"
                      className="pl-3 mt-2 text-gray-500 inline-block"
                    >
                      <p className="text-xs border border-gray-200 rounded-md px-3">
                        Community &gt; support | HR &gt; Ticket Support | HR
                      </p>
                    </div>
                    <div className="flex justify-between items-center pl-4 sm:pl-4">
                      <div className="flex space-x-2 items-center">
                        <div>
                          <RiCheckboxBlankFill
                            className="pl-px text-purple-400 text-xs cursor-pointer"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="pb-3 pt-2 pr-3 text-left text-sm font-semibold cursor-pointer">
                          Update address on my records
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {/* priority */}
                        <AiFillFlag
                          className="h-5 w-7 cursor-pointer text-gray-400"
                          aria-hidden="true"
                        />
                        {/* assignees */}
                        <AvatarWithInitials
                          initials={'OM'}
                          height="h-6"
                          width="w-6"
                          backgroundColour={'red'}
                        />
                        {/* watchers */}
                        <AiOutlineEye
                          className="h-5 w-7 cursor-pointer text-gray-400 "
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                {/* body */}
                <section className="bg-gray-100">
                  <div>
                    <div className="flex justify-between items-center py-6 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                      <div className="flex space-x-2 items-center">
                        <AvatarWithInitials
                          initials={'MG'}
                          height="h-6"
                          width="w-6"
                          backgroundColour={'purple'}
                        />
                        <p className="text-xs font-light">Megan Galloway</p>
                        <button className="text-purple-600 border border-gray-200 p-1 rounded-full text-xs bg-white cursor-pointer font-bold">
                          <p>Created Task</p>
                        </button>
                      </div>
                      <div className="text-xs">
                        <p>1:26pm</p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Notification;
