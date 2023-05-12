import React from 'react';
import {
  GetNotificationSettingsService,
  useChangeNotificationSettings
} from '../../../../features/general/notification/notificationService';
// import THeadData from './THead';
import { MdOpenInBrowser, MdOutlineAlternateEmail } from 'react-icons/md';
import { GoDeviceMobile } from 'react-icons/go';
import { GrApps } from 'react-icons/gr';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { cl } from '../../../../utils';

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
    <div className="bg-white border border-gray-300 ">
      {data &&
        Object.keys(data).map((category, index) => (
          <Disclosure key={category} defaultOpen={index === 0}>
            {({ open }) => (
              <div className={cl('w-full', index !== 0 ? 'mt-2' : '')}>
                <Disclosure.Button className="w-full">
                  <div className="bg-gray-200">
                    <div className="flex">
                      <div className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-2/4">
                        <div className="flex items-center space-x-2">
                          <ChevronRightIcon className={cl(open ? 'rotate-90 transform' : '', 'w-6 h-6')} />
                          <p className="uppercase" style={{ fontSize: '15px' }}>
                            {category}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-2/4 justify-between">
                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center flex-col">
                            <MdOutlineAlternateEmail />
                            <p>Email</p>
                          </div>
                        </div>
                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center flex-col">
                            <GoDeviceMobile />
                            <p>Mobile</p>
                          </div>
                        </div>
                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center flex-col">
                            <MdOpenInBrowser />
                            <p>Browser</p>
                          </div>
                        </div>
                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          <div className="flex items-center flex-col">
                            <GrApps />
                            <p>In-App</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel>
                  {' '}
                  <div className="bg-white p-4 w-full">
                    {data[category]?.types &&
                      Object.keys(data[category].types).map((cat: string) => (
                        <div key={cat} className="flex justify-between items-center w-full">
                          <div className="pl-10 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/4">
                            {data[category].types[cat]?.name}
                          </div>
                          <div className="flex w-2/4 justify-between">
                            <div className="px-3 flex justify-center">
                              <input
                                checked={data[category].types[cat]?.is_email}
                                className="h-5 w-5 cursor-pointer bg-gray-300 border-gray-500"
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
                            <div className="px-3 flex justify-center">
                              <input
                                type="checkbox"
                                className="h-5 w-5 cursor-pointer checked:bg-gray-300 border-gray-500"
                                checked
                                onChange={() => null}
                              />
                            </div>
                            <div className="px-3 flex justify-center">
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
                            <div className="px-3 flex justify-center">
                              <input
                                type="checkbox"
                                className="h-5 w-5 cursor-pointer checked:bg-gray-300 border-gray-500"
                                checked
                                onChange={() => null}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
    </div>
  );
}
