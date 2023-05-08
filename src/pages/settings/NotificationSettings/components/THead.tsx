import React from 'react';
import { MdOutlineAlternateEmail, MdOpenInBrowser, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { GoDeviceMobile } from 'react-icons/go';
import { GrApps } from 'react-icons/gr';

export default function THeadData({ notificationHead }: { notificationHead: string }) {
  return (
    <>
      <div className="flex">
        <div className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-2/4">
          <div className="flex items-center space-x-2">
            <MdOutlineKeyboardArrowDown />
            <p className="uppercase" style={{ fontSize: '15px' }}>
              {notificationHead}
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
    </>
  );
}
