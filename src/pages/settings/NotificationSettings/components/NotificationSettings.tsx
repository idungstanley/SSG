import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import THeadData from './THead';
import { GetNotificationSettingsService } from '../../../../features/general/notification/notificationService';

function NotificationSettings() {
  const { data } = GetNotificationSettingsService();

  console.log(data);

  return (
    <div className="w-full">
      {data &&
        Object.keys(data).map((category) => (
          <Disclosure key={category}>
            {({ open }) => (
              <div className="my-2 w-full">
                <div>
                  <Disclosure.Button className="">
                    <div className="flex items-center w-full">
                      <ChevronRightIcon className={open ? 'rotate-90 transform w-4 h-4' : 'w-4 h-4'} />
                      <thead className="bg-gray-200 w-full">
                        <THeadData notificationHead={category} />
                      </thead>
                    </div>
                  </Disclosure.Button>
                  <div className="bg-white w-2/4">
                    <Disclosure.Panel>
                      {data[category]?.types &&
                        Object.keys(data[category].types).map((cat: string) => (
                          <Fragment key={cat}>
                            {/* {console.log(data[category].types[cat]?.category)} */}
                            <div className="flex">
                              <div className="pl-10  py-3.5 text-sm font-semibold text-gray-900 justify-between">
                                {data[category].types[cat]?.name}
                              </div>
                              {/* {Object.keys(data[category].types[cat]?.types).map((values) */}
                              <div className="pl-14 px-3 py-3.5 text-sm font-semibold text-gray-900">
                                <input checked type="checkbox" />
                              </div>
                              <div className="pl-14 px-3 py-3.5 text-sm font-semibold text-gray-900">
                                <input type="checkbox" />
                              </div>
                              <div className="pl-14 px-3 py-3.5 text-sm font-semibold text-gray-900">
                                <input type="checkbox" />
                              </div>
                              <div className="pl-14 px-3 py-3.5 text-sm font-semibold text-gray-900">
                                <input type="checkbox" />
                              </div>
                            </div>
                          </Fragment>
                        ))}
                    </Disclosure.Panel>
                  </div>
                </div>
              </div>
            )}
          </Disclosure>
        ))}
    </div>
  );
}

export default NotificationSettings;
