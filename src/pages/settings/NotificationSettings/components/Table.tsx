import React from 'react';
import {
  GetNotificationSettingsService,
  useChangeNotificationSettings
} from '../../../../features/general/notification/notificationService';
import THeadData from './THead';

export default function NotificaitonTable() {
  const { data } = GetNotificationSettingsService();

  const { mutate: onChange } = useChangeNotificationSettings();

  const handleChange = (
    category: string,
    type: string | undefined,
    notification_type: string,
    notification_value: number | boolean
  ) => {
    onChange({
      category,
      type,
      notification_type,
      notification_value: notification_value === true ? 1 : notification_value === false ? 0 : notification_value
    });
  };
  return (
    <div className="w-full border border-gray-300">
      {data &&
        Object.keys(data).map((category) => (
          <div key={category}>
            <div className="bg-gray-200">
              <THeadData notificationHead={category} />
            </div>
            <div className="bg-white p-4 w-full">
              {data[category]?.types &&
                Object.keys(data[category].types).map((cat: string) => (
                  <div key={cat} className="flex justify-between items-center w-full">
                    <div className="pl-10 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/4">
                      {data[category].types[cat]?.name}
                    </div>
                    <div className="flex w-2/4 justify-between">
                      <div className="px-3 flex justify-cemter">
                        <input
                          checked={data[category].types[cat]?.is_email}
                          className="h-5 w-5 cursor-pointer bg-gray-300 border-gray-500 ml-2"
                          type="checkbox"
                          onChange={() => {
                            handleChange(
                              category,
                              data[category].types[cat]?.type,
                              'email',
                              data[category].types[cat]?.is_email
                            );
                          }}
                        />
                      </div>
                      <div className="px-3 flex justify-cemter">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer checked:bg-gray-300 border-gray-500"
                          checked
                        />
                      </div>
                      <div className="px-3 flex justify-cemter">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer checked:bg-gray-300 border-gray-500"
                          checked={data[category].types[cat]?.is_site}
                          onChange={() => {
                            handleChange(
                              category,
                              data[category].types[cat]?.type,
                              'site',
                              data[category].types[cat]?.is_site
                            );
                          }}
                        />
                      </div>
                      <div className="px-3 flex justify-cemter">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer checked:bg-gray-300 border-gray-500"
                          checked
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
