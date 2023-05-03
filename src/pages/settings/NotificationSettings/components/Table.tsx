// import { Fragment } from 'react';
import { GetNotificationSettingsService } from '../../../../features/general/notification/notificationService';
import THeadData from './THead';

export default function NotificaitonTable() {
  const { data } = GetNotificationSettingsService();
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
                    <div className="pl-10  py-3.5 text-left text-sm font-semibold text-gray-900 w-2/4">
                      {data[category].types[cat]?.name}
                    </div>
                    <div className="flex w-2/4 justify-between">
                      <div className="px-3">
                        <input checked={data[category].types[cat]?.default_email} type="checkbox" />
                      </div>
                      <div className="px-3">
                        <input type="checkbox" checked={data[category].types[cat]?.default_site} />
                      </div>
                      <div className="px-3">
                        <input type="checkbox" checked={data[category].types[cat]?.is_email} />
                      </div>
                      <div className="px-3">
                        <input type="checkbox" checked={data[category].types[cat]?.is_site} />
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
